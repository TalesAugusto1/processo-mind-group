"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        router.push('/auth/login'); // Redirecionar para a página de login após o cadastro
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">Cadastro</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md w-full max-w-sm">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          />
        </div>
        <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Cadastrar</button>
      </form>
      <p className="mt-4">Já tem uma conta? <Link href="/auth/login" className="text-blue-500 hover:underline">Entrar</Link></p>
    </div>
  );
};

export default SignUp;
