import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { PenTool, Send, Save, Trash2 } from 'lucide-react';

interface Draft {
    id: number;
    subject: string;
    body: string;
    status: string;
}

const Drafts = () => {
    const [drafts, setDrafts] = useState<Draft[]>([]);
    const [selectedDraft, setSelectedDraft] = useState<Draft | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDrafts();
    }, []);

    const fetchDrafts = async () => {
        setLoading(true);
        try {
            const response = await client.get('/drafts');
            setDrafts(response.data);
        } catch (error) {
            console.error("Failed to fetch drafts", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!selectedDraft) return;
        // Logic to save/update draft would go here
        console.log("Saving draft:", selectedDraft);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
            {/* Draft List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-200 bg-slate-50">
                    <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                        <PenTool size={18} />
                        Drafts
                    </h3>
                </div>
                <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                    {drafts.map((draft) => (
                        <div
                            key={draft.id}
                            onClick={() => setSelectedDraft(draft)}
                            className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${selectedDraft?.id === draft.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
                        >
                            <div className="font-medium text-slate-900 truncate">{draft.subject || '(No Subject)'}</div>
                            <div className="text-xs text-slate-500 mt-1 truncate">{draft.body}</div>
                        </div>
                    ))}
                    {drafts.length === 0 && (
                        <div className="p-8 text-center text-slate-400 text-sm">
                            No drafts yet. Ask the agent to create one!
                        </div>
                    )}
                </div>
            </div>

            {/* Editor */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
                {selectedDraft ? (
                    <>
                        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                            <input
                                type="text"
                                value={selectedDraft.subject}
                                onChange={(e) => setSelectedDraft({ ...selectedDraft, subject: e.target.value })}
                                className="text-lg font-semibold text-slate-800 bg-transparent outline-none w-full"
                                placeholder="Subject"
                            />
                            <div className="flex gap-2">
                                <button onClick={handleSave} className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                                    <Save size={20} />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                        <textarea
                            value={selectedDraft.body}
                            onChange={(e) => setSelectedDraft({ ...selectedDraft, body: e.target.value })}
                            className="flex-1 p-6 resize-none outline-none text-slate-700 leading-relaxed"
                            placeholder="Start writing..."
                        />
                        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
                            <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                <Send size={18} />
                                Send Email
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-slate-400 flex-col gap-4">
                        <PenTool size={48} className="opacity-20" />
                        <p>Select a draft to edit</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Drafts;
