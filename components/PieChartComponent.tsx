import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { PieData } from '../types';
import { CHART_COLORS } from '../constants';

interface PieChartComponentProps {
    data: PieData[];
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Tooltip 
                    contentStyle={{ 
                        backgroundColor: 'rgba(17, 24, 39, 0.8)',
                        borderColor: '#374151',
                        color: '#fff'
                     }} 
                />
                <Legend 
                    layout="vertical" 
                    align="right" 
                    verticalAlign="middle" 
                    wrapperStyle={{ color: '#a0aec0', paddingLeft: '20px' }}
                />
                <Pie
                    data={data as any[]}
                    cx="40%"
                    cy="50%"
                    labelLine={false}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PieChartComponent;