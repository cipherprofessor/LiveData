import React, { useState } from 'react';
import { Mail, Lock, User, LogIn, UserPlus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { ThemeToggle } from '../../components/ui/ThemeToggle';
import { apiService, handleApiError } from '../../services/api.service';
import styles from './AuthPage.module.scss';

interface AuthPageProps {
  onLogin: () => void;
}

export const AuthPage = ({ onLogin }: AuthPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await apiService.login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        await apiService.register({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        });
        // Auto-login after registration
        await apiService.login({
          email: formData.email,
          password: formData.password,
        });
      }
      onLogin();
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.themeToggle}>
        <ThemeToggle />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
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
          <p className={styles.subtitle}>
            Secure, encrypted file storage and management
          </p>
        </div>

        <Card variant="glass" className={`${styles.card} animate-scale-in`}>
          <CardHeader>
            <CardTitle>{isLogin ? 'Welcome back' : 'Create account'}</CardTitle>
            <CardDescription>
              {isLogin
                ? 'Enter your credentials to access your files'
                : 'Sign up to start storing your files securely'}
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className={styles.form}>
                {!isLogin && (
                  <>
                    <Input
                      label="First Name"
                      type="text"
                      placeholder="John"
                      leftIcon={<User size={16} />}
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                    <Input
                      label="Last Name"
                      type="text"
                      placeholder="Doe"
                      leftIcon={<User size={16} />}
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </>
                )}

                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  leftIcon={<Mail size={16} />}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  required
                  leftIcon={<Lock size={16} />}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />

                {error && (
                  <div className={styles.error}>{error}</div>
                )}
              </div>
            </CardContent>

            <CardFooter>
              <div className={styles.footer}>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={loading}
                  leftIcon={isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
                  style={{ width: '100%' }}
                >
                  {isLogin ? 'Sign in' : 'Sign up'}
                </Button>

                <div className={styles.toggle}>
                  <span>
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setError('');
                    }}
                    className={styles.toggleButton}
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </div>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};
