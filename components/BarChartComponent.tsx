
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { BarData } from '../types';
import { CHART_COLORS } from '../constants';

interface BarChartComponentProps {
    data: BarData[];
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <defs>
                    <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={CHART_COLORS[0]} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={CHART_COLORS[0]} stopOpacity={0.2}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" tick={{ fill: '#a0aec0' }} />
                <YAxis tick={{ fill: '#a0aec0' }} />
                <Tooltip 
                    cursor={{ fill: 'rgba(56, 189, 248, 0.1)' }}
                    contentStyle={{ 
                        backgroundColor: 'rgba(17, 24, 39, 0.8)',
                        borderColor: '#374151',
                        color: '#fff'
                    }} 
                />
                <Legend wrapperStyle={{ color: '#a0aec0' }} />
                <Bar dataKey="ventas" fill="url(#colorVentas)" name="Ventas" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;