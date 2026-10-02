import React, { useState } from 'react';
import { Project } from '../types';

interface ProjectListProps {
  projects: Project[];
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="w-full group/list relative" onMouseMove={handleMouseMove}>
      {/* Floating View Site Badge */}
      <div 
        className="pointer-events-none fixed z-[120] hidden md:flex items-center justify-center mix-blend-difference"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className={`
          flex items-center justify-center text-center
          w-24 h-24 rounded-full bg-white text-black
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center
          ${hoveredProject !== null ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
        `}>
           <span className="font-sans text-xs font-bold uppercase tracking-widest leading-none">
             View<br/>Site
           </span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="flex flex-col border-t border-black/5">
        {projects.map((project, index) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative grid grid-cols-1 md:grid-cols-12 py-8 md:py-16 border-b border-black/5 items-start md:items-center hover:bg-neutral-50 transition-colors duration-500 cursor-none"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Index */}
            <div className="col-span-12 md:col-span-2 font-sans text-xs font-medium text-neutral-400 group-hover:text-black transition-colors mb-2 md:mb-0">
              (0{index + 1})
            </div>

            {/* Title */}
            <div className="col-span-12 md:col-span-6">
              <h3 className="text-4xl md:text-7xl font-display font-bold text-black group-hover:indent-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] uppercase tracking-tight">
                {project.title}
              </h3>
            </div>

            {/* Category */}
            <div className="col-span-6 md:col-span-2 mt-4 md:mt-0 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
              <span className="block font-sans text-xs uppercase tracking-widest text-neutral-500 mb-1">
                Role
              </span>
              <span className="font-serif text-lg italic text-black">
                {project.category.split('•')[0]}
              </span>
            </div>

            {/* Year */}
            <div className="col-span-6 md:col-span-2 mt-4 md:mt-0 text-right opacity-50 group-hover:opacity-100 transition-opacity duration-500">
               <span className="block font-sans text-xs uppercase tracking-widest text-neutral-500 mb-1">
                Year
               </span>
               <span className="font-sans text-sm font-medium text-black">
                {project.year}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};