import React from 'react';
import { Toast } from './Toast';
import { useToast } from './ToastContext';
import styles from './ToastContainer.module.scss';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          onClose={removeToast}
        />
      ))}
    </div>
  );
};
