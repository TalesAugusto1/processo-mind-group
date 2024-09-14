"use client";

import React from 'react';
import Link from 'next/link';
import { Project } from '@/types/project';

interface NavBarProps {
  projects: Project[];
}

const NavBar: React.FC<NavBarProps> = ({ projects }) => {

  return (
    <nav className="w-64 bg-gray-800 text-white p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-4">Projetos</h2>
        <ul>
          {projects.map((project) => (
            <li key={project.id} className="mb-2">
              <Link href={`/projects/${project.id}`} className="hover:underline">
                {project.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Páginas</h2>
        <ul>
          <li className="mb-2">
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/projects" className="hover:underline">
              Projetos
            </Link>
          </li>
          {/* espaço para mais links */}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;