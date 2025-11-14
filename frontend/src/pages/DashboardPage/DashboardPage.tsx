import React, { useState, useEffect } from 'react';
import {
  Upload,
  LogOut,
  FileText,
  Download,
  Trash2,
  Search,
  RefreshCw
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { ThemeToggle } from '../../components/ui/ThemeToggle';
import { StorageQuota } from '../../components/ui/StorageQuota';
import { useToast } from '../../components/ui/Toast';
import { apiService, handleApiError } from '../../services/api.service';
import { formatFileSize, formatDate } from '../../lib/utils';
import type { File } from '../../types';
import styles from './DashboardPage.module.scss';

interface DashboardPageProps {
  onLogout: () => void;
}

interface StorageStats {
  storageUsed: number;
  storageQuota: number;
  fileCount: number;
}

export const DashboardPage = ({ onLogout }: DashboardPageProps) => {
  const { success, error: showError, info } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [storageStats, setStorageStats] = useState<StorageStats | null>(null);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const data = await apiService.getFiles();
      setFiles(data.files || data || []);
    } catch (err) {
      showError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const fetchStorageStats = async () => {
    try {
      const stats = await apiService.getStorageStats();
      setStorageStats(stats);
    } catch (err) {
      console.error('Failed to fetch storage stats:', err);
    }
  };

  useEffect(() => {
    fetchFiles();
    fetchStorageStats();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);
    info(`Uploading ${file.name}...`);

    try {
      await apiService.uploadFile(file, (progress) => {
        setUploadProgress(progress);
      });
      await fetchFiles();
      await fetchStorageStats(); // Refresh storage stats after upload
      setUploadProgress(0);
      success(`${file.name} uploaded successfully!`);
    } catch (err) {
      showError(handleApiError(err));
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (fileId: string, fileName: string) => {
    if (!confirm(`Are you sure you want to delete "${fileName}"?`)) return;

    try {
      await apiService.deleteFile(fileId);
      await fetchFiles();
      await fetchStorageStats(); // Refresh storage stats after delete
      success(`${fileName} deleted successfully!`);
    } catch (err) {
      showError(handleApiError(err));
    }
  };

  const handleDownload = (fileId: string, fileName: string) => {
    const url = apiService.getDownloadUrl(fileId);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    info(`Downloading ${fileName}...`);
  };

  const filteredFiles = files.filter((file) =>
    file.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="8" fill="url(#gradient)" />
                <path d="M12 20L18 26L28 16" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--primary-hover))" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 className={styles.logoText}>LiveData</h1>
          </div>

          <div className={styles.headerActions}>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              leftIcon={<LogOut size={16} />}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.toolbar}>
            <div className={styles.search}>
              <Input
                placeholder="Search files..."
                leftIcon={<Search size={16} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className={styles.actions}>
              <Button
                variant="ghost"
                size="md"
                onClick={fetchFiles}
                leftIcon={<RefreshCw size={16} />}
                isLoading={loading}
              >
                Refresh
              </Button>

              <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                <div style={{ display: 'inline-block' }}>
                  <Button
                    variant="primary"
                    size="md"
                    leftIcon={<Upload size={16} />}
                    isLoading={uploading}
                    onClick={() => {}}
                  >
                    {uploading ? `Uploading ${uploadProgress}%` : 'Upload File'}
                  </Button>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  disabled={uploading}
                />
              </label>
            </div>
          </div>

          {storageStats && (
            <div style={{ marginBottom: '24px' }}>
              <StorageQuota
                used={storageStats.storageUsed}
                total={storageStats.storageQuota}
                fileCount={storageStats.fileCount}
              />
            </div>
          )}

          {loading && files.length === 0 ? (
            <div className={styles.loading}>
              <RefreshCw className={styles.spinner} size={32} />
              <p>Loading files...</p>
            </div>
          ) : filteredFiles.length === 0 ? (
            <Card variant="glass" className={styles.emptyState}>
              <CardContent>
                <FileText size={48} className={styles.emptyIcon} />
                <h3>No files yet</h3>
                <p>Upload your first file to get started</p>
              </CardContent>
            </Card>
          ) : (
            <div className={styles.grid}>
              {filteredFiles.map((file, index) => (
                <Card
                  key={file.fileId}
                  variant="glass"
                  hover
                  className={`${styles.fileCard} animate-slide-up stagger-${Math.min(index + 1, 5)}`}
                >
                  <CardHeader>
                    <CardTitle>{file.fileName}</CardTitle>
                    <CardDescription>
                      {formatFileSize(file.fileSize)} • {formatDate(file.createdAt)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={styles.fileActions}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(file.fileId, file.fileName)}
                        leftIcon={<Download size={14} />}
                      >
                        Download
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(file.fileId, file.fileName)}
                        leftIcon={<Trash2 size={14} />}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
