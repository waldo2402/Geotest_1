
import React from 'react';

interface ChartCardProps {
    title: string;
    description: string;
    children: React.ReactNode;
    onShowDescription: (title: string, description: string) => void;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, description, children, onShowDescription }) => {
    return (
        <div className="bg-secondary/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-white">{title}</h2>
                <button
                    onClick={() => onShowDescription(title, description)}
                    className="flex items-center text-sm text-highlight hover:text-cyan-300 transition-colors duration-200 bg-highlight/10 hover:bg-highlight/20 px-3 py-1 rounded-full"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Info
                </button>
            </div>
            <div className="flex-grow w-full h-80">
                {children}
            </div>
        </div>
    );
};

export default ChartCard;
