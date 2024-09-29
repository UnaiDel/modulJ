// src/services/apiService.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;

export const sendAudioData = async (audioFile: string) => {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: audioFile,
      type: 'audio/wav',
      name: 'recordedAudio.wav',
    });

    await api.post('/audio', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log('Audio sent successfully');
  } catch (error) {
    console.error('Error sending audio:', error);
  }
};

export const sendTextData = async (text: string) => {
  try {
    const response = await api.post('/text', { text });
    console.log('Text sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending text:', error);
  }
};
