import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingFallback from './components/LoadingFallback';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const MatchesPage = lazy(() => import('./pages/MatchesPage'));
const SwapsPage = lazy(() => import('./pages/SwapsPage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const ConnectionsPage = lazy(() => import('./pages/Connections'));
const GamificationPage = lazy(() => import('./pages/GamificationDashboard'));
const EventDetailsPage = lazy(() => import('./pages/EventDetails'));
const PricingPage = lazy(() => import('./pages/Pricing'));
const SubscriptionPage = lazy(() => import('./pages/SubscriptionDashboard'));
const NotificationPrefsPage = lazy(() => import('./pages/NotificationPreferences'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboard'));
const AdminUsersPage = lazy(() => import('./pages/AdminUsers'));
const AdminModerationPage = lazy(() => import('./pages/AdminModeration'));

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Suspense fallback={<LoadingFallback fullScreen />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/matches"
          element={
            <ProtectedRoute>
              <MatchesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/swaps"
          element={
            <ProtectedRoute>
              <SwapsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/skills"
          element={
            <ProtectedRoute>
              <SkillsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/connections"
          element={
            <ProtectedRoute>
              <ConnectionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gamification"
          element={
            <ProtectedRoute>
              <GamificationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/:eventId"
          element={
            <ProtectedRoute>
              <EventDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pricing"
          element={<PricingPage />}
        />
        <Route
          path="/subscription"
          element={
            <ProtectedRoute>
              <SubscriptionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/notifications"
          element={
            <ProtectedRoute>
              <NotificationPrefsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <AdminUsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/moderation"
          element={
            <ProtectedRoute>
              <AdminModerationPage />
            </ProtectedRoute>
          }
        />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
