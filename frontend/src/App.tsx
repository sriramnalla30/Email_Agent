import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Inbox from './components/Inbox';
import PromptBrain from './components/PromptBrain';
import AgentChat from './components/AgentChat';
import Drafts from './components/Drafts';

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Inbox />} />
                <Route path="/brain" element={<PromptBrain />} />
                <Route path="/agent" element={<AgentChat />} />
                <Route path="/drafts" element={<Drafts />} />
            </Routes>
        </Layout>
    );
}

export default App;
