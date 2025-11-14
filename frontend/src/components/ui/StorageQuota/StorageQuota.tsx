import React from 'react';
import { HardDrive, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../Card';
import styles from './StorageQuota.module.scss';

export interface StorageQuotaProps {
  used: number;      // bytes
  total: number;     // bytes
  fileCount: number;
}

export const StorageQuota = ({ used, total, fileCount }: StorageQuotaProps) => {
  const percentage = Math.min((used / total) * 100, 100);
  const isWarning = percentage >= 80;
  const isCritical = percentage >= 95;

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const getStatusColor = () => {
    if (isCritical) return 'var(--destructive)';
    if (isWarning) return 'var(--warning)';
    return 'var(--primary)';
  };

  const getStatusText = () => {
    if (isCritical) return 'Storage almost full!';
    if (isWarning) return 'Storage getting full';
    return 'Storage healthy';
  };

  return (
    <Card variant="glass" className={styles.container}>
      <CardHeader>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <HardDrive size={20} />
          </div>
          <div>
            <CardTitle>Storage Usage</CardTitle>
            <CardDescription>
              {formatBytes(used)} of {formatBytes(total)} used
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className={styles.progressWrapper}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${percentage}%`,
                background: `hsl(${getStatusColor()})`,
              }}
            />
          </div>
          <div className={styles.progressLabel}>
            {percentage.toFixed(1)}% used
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <TrendingUp size={16} className={styles.statIcon} />
            <div>
              <div className={styles.statValue}>{fileCount}</div>
              <div className={styles.statLabel}>Total Files</div>
            </div>
          </div>

          <div className={styles.stat}>
            <HardDrive size={16} className={styles.statIcon} />
            <div>
              <div className={styles.statValue}>{formatBytes(total - used)}</div>
              <div className={styles.statLabel}>Available</div>
            </div>
          </div>
        </div>

        {(isWarning || isCritical) && (
          <div className={`${styles.warning} ${isCritical ? styles.critical : ''}`}>
            <AlertCircle size={16} />
            <span>{getStatusText()}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
