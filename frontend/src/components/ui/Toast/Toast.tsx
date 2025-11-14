import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import styles from './Toast.module.scss';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

export const Toast = ({ id, type, message, duration = 5000, onClose }: ToastProps) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <AlertCircle size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      case 'info':
      default:
        return <Info size={20} />;
    }
  };

  return (
    <div className={`${styles.toast} ${styles[type]} animate-slide-in-right`}>
      <div className={styles.icon}>{getIcon()}</div>
      <div className={styles.message}>{message}</div>
      <button
        className={styles.closeButton}
        onClick={() => onClose(id)}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
};
