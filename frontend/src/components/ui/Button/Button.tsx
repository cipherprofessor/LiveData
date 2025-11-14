/**
 * Button Component - Single Responsibility Principle
 * Handles button rendering with variants, sizes, and states
 */

import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../../lib/utils';
import styles from './Button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Modern glass morphism button with animations
 * Follows NeoDesk design system
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          styles.button,
          styles[variant],
          styles[size],
          isLoading && styles.loading,
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        <div className={styles.backgroundGlow}></div>

        <div className={styles.content}>
          {isLoading && (
            <Loader2 size={16} className={styles.loadingIcon} />
          )}
          {!isLoading && leftIcon && (
            <span className={styles.icon}>{leftIcon}</span>
          )}
          <span className={styles.text}>{children}</span>
          {!isLoading && rightIcon && (
            <span className={styles.icon}>{rightIcon}</span>
          )}
        </div>

        <div className={styles.hoverGlow}></div>
      </button>
    );
  }
);

Button.displayName = 'Button';
