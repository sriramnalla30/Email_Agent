import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Mail, Brain, MessageSquare, PenTool } from 'lucide-react';
import clsx from 'clsx';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();

    const navItems = [
        { name: 'Inbox', path: '/', icon: Mail },
        { name: 'Prompt Brain', path: '/brain', icon: Brain },
        { name: 'Email Agent', path: '/agent', icon: MessageSquare },
        { name: 'Drafts', path: '/drafts', icon: PenTool },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                        Ocean AI
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">Productivity Agent</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={clsx(
                                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                                    isActive
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                )}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 px-4 py-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400" />
                        <div>
                            <p className="text-sm font-medium text-white">User</p>
                            <p className="text-xs text-slate-500">user@oceanai.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
                    <h2 className="text-xl font-semibold text-slate-800">
                        {navItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
                    </h2>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                            <span className="sr-only">Notifications</span>
                            <div className="w-2 h-2 bg-red-500 rounded-full absolute top-5 right-5" />
                        </button>
                    </div>
                </header>
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
