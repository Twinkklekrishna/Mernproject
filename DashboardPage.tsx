
import React, { useState, useEffect } from 'react';
import { Employee } from '../types';
import { getEmployees } from '../services/api';
import PerformanceChart from './PerformanceChart';
import { Users, CheckCircle, TrendingUp, Star } from 'lucide-react';
import Spinner from './Spinner';

const StatCard = ({ title, value, icon: Icon, color }: { title: string; value: string | number; icon: React.ElementType, color: string }) => (
    <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex items-center">
        <div className={`p-4 rounded-full ${color}`}>
            <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="ml-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">{value}</p>
        </div>
    </div>
);


const DashboardPage: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
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

    const totalEmployees = employees.length;
    const totalTasksCompleted = employees.reduce((acc, emp) => acc + emp.tasksCompleted, 0);
    const averagePerformance = totalEmployees > 0 
        ? (employees.reduce((acc, emp) => acc + emp.performanceScore, 0) / totalEmployees).toFixed(1)
        : 0;

    const topPerformer = employees.length > 0 ? employees.reduce((prev, current) => (prev.performanceScore > current.performanceScore) ? prev : current) : null;

    if (loading) {
        return <div className="flex items-center justify-center h-full"><Spinner /></div>;
    }

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Employees" value={totalEmployees} icon={Users} color="bg-blue-500" />
                <StatCard title="Tasks Completed" value={totalTasksCompleted.toLocaleString()} icon={CheckCircle} color="bg-green-500" />
                <StatCard title="Avg. Performance" value={`${averagePerformance}%`} icon={TrendingUp} color="bg-purple-500" />
                <StatCard title="Top Performer" value={topPerformer?.name || 'N/A'} icon={Star} color="bg-amber-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Performance Distribution</h3>
                    <div className="w-full h-80">
                        <PerformanceChart data={employees} />
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Recent Updates</h3>
                    <ul className="space-y-4">
                        {employees.slice(0, 5).map(emp => (
                            <li key={emp.id} className="flex items-center">
                                <img src={`https://i.pravatar.cc/150?u=${emp.email}`} alt={emp.name} className="w-10 h-10 rounded-full mr-3"/>
                                <div>
                                    <p className="font-semibold">{emp.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{emp.position}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;