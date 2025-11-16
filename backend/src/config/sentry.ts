/**
 * Sentry Configuration for Error Tracking
 * Production monitoring as per SkillSwap Enhancement Roadmap
 */

import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';
import { Express } from 'express';

export function initializeSentry(app: Express): void {
  const SENTRY_DSN = process.env.SENTRY_DSN;
  const NODE_ENV = process.env.NODE_ENV || 'development';

  if (!SENTRY_DSN) {
    console.warn('⚠️  Sentry DSN not found. Error tracking is disabled.');
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: NODE_ENV,
    integrations: [
      // Enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // Enable Express.js middleware tracing
      new Sentry.Integrations.Express({ app }),
      // Enable Profiling (performance monitoring)
      new ProfilingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: NODE_ENV === 'production' ? 0.1 : 1.0, // 10% in prod, 100% in dev
    // Profiling
    profilesSampleRate: NODE_ENV === 'production' ? 0.1 : 1.0,
    // Release tracking
    release: process.env.SENTRY_RELEASE || 'skillswap@1.0.0',
    // Error filtering
    beforeSend(event, hint) {
      // Don't send errors in development unless explicitly enabled
      if (NODE_ENV === 'development' && !process.env.SENTRY_DEV_ENABLED) {
        return null;
      }

      // Filter out known non-critical errors
      if (event.exception) {
        const error = hint.originalException as Error;
        if (error?.message?.includes('ECONNRESET')) {
          return null; // Ignore connection reset errors
        }
      }

      return event;
    },
    // Additional context
    initialScope: {
      tags: {
        service: 'skillswap-backend',
      },
    },
  });

  console.log('✅ Sentry initialized successfully');
}

export function getSentryRequestHandler() {
  return Sentry.Handlers.requestHandler();
}

export function getSentryTracingHandler() {
  return Sentry.Handlers.tracingHandler();
}

export function getSentryErrorHandler() {
  return Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
      // Capture all 4xx and 5xx errors
      return true;
    },
  });
}

/**
 * Manually capture exceptions
 */
export function captureException(error: Error, context?: Record<string, any>): void {
  Sentry.captureException(error, {
    extra: context,
  });
}

/**
 * Manually capture messages
 */
export function captureMessage(message: string, level: Sentry.SeverityLevel = 'info'): void {
  Sentry.captureMessage(message, level);
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(message: string, data?: Record<string, any>): void {
  Sentry.addBreadcrumb({
    message,
    data,
    level: 'info',
  });
}

/**
 * Set user context
 */
export function setUser(user: { id: string; email: string; username?: string }): void {
  Sentry.setUser({
    id: user.id,
    email: user.email,
    username: user.username,
  });
}

/**
 * Clear user context
 */
export function clearUser(): void {
  Sentry.setUser(null);
}

export default {
  initializeSentry,
  getSentryRequestHandler,
  getSentryTracingHandler,
  getSentryErrorHandler,
  captureException,
  captureMessage,
  addBreadcrumb,
  setUser,
  clearUser,
};
