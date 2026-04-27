// hooks/useAdminAuth.ts - Hook to check admin authentication with 10min inactivity logout
import { useEffect, useState, useRef } from 'react';

const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes

export function useAdminAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const performLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
    } catch (err) {
      console.error('Logout failed:', err);
    }
    setAuthenticated(false);
    window.location.href = '/admin/login';
  };

  const resetInactivityTimer = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      console.warn('Session expired due to inactivity');
      performLogout();
    }, INACTIVITY_TIMEOUT);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/auth-check', { credentials: 'include' });
        if (!res.ok) throw new Error('Not authenticated');
        setAuthenticated(true);
        resetInactivityTimer();
      } catch (err) {
        console.error('Auth check failed:', err);
        window.location.href = `/admin/login?redirect=${encodeURIComponent(window.location.pathname)}`;
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Track user activity
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    const handleActivity = () => resetInactivityTimer();
    events.forEach((e) => window.addEventListener(e, handleActivity));

    return () => {
      events.forEach((e) => window.removeEventListener(e, handleActivity));
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

  return { authenticated, loading, logout: performLogout };
}
