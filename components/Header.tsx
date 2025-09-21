import React from 'react';

interface HeaderProps {
    activeView: 'dashboard' | 'projects';
    onNavigate: (view: 'dashboard' | 'projects') => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, onNavigate }) => {
    
    const navItemClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300";
    const activeClasses = "bg-highlight/20 text-highlight";
    const inactiveClasses = "text-gray-400 hover:bg-secondary hover:text-white";

    return (
        <header className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                        Geotest
                    </h1>
                    <p className="text-gray-400 mt-1">
                        Plataforma de Gestión de Proyectos.
                    </p>
                </div>
                <nav className="mt-4 sm:mt-0 bg-secondary/50 border border-gray-700 rounded-lg p-1 flex space-x-1">
                    <button 
                        onClick={() => onNavigate('dashboard')}
                        className={`${navItemClasses} ${activeView === 'dashboard' ? activeClasses : inactiveClasses}`}
                        aria-current={activeView === 'dashboard' ? 'page' : undefined}
                    >
                        Dashboard
                    </button>
                    <button 
                        onClick={() => onNavigate('projects')}
                        className={`${navItemClasses} ${activeView === 'projects' ? activeClasses : inactiveClasses}`}
                        aria-current={activeView === 'projects' ? 'page' : undefined}
                    >
                        Proyectos
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;