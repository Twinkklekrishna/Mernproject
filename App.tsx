
import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './hooks/useTheme';
import DashboardPage from './components/DashboardPage';
import EmployeesPage from './components/EmployeesPage';
import PerformanceStatsPage from './components/PerformanceStatsPage';
import { Home, Users, BarChart3, Sun, Moon, Menu, X } from 'lucide-react';

type Page = '/' | '/employees' | '/performance';

const NavLinks = ({ currentPage, onNavigate }: { currentPage: Page; onNavigate: (page: Page) => void; }) => {
    const linkClasses = "flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/50 rounded-lg transition-colors duration-200 w-full text-left";
    const activeLinkClasses = "bg-primary-500 text-white dark:bg-primary-600 dark:text-white shadow-lg";

    const getLinkClass = (path: Page) => {
        return `${linkClasses} ${currentPage === path ? activeLinkClasses : ''}`;
    }

    return (
        <>
            <button onClick={() => onNavigate('/')} className={getLinkClass('/')}>
                <Home className="w-5 h-5 mr-3" />
                Dashboard
            </button>
            <button onClick={() => onNavigate('/employees')} className={getLinkClass('/employees')}>
                <Users className="w-5 h-5 mr-3" />
                Employees
            </button>
            <button onClick={() => onNavigate('/performance')} className={getLinkClass('/performance')}>
                <BarChart3 className="w-5 h-5 mr-3" />
                Performance Stats
            </button>
        </>
    )
};

const Sidebar = ({ isOpen, setIsOpen, currentPage, onNavigate }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void; currentPage: Page; onNavigate: (page: Page) => void; }) => (
    <>
        <aside className={`fixed inset-y-0 left-0 bg-white dark:bg-gray-900 z-30 w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex-shrink-0 border-r border-gray-200 dark:border-gray-800 flex flex-col`}>
            <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200 dark:border-gray-800">
                <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">TeamPulse</h1>
                 <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-600 dark:text-gray-300">
                    <X className="w-6 h-6" />
                </button>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                <NavLinks currentPage={currentPage} onNavigate={onNavigate} />
            </nav>
        </aside>
        {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/50 z-20 md:hidden"></div>}
    </>
);

const Navbar = ({ setIsSidebarOpen }: { setIsSidebarOpen: (isOpen: boolean) => void; }) => {
    const { theme, toggleTheme } = useTheme();
    return (
        <header className="flex-1 h-20 flex items-center justify-between px-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-600 dark:text-gray-300">
                <Menu className="w-6 h-6" />
            </button>
            <div className="flex-1"></div>
            <div className="flex items-center space-x-4">
                <button onClick={toggleTheme} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                    {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                </button>
                <img className="w-10 h-10 rounded-full" src="https://picsum.photos/100" alt="User Avatar" />
            </div>
        </header>
    );
};

const AppContent: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<Page>('/');

    const renderPage = () => {
        switch (currentPage) {
            case '/employees':
                return <EmployeesPage />;
            case '/performance':
                return <PerformanceStatsPage />;
            case '/':
            default:
                return <DashboardPage />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <Sidebar 
                isOpen={isSidebarOpen} 
                setIsOpen={setIsSidebarOpen} 
                currentPage={currentPage}
                onNavigate={setCurrentPage}
            />
            <div className="flex flex-col flex-1 w-full overflow-y-auto">
                <Navbar setIsSidebarOpen={setIsSidebarOpen} />
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}

export default App;