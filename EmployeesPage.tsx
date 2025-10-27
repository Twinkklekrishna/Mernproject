
import React, { useState, useEffect, useCallback } from 'react';
import { Employee } from '../types';
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from '../services/api';
import EmployeeTable from './EmployeeTable';
import Modal from './Modal';
import EmployeeForm from './EmployeeForm';
import Spinner from './Spinner';
import Toast from './Toast';
import { Plus } from 'lucide-react';

const EmployeesPage: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getEmployees();
            setEmployees(data);
        } catch (error) {
            showToast('Failed to fetch employees', 'error');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleAdd = () => {
        setEditingEmployee(null);
        setIsModalOpen(true);
    };

    const handleEdit = (employee: Employee) => {
        setEditingEmployee(employee);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await deleteEmployee(id);
                showToast('Employee deleted successfully', 'success');
                fetchEmployees();
            } catch (error) {
                showToast('Failed to delete employee', 'error');
            }
        }
    };

    const handleFormSubmit = async (data: Omit<Employee, 'id' | 'lastUpdated'>) => {
        try {
            if (editingEmployee) {
                await updateEmployee(editingEmployee.id, data);
                showToast('Employee updated successfully', 'success');
            } else {
                await addEmployee(data);
                showToast('Employee added successfully', 'success');
            }
            setIsModalOpen(false);
            fetchEmployees();
        } catch (error) {
            showToast('Failed to save employee', 'error');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Manage Employees</h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-primary-700 transition-colors"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Employee
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64"><Spinner /></div>
            ) : (
                <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h3 className="text-2xl font-semibold mb-4">{editingEmployee ? 'Edit Employee' : 'Add New Employee'}</h3>
                <EmployeeForm
                    onSubmit={handleFormSubmit}
                    initialData={editingEmployee}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
            
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
};

export default EmployeesPage;