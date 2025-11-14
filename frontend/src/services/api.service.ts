/**
 * API Service - Single Responsibility Principle
 * Handles all API communication with the backend
 */

import axios, { AxiosInstance, AxiosError } from 'axios';

// Use relative path to leverage Vite proxy during development
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

class ApiService {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to inject token
    this.client.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });

    // Load token from localStorage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.setToken(storedToken);
    }
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  // Auth endpoints
  async register(data: { email: string; password: string; firstName?: string; lastName?: string }) {
    const response = await this.client.post('/auth/register', data);
    return response.data;
  }

  async login(data: { email: string; password: string }) {
    const response = await this.client.post('/auth/login', data);
    if (response.data.token) {
      this.setToken(response.data.token);
    }
    return response.data;
  }

  logout() {
    this.clearToken();
  }

  // File endpoints
  async uploadFile(file: File, onProgress?: (progress: number) => void) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.client.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });

    return response.data;
  }

  async getFiles(params?: { search?: string; tags?: string[] }) {
    const response = await this.client.get('/files', { params });
    return response.data;
  }

  async getStorageStats() {
    const response = await this.client.get('/files/stats');
    return response.data as { storageUsed: number; storageQuota: number; fileCount: number };
  }

  async getFile(fileId: string) {
    const response = await this.client.get(`/files/${fileId}`);
    return response.data;
  }

  async deleteFile(fileId: string) {
    const response = await this.client.delete(`/files/${fileId}`);
    return response.data;
  }

  async renameFile(fileId: string, fileName: string) {
    const response = await this.client.put(`/files/${fileId}`, { fileName });
    return response.data;
  }

  async updateFileTags(fileId: string, tags: string[]) {
    const response = await this.client.put(`/files/${fileId}/tags`, { tags });
    return response.data;
  }

  async setFilePassword(fileId: string, password: string) {
    const response = await this.client.post(`/files/${fileId}/password`, { password });
    return response.data;
  }

  async removeFilePassword(fileId: string) {
    const response = await this.client.delete(`/files/${fileId}/password`);
    return response.data;
  }

  getDownloadUrl(fileId: string): string {
    return `${API_BASE_URL}/files/${fileId}/download`;
  }

  getPreviewUrl(fileId: string): string {
    return `${API_BASE_URL}/files/${fileId}/preview`;
  }

  getThumbnailUrl(fileId: string): string {
    return `${API_BASE_URL}/files/${fileId}/thumbnail`;
  }

  // Share endpoints
  async createShare(data: {
    fileId: string;
    password?: string;
    expiresAt?: string;
    maxDownloads?: number;
  }) {
    const response = await this.client.post('/shares', data);
    return response.data;
  }

  async getShare(shareId: string) {
    const response = await this.client.get(`/shares/${shareId}`);
    return response.data;
  }

  async revokeShare(shareId: string) {
    const response = await this.client.delete(`/shares/${shareId}`);
    return response.data;
  }

  async generateSignedUrl(shareId: string, expiresInSeconds: number = 600) {
    const response = await this.client.post(`/shares/${shareId}/signed-url`, { expiresInSeconds });
    return response.data;
  }

  // Search endpoint
  async searchFiles(query: string, tags?: string[]) {
    const response = await this.client.get('/files/search', {
      params: { q: query, tags: tags?.join(',') },
    });
    return response.data;
  }

  // Conversion endpoints
  async getSupportedFormats() {
    const response = await this.client.get('/conversions/formats');
    return response.data;
  }

  async requestConversion(fileId: string, targetFormat: string) {
    const response = await this.client.post('/conversions', { fileId, to: targetFormat });
    return response.data;
  }

  async getConversionStatus(conversionId: string) {
    const response = await this.client.get(`/conversions/${conversionId}`);
    return response.data;
  }

  getConversionDownloadUrl(conversionId: string): string {
    return `${API_BASE_URL}/conversions/${conversionId}/download`;
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export error handler
export function handleApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return axiosError.response?.data?.message || axiosError.message || 'An error occurred';
  }
  return 'An unexpected error occurred';
}
