"use client";

import React from 'react';
import Link from 'next/link';
import { Project } from '@/types/project';
import { FaHome, FaProjectDiagram, FaUser } from 'react-icons/fa'; // Importa ícones da biblioteca React Icons

interface NavBarProps {
  projects: Project[];
  userId: string;
  userName: string;
  profilePicture?: string;
}

const NavBar: React.FC<NavBarProps> = ({ projects, userId, userName, profilePicture }) => {

  return (
    <nav className="w-64 bg-gray-800 text-white p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FaProjectDiagram className="text-blue-400 mr-2" /> Projetos
        </h2>
        <ul>
          {projects.map((project) => (
            <li key={project.id} className="mb-2">
              <Link href={`/projects/${project.id}`} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
                <span>{project.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2 flex items-center">
          <FaHome className="text-green-400 mr-2" /> Páginas
        </h2>
        <ul>
          <li className="mb-2">
            <Link href="/" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
              <FaHome />
              <span>Home</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/projects" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
              <FaProjectDiagram />
              <span>Projetos</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link href={`/users/${userId}`} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
              <FaUser />
              <span>Meu Perfil</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
