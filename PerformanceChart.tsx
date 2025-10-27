
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Employee } from '../types';

interface PerformanceChartProps {
    data: Employee[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
    const scoreRanges = [
        { name: 'Excellent (90-100)', min: 90, max: 100, color: '#22c55e' },
        { name: 'Good (80-89)', min: 80, max: 89, color: '#84cc16' },
        { name: 'Average (70-79)', min: 70, max: 79, color: '#facc15' },
        { name: 'Needs Improvement (<70)', min: 0, max: 69, color: '#ef4444' }
    ];

    const chartData = scoreRanges.map(range => ({
        name: range.name,
        value: data.filter(emp => emp.performanceScore >= range.min && emp.performanceScore <= range.max).length
    }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius="80%"
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={scoreRanges[index].color} />
                    ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                      backgroundColor: 'rgba(30, 41, 59, 0.9)',
                      borderColor: 'rgba(128, 128, 128, 0.5)',
                      borderRadius: '0.5rem',
                      color: 'white'
                  }}
                />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PerformanceChart;