import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  register: (userData: { username: string; email: string; password: string }) =>
    api.post('/auth/register', userData),
  
  getProfile: () => api.get('/auth/profile'),
  
  updateProfile: (updates: { username?: string; email?: string }) =>
    api.put('/auth/profile', updates),
  
  changePassword: (passwords: { currentPassword: string; newPassword: string }) =>
    api.put('/auth/change-password', passwords),
  
  verifyToken: () => api.get('/auth/verify'),
};

// Files API
export const filesAPI = {
  uploadFile: (formData: FormData) =>
    api.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  
  getUserFiles: (params: { page?: number; limit?: number; search?: string }) =>
    api.get('/files/my-files', { params }),
  
  getFileDetails: (fileId: string) =>
    api.get(`/files/${fileId}`),
  
  deleteFile: (fileId: string) =>
    api.delete(`/files/${fileId}`),
  
  getFileStats: (fileId: string) =>
    api.get(`/files/${fileId}/stats`),
};

// Charts API
export const chartsAPI = {
  getChartTypes: () => api.get('/charts/types'),
  
  generateChart: (params: {
    fileId: string;
    sheetIndex: number;
    chartType: string;
    xAxis: string;
    yAxis: string;
    chartOptions?: any;
  }) => api.post('/charts/generate', params),
  
  getAnalysisHistory: (fileId: string) =>
    api.get(`/charts/file/${fileId}/history`),
  
  deleteAnalysis: (analysisId: string) =>
    api.delete(`/charts/analysis/${analysisId}`),
};

// Admin API
export const adminAPI = {
  getUsers: (params: { page?: number; limit?: number; search?: string; role?: string }) =>
    api.get('/admin/users', { params }),
  
  getUserDetails: (userId: string) =>
    api.get(`/admin/users/${userId}`),
  
  updateUserRole: (userId: string, role: string) =>
    api.put(`/admin/users/${userId}/role`, { role }),
  
  toggleUserStatus: (userId: string) =>
    api.put(`/admin/users/${userId}/status`),
  
  deleteUser: (userId: string) =>
    api.delete(`/admin/users/${userId}`),
  
  getPlatformStats: () => api.get('/admin/stats'),
  
  getAllFiles: (params: { page?: number; limit?: number; search?: string; user?: string }) =>
    api.get('/admin/files', { params }),
};

export default api;
