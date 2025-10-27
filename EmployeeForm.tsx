
import React, { useState, useEffect } from 'react';
import { Employee } from '../types';

interface EmployeeFormProps {
    onSubmit: (data: Omit<Employee, 'id' | 'lastUpdated'>) => void;
    initialData?: Employee | null;
    onCancel: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onSubmit, initialData, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        position: '',
        department: '',
        performanceScore: 80,
        tasksCompleted: 0,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                email: initialData.email,
                position: initialData.position,
                department: initialData.department,
                performanceScore: initialData.performanceScore,
                tasksCompleted: initialData.tasksCompleted,
            });
        } else {
             setFormData({
                name: '',
                email: '',
                position: '',
                department: '',
                performanceScore: 80,
                tasksCompleted: 0,
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value, 10) : value,
        }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-gray-50 dark:bg-gray-700" />
                </div>
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-gray-50 dark:bg-gray-700" />
                </div>
                 <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Position</label>
                    <input type="text" name="position" id="position" value={formData.position} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-gray-50 dark:bg-gray-700" />
                </div>
                <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Department</label>
                    <input type="text" name="department" id="department" value={formData.department} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-gray-50 dark:bg-gray-700" />
                </div>
                 <div>
                    <label htmlFor="performanceScore" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Performance Score</label>
                    <input type="number" name="performanceScore" id="performanceScore" min="0" max="100" value={formData.performanceScore} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-gray-50 dark:bg-gray-700" />
                </div>
                 <div>
                    <label htmlFor="tasksCompleted" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tasks Completed</label>
                    <input type="number" name="tasksCompleted" id="tasksCompleted" min="0" value={formData.tasksCompleted} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-gray-50 dark:bg-gray-700" />
                </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">
                    Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                    {initialData ? 'Update' : 'Save'} Employee
                </button>
            </div>
        </form>
    );
};

export default EmployeeForm;