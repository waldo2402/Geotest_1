
import React from 'react';
import type { KpiData } from '../types';

type KpiCardProps = Omit<KpiData, 'icon'> & { icon: React.ReactNode };


const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon, change, changeType }) => {
    const changeColor = changeType === 'increase' ? 'text-green-400' : 'text-red-400';
    const changeIcon = changeType === 'increase' ? '▲' : '▼';
    
    return (
        <div className="bg-secondary/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-emerald-400/10 transition-shadow duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-400">{title}</p>
                    <p className="text-3xl font-bold text-white mt-1">{value}</p>
                </div>
                <div className="bg-gray-800 p-3 rounded-full">
                    {icon}
                </div>
            </div>
            <div className="mt-4 flex items-center space-x-1">
                <span className={`text-sm font-semibold ${changeColor}`}>{changeIcon} {change}</span>
                <span className="text-xs text-gray-500">vs mes anterior</span>
            </div>
        </div>
    );
};

export default KpiCard;