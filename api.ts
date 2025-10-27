
import { Employee } from '../types';

let employees: Employee[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice.j@example.com', position: 'Frontend Developer', department: 'Engineering', performanceScore: 92, tasksCompleted: 120, lastUpdated: '2023-10-26T10:00:00Z' },
  { id: '2', name: 'Bob Smith', email: 'bob.s@example.com', position: 'Backend Developer', department: 'Engineering', performanceScore: 88, tasksCompleted: 115, lastUpdated: '2023-10-25T14:30:00Z' },
  { id: '3', name: 'Charlie Brown', email: 'charlie.b@example.com', position: 'UI/UX Designer', department: 'Design', performanceScore: 95, tasksCompleted: 80, lastUpdated: '2023-10-26T11:00:00Z' },
  { id: '4', name: 'Diana Prince', email: 'diana.p@example.com', position: 'Project Manager', department: 'Management', performanceScore: 90, tasksCompleted: 50, lastUpdated: '2023-10-24T09:00:00Z' },
  { id: '5', name: 'Ethan Hunt', email: 'ethan.h@example.com', position: 'QA Engineer', department: 'Engineering', performanceScore: 85, tasksCompleted: 250, lastUpdated: '2023-10-26T16:00:00Z' },
  { id: '6', name: 'Fiona Glenanne', email: 'fiona.g@example.com', position: 'DevOps Specialist', department: 'Engineering', performanceScore: 91, tasksCompleted: 95, lastUpdated: '2023-10-23T12:00:00Z' },
  { id: '7', name: 'George Costanza', email: 'george.c@example.com', position: 'Product Owner', department: 'Product', performanceScore: 82, tasksCompleted: 45, lastUpdated: '2023-10-25T18:00:00Z' },
  { id: '8', name: 'Hannah Montana', email: 'hannah.m@example.com', position: 'Marketing Lead', department: 'Marketing', performanceScore: 96, tasksCompleted: 60, lastUpdated: '2023-10-26T13:45:00Z' },
];

const simulateLatency = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getEmployees = async (): Promise<Employee[]> => {
  await simulateLatency(500);
  return [...employees];
};

export const getEmployeeById = async (id: string): Promise<Employee | undefined> => {
  await simulateLatency(300);
  return employees.find(emp => emp.id === id);
};

export const addEmployee = async (employeeData: Omit<Employee, 'id' | 'lastUpdated'>): Promise<Employee> => {
  await simulateLatency(700);
  const newEmployee: Employee = {
    ...employeeData,
    id: String(Date.now()),
    lastUpdated: new Date().toISOString(),
  };
  employees.unshift(newEmployee);
  return newEmployee;
};

export const updateEmployee = async (id: string, updates: Partial<Employee>): Promise<Employee> => {
  await simulateLatency(700);
  let employeeToUpdate = employees.find(emp => emp.id === id);
  if (!employeeToUpdate) {
    throw new Error('Employee not found');
  }
  const updatedEmployee = { ...employeeToUpdate, ...updates, lastUpdated: new Date().toISOString() };
  employees = employees.map(emp => (emp.id === id ? updatedEmployee : emp));
  return updatedEmployee;
};

export const deleteEmployee = async (id: string): Promise<{ success: boolean }> => {
  await simulateLatency(700);
  const initialLength = employees.length;
  employees = employees.filter(emp => emp.id !== id);
  if (employees.length === initialLength) {
    throw new Error('Employee not found');
  }
  return { success: true };
};
