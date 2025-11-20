import React, { useState, useEffect, useRef } from 'react';
import client from '../api/client';
import { Send, Bot, User, Mail } from 'lucide-react';
import clsx from 'clsx';

interface Message {
    id: number;
    role: 'user' | 'agent';
    content: string;
}

const AgentChat = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, role: 'agent', content: 'Hello! I am your Ocean AI Email Agent. How can I help you with your inbox today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now(), role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const response = await client.post('/chat', { query: input });
            const agentMsg: Message = { id: Date.now() + 1, role: 'agent', content: response.data.response };
            setMessages(prev => [...prev, agentMsg]);
        } catch (error) {
            console.error("Chat error", error);
            const errorMsg: Message = { id: Date.now() + 1, role: 'agent', content: "I'm sorry, I encountered an error processing your request." };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg) => (
                    <div key={msg.id} className={clsx("flex gap-4 max-w-3xl", msg.role === 'user' ? "ml-auto flex-row-reverse" : "")}>
                        <div className={clsx(
                            "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                            msg.role === 'agent' ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-600"
                        )}>
                            {msg.role === 'agent' ? <Bot size={20} /> : <User size={20} />}
                        </div>
                        <div className={clsx(
                            "p-4 rounded-2xl text-sm leading-relaxed",
                            msg.role === 'agent' ? "bg-slate-50 text-slate-800 rounded-tl-none" : "bg-blue-600 text-white rounded-tr-none"
                        )}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex gap-4 max-w-3xl">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                            <Bot size={20} />
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none flex gap-2">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75" />
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50">
                <div className="flex gap-2 max-w-4xl mx-auto">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask about your emails..."
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <button
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                        className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AgentChat;
