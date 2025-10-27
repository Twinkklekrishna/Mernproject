
import React, { useState, useMemo } from 'react';
import { Employee } from '../types';
import { Edit, Trash2, Search, ArrowUpDown } from 'lucide-react';

interface EmployeeTableProps {
    employees: Employee[];
    onEdit: (employee: Employee) => void;
    onDelete: (id: string) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('all');
    const [sortConfig, setSortConfig] = useState<{ key: keyof Employee; direction: 'ascending' | 'descending' } | null>(null);

    const departments = useMemo(() => ['all', ...Array.from(new Set(employees.map(e => e.department)))], [employees]);

    const sortedEmployees = useMemo(() => {
        let sortableItems = [...employees];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [employees, sortConfig]);

    const filteredEmployees = useMemo(() => {
        return sortedEmployees.filter(employee => {
            const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
            return matchesSearch && matchesDepartment;
        });
    }, [sortedEmployees, searchTerm, departmentFilter]);

    const requestSort = (key: keyof Employee) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key: keyof Employee) => {
        if (!sortConfig || sortConfig.key !== key) {
            return <ArrowUpDown className="w-4 h-4 ml-2 opacity-30" />;
        }
        return sortConfig.direction === 'ascending' ? '▲' : '▼';
    }

    return (
        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-sm">
            <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className="md:w-1/4 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:outline-none px-4 py-2"
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                >
                    {departments.map(dep => <option key={dep} value={dep}>{dep === 'all' ? 'All Departments' : dep}</option>)}
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            {['name', 'position', 'department', 'performanceScore', 'tasksCompleted'].map(key => (
                                <th key={key} className="p-4 uppercase text-sm font-semibold text-gray-500 dark:text-gray-400">
                                    <button onClick={() => requestSort(key as keyof Employee)} className="flex items-center">
                                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                        <span className="ml-1">{getSortIcon(key as keyof Employee)}</span>
                                    </button>
                                </th>
                            ))}
                            <th className="p-4 uppercase text-sm font-semibold text-gray-500 dark:text-gray-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((employee) => (
                            <tr key={employee.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="p-4">
                                    <div className="flex items-center">
                                        <img src={`https://i.pravatar.cc/150?u=${employee.email}`} alt={employee.name} className="w-10 h-10 rounded-full mr-3"/>
                                        <div>
                                            <p className="font-semibold">{employee.name}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{employee.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">{employee.position}</td>
                                <td className="p-4">{employee.department}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${employee.performanceScore >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : employee.performanceScore >= 80 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                                        {employee.performanceScore}%
                                    </span>
                                </td>
                                <td className="p-4">{employee.tasksCompleted}</td>
                                <td className="p-4">
                                    <div className="flex space-x-2">
                                        <button onClick={() => onEdit(employee)} className="p-2 text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200"><Edit className="w-5 h-5" /></button>
                                        <button onClick={() => onDelete(employee.id)} className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"><Trash2 className="w-5 h-5" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeTable;