import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:8000/api', headers: { 'Content-Type': 'application/json' } });
export const generateResume = (formData) => API.post('/generate-resume', formData);
export const downloadPDF = (resumeData) => API.post('/download-pdf', resumeData, { responseType: 'blob' });
export default API;
