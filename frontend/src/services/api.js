import axios from 'axios';
const API = axios.create({ baseURL: 'http://ai-resume-builder-n6ih.onrender.com/api', headers: { 'Content-Type': 'application/json' } });
export const generateResume = (formData) => API.post('/generate-resume', formData);
export const downloadPDF = (resumeData) => API.post('/download-pdf', resumeData, { responseType: 'blob' });
export default API;
