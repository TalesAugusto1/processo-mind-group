"use client";

import React, { useState, useEffect } from 'react';
import { Project } from '@/types/project';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("Usuário não está logado.");
      return;
    }

    fetch(`http://localhost:3001/api/projects?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Adicione este log para verificar a resposta da API
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          console.error("A resposta da API não é um array:", data);
        }
      })
      .catch(error => console.error("Erro ao buscar projetos:", error));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("Usuário não está logado ou o userId não foi encontrado.");
      return;
    }

    const response = await fetch('http://localhost:3001/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, userId }), 
    });

    if (response.ok) {
      const newProject = await response.json();
      setProjects([...projects, newProject]);
      setName('');
      setDescription('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">Projetos</h1>
      <form onSubmit={handleCreate} className="bg-gray-800 p-6 rounded shadow-md w-full max-w-sm mb-8">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nome do Projeto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Descrição do Projeto"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          />
        </div>
        <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Criar Projeto</button>
      </form>
      <div className="w-full max-w-2xl">
        {Array.isArray(projects) ? (
          projects.map((project) => (
            <div key={project.id} className="bg-gray-800 p-4 rounded shadow-md mb-4">
              <h2 className="text-2xl font-bold">{project.name}</h2>
              <p>{project.description}</p>
            </div>
          ))
        ) : (
          <p>Nenhum projeto encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Projects;