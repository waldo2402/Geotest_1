import React from 'react';
import { PROJECTS_DATA } from '../constants';
import ProjectCard from './ProjectCard';

interface ProjectsPageProps {
    onProjectSelect: (id: number) => void;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ onProjectSelect }) => {
    return (
        <main>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white">Gestión de Proyectos</h2>
                <p className="text-gray-400 mt-1">
                    Selecciona un proyecto para ver sus detalles.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {PROJECTS_DATA.map((project) => (
                    <ProjectCard 
                        key={project.id} 
                        project={project} 
                        onProjectSelect={onProjectSelect} 
                    />
                ))}
            </div>
        </main>
    );
};

export default ProjectsPage;