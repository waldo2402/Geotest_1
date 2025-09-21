import React from 'react';
import type { Project } from '../types';

interface ProjectCardProps {
    project: Project;
    onProjectSelect: (id: number) => void;
}

const getStatusClasses = (status: Project['status']): string => {
    switch (status) {
        case 'Completado':
            return 'bg-green-500/20 text-green-300';
        case 'En Pausa':
            return 'bg-yellow-500/20 text-yellow-300';
        case 'En Progreso':
        default:
            return 'bg-blue-500/20 text-blue-300';
    }
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onProjectSelect }) => {
    const { id, name, description, budget, spent, status, team } = project;
    const progressPercentage = budget > 0 ? (spent / budget) * 100 : 0;

    return (
        <button 
            onClick={() => onProjectSelect(id)}
            className="text-left bg-secondary/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-sky-400/10 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-highlight"
            aria-label={`Ver detalles del proyecto ${name}`}
        >
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-white pr-4">{name}</h3>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusClasses(status)}`}>
                    {status}
                </span>
            </div>
            <p className="text-sm text-gray-400 mb-4 flex-grow">{description}</p>
            
            {/* Budget */}
            <div className="mb-4">
                <div className="flex justify-between text-sm mb-1 text-gray-300">
                    <span>Gastado: <span className="font-bold text-white">${spent.toLocaleString()}</span></span>
                    <span>Presupuesto: <span className="font-bold text-white">${budget.toLocaleString()}</span></span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                        className="bg-gradient-to-r from-accent to-highlight h-2.5 rounded-full"
                        style={{ width: `${progressPercentage}%` }}
                        role="progressbar"
                        aria-valuenow={progressPercentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`Progreso del presupuesto: ${progressPercentage.toFixed(0)}%`}
                    ></div>
                </div>
            </div>

            {/* Team */}
            <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Equipo Asignado</h4>
                <div className="flex items-center space-x-2">
                    <div className="flex -space-x-3">
                        {team.map((member, index) => (
                           <div key={index} className="group relative">
                                <img
                                    className="h-9 w-9 rounded-full border-2 border-secondary object-cover"
                                    src={member.avatarUrl}
                                    alt={member.name}
                                />
                                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                    {member.name}
                                </span>
                           </div>
                        ))}
                    </div>
                     {team.length > 4 && (
                        <span className="text-xs text-gray-400 pl-2">+{team.length - 4} más</span>
                    )}
                </div>
            </div>
        </button>
    );
};

export default ProjectCard;