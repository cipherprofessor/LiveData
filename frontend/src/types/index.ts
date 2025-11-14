export interface User {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface File {
  fileId: string;
  userId: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  storagePath: string;
  isPasswordProtected: boolean;
  tags: string[];
  thumbnailKey?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isDeleted: boolean;
}

export interface AuthResponse {
  token: string;
  userId: string;
  email: string;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}
