import React, { useEffect, useState } from 'react';
import { getEmails, loadMockData, processInbox } from '../api/client';
import { RefreshCw, Download, Play, AlertCircle, CheckCircle, Clock, Loader2 } from 'lucide-react';
import clsx from 'clsx';

interface Email {
    id: number;
    sender: string;
    subject: string;
    body: string;
    timestamp: string;
    category: string;
    action_items: string;
}

const Inbox = () => {
    const [emails, setEmails] = useState<Email[]>([]);
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [mockLoading, setMockLoading] = useState(false);

    const fetchEmails = async () => {
        setLoading(true);
        try {
            const data = await getEmails();
            setEmails(data);
        } catch (error) {
            console.error("Failed to fetch emails", error);
        } finally {
            setLoading(false);
        }
    };

    // Don't auto-fetch on mount - wait for user to click "Load Mock Data"
    // useEffect(() => {
    //     fetchEmails();
    // }, []);

    const handleLoadMock = async () => {
        setMockLoading(true);
        setLoading(true);
        try {
            await loadMockData();
            await fetchEmails();
        } finally {
            setLoading(false);
            setMockLoading(false);
        }
    };

    const handleProcess = async () => {
        setProcessing(true);
        await processInbox();
        await fetchEmails();
        setProcessing(false);
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Important': return 'bg-red-100 text-red-700 border-red-200';
            case 'Newsletter': return 'bg-green-100 text-green-700 border-green-200';
            case 'To-Do': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Spam': return 'bg-gray-100 text-gray-700 border-gray-200';
            default: return 'bg-slate-100 text-slate-600 border-slate-200';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Inbox</h1>
                    <p className="text-slate-500">Manage and process your incoming emails.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleLoadMock}
                        disabled={mockLoading || loading}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
                    >
                        {mockLoading ? <Loader2 size={18} className="animate-spin text-blue-600" /> : <Download size={18} />}
                        {mockLoading ? 'Loading Data...' : 'Load Mock Data'}
                    </button>
                    <button
                        onClick={handleProcess}
                        disabled={processing || loading}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {processing ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} />}
                        {processing ? 'Processing...' : 'Run Agent'}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px] relative">
                {loading && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                        <Loader2 size={40} className="animate-spin text-blue-600 mb-4" />
                        <p className="text-slate-600 font-medium animate-pulse">
                            {mockLoading ? 'Generating Mock Emails...' : 'Fetching Inbox...'}
                        </p>
                    </div>
                )}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Sender</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Subject</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Category</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Actions</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {emails.map((email) => (
                                <tr key={email.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-slate-900">{email.sender}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-slate-900">{email.subject}</div>
                                        <div className="text-slate-500 text-sm truncate max-w-xs">{email.body}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={clsx('px-2.5 py-1 rounded-full text-xs font-medium border', getCategoryColor(email.category))}>
                                            {email.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {email.action_items && email.action_items !== "[]" ? (
                                            <span className="flex items-center gap-1 text-amber-600 text-xs font-medium bg-amber-50 px-2 py-1 rounded border border-amber-200 w-fit">
                                                <AlertCircle size={12} />
                                                Action Items
                                            </span>
                                        ) : (
                                            <span className="text-slate-400 text-xs">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {new Date(email.timestamp).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                            {emails.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        No emails found. Click "Load Mock Data" to start.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Inbox;
