
import React, { useState, useEffect } from 'react';
import { Employee } from '../types';
import { getEmployees } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Spinner from './Spinner';

const PerformanceStatsPage: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            try {
                const data = await getEmployees();
                setEmployees(data);
            } catch (error) {
                console.error("Failed to fetch employees", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    const getDepartmentStats = () => {
        const departmentData: { [key: string]: { totalScore: number; count: number; tasks: number } } = {};
        employees.forEach(emp => {
            if (!departmentData[emp.department]) {
                departmentData[emp.department] = { totalScore: 0, count: 0, tasks: 0 };
            }
            departmentData[emp.department].totalScore += emp.performanceScore;
            departmentData[emp.department].count += 1;
            departmentData[emp.department].tasks += emp.tasksCompleted;
        });

        return Object.entries(departmentData).map(([name, data]) => ({
            name,
            'Average Performance': parseFloat((data.totalScore / data.count).toFixed(2)),
            'Total Tasks': data.tasks,
        }));
    };
    
    const departmentStats = getDepartmentStats();

    if (loading) {
        return <div className="flex items-center justify-center h-full"><Spinner /></div>;
    }

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Performance Statistics</h2>

            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Department Performance Overview</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Comparing average performance scores and total tasks completed across departments.</p>
                <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                        <BarChart
                            data={departmentStats}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128, 128, 128, 0.2)" />
                            <XAxis dataKey="name" stroke="gray" />
                            <YAxis yAxisId="left" orientation="left" stroke="gray" unit="%" />
                            <YAxis yAxisId="right" orientation="right" stroke="gray" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(30, 41, 59, 0.9)',
                                    borderColor: 'rgba(128, 128, 128, 0.5)',
                                    borderRadius: '0.5rem',
                                    color: 'white'
                                }}
                            />
                            <Legend />
                            <Bar yAxisId="left" dataKey="Average Performance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            <Bar yAxisId="right" dataKey="Total Tasks" fill="#84cc16" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

             <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Top 5 Performers</h3>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {employees.sort((a,b) => b.performanceScore - a.performanceScore).slice(0,5).map(emp => (
                         <li key={emp.id} className="py-4 flex items-center justify-between">
                             <div className="flex items-center">
                                <img src={`https://i.pravatar.cc/150?u=${emp.email}`} alt={emp.name} className="w-10 h-10 rounded-full mr-4"/>
                                <div>
                                    <p className="font-semibold">{emp.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{emp.position}</p>
                                </div>
                             </div>
                             <div className="text-lg font-bold text-primary-500">{emp.performanceScore}%</div>
                         </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PerformanceStatsPage;