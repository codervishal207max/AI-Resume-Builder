import axios from 'axios';

const BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:8000';

const API = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
});

export const generateResume = (formData) => API.post('/generate-resume', formData);
export const downloadPDF = (resumeData) =>
  API.post('/download-pdf', resumeData, { responseType: 'blob' });

export default API;