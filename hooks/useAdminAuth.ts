// hooks/useAdminAuth.ts - Hook to check admin authentication
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAdminAuth() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/auth-check');
        setAuthenticated(res.ok);
        
        if (!res.ok) {
          router.push(`/admin/login?redirect=${encodeURIComponent(window.location.pathname)}`);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setAuthenticated(false);
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const logout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      setAuthenticated(false);
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return { authenticated, loading, logout };
}
