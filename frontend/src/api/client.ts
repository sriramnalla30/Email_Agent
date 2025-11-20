import axios from 'axios';

const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8001',
});

export const getEmails = async () => {
    const response = await client.get('/emails');
    return response.data;
};

export const getPrompts = async () => {
    const response = await client.get('/prompts');
    return response.data;
};

export const updatePrompt = async (prompt: any) => {
    const response = await client.post('/prompts', prompt);
    return response.data;
};

export const loadMockData = async () => {
    const response = await client.post('/ingest/mock');
    return response.data;
};

export const processInbox = async () => {
    const response = await client.post('/ingest/process');
    return response.data;
};

export default client;
