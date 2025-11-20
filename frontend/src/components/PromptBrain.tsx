import React, { useEffect, useState } from 'react';
import { getPrompts, updatePrompt } from '../api/client';
import { Save, RotateCcw } from 'lucide-react';

interface Prompt {
    id: number;
    name: string;
    template: string;
    description: string;
}

const PromptBrain = () => {
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchPrompts();
    }, []);

    const fetchPrompts = async () => {
        setLoading(true);
        try {
            const data = await getPrompts();
            setPrompts(data);
        } catch (error) {
            console.error("Failed to fetch prompts", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (prompt: Prompt) => {
        setSaving(true);
        try {
            await updatePrompt(prompt);
            // Show success toast (omitted for brevity)
        } catch (error) {
            console.error("Failed to save prompt", error);
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (id: number, field: keyof Prompt, value: string) => {
        setPrompts(prompts.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Prompt Brain</h1>
                    <p className="text-slate-500">Configure the agent's behavior instructions.</p>
                </div>
                <button
                    onClick={fetchPrompts}
                    className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <RotateCcw size={20} />
                </button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {prompts.map((prompt) => (
                    <div key={prompt.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg capitalize text-slate-800">
                                {prompt.name.replace('_', ' ')}
                            </h3>
                            <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">
                                {prompt.name}
                            </span>
                        </div>

                        <p className="text-sm text-slate-500">{prompt.description}</p>

                        <div className="flex-1">
                            <label className="block text-xs font-medium text-slate-700 mb-1">
                                Prompt Template
                            </label>
                            <textarea
                                value={prompt.template}
                                onChange={(e) => handleChange(prompt.id, 'template', e.target.value)}
                                className="w-full h-48 p-3 text-sm font-mono bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={() => handleSave(prompt)}
                                disabled={saving}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 transition-colors"
                            >
                                <Save size={16} />
                                Save Configuration
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PromptBrain;
