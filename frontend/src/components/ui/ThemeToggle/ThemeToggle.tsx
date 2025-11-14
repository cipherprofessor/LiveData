import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { Button } from '../Button';
import styles from './ThemeToggle.module.scss';

export const ThemeToggle = () => {
  const { theme, setTheme, actualTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const getIcon = () => {
    if (theme === 'system') return <Monitor size={18} />;
    return actualTheme === 'dark' ? <Moon size={18} /> : <Sun size={18} />;
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={styles.toggle}
      aria-label="Toggle theme"
    >
      {getIcon()}
    </Button>
  );
};
