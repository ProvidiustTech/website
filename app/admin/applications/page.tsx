'use client'
import { useEffect, useState } from 'react'
import { ArrowLeft, Trash2, Download, LogOut } from 'lucide-react'
import Link from 'next/link'

interface Application {
  id: string
  company: string
  industry: string
  channel: string
  volume: string
  challenge: string
  submittedAt: string
}

const AUTO_LOGOUT_MINUTES = 30; // Auto logout after 30 minutes of inactivity

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null)
  const [lastActivityTime, setLastActivityTime] = useState<number>(Date.now())

  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin-authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchApplications();
      setupInactivityTimer();
    } else {
      setLoading(false);
    }

    // Cleanup timer on unmount
    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
    };
  }, [])

  // Track user activity
  useEffect(() => {
    if (!isAuthenticated) return;

    const handleActivity = () => {
      setLastActivityTime(Date.now());
      // Reset inactivity timer on activity
      if (inactivityTimer) clearTimeout(inactivityTimer);
      setupInactivityTimer();
    };

    // Listen to user interactions
    window.addEventListener('mousedown', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('touchstart', handleActivity);
    window.addEventListener('click', handleActivity);

    return () => {
      window.removeEventListener('mousedown', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, [isAuthenticated, inactivityTimer])

  const setupInactivityTimer = () => {
    const timer = setTimeout(() => {
      handleLogout(true); // true = auto logout
    }, AUTO_LOGOUT_MINUTES * 60 * 1000);
    setInactivityTimer(timer);
  };

  const handleLogout = (isAutoLogout = false) => {
    sessionStorage.removeItem('admin-authenticated');
    setIsAuthenticated(false);
    setPasswordInput('');
    setApplications([]);
    
    if (inactivityTimer) clearTimeout(inactivityTimer);
    
    if (isAutoLogout) {
      alert(`Session expired due to inactivity. Please log in again.`);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      sessionStorage.setItem('admin-authenticated', 'true');
      setIsAuthenticated(true);
      setLastActivityTime(Date.now());
      setupInactivityTimer();
      fetchApplications();
    } else {
      alert('Invalid password');
      setPasswordInput('');
    }
  };

  async function fetchApplications() {
    try {
      const response = await fetch('/api/applications');
      const data = await response.json();
      setApplications(data.submissions || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteApplication(id: string) {
    if (!confirm('Are you sure you want to delete this application?')) return;
    // You'll need to add a DELETE method to the API
    alert('Delete functionality coming soon');
  }

  function exportAsCSV() {
    if (applications.length === 0) {
      alert('No applications to export');
      return;
    }

    const headers = ['Company', 'Industry', 'Channel', 'Volume', 'Challenge', 'Submitted'];
    const rows = applications.map(app => [
      app.company,
      app.industry,
      app.channel,
      app.volume,
      app.challenge.replace(/"/g, '""'),
      new Date(app.submittedAt).toLocaleString(),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `applications-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center p-4">
        <div className="bg-[#111118] border border-[#2a2a3a] rounded-2xl w-full max-w-[400px] p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-6">Admin Login</h1>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">
                Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-[#1a1a2a] border border-[#2a2a3a] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#2DD4BF] transition-colors"
                placeholder="Enter admin password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#14B8A6] hover:bg-[#26b8a6] text-white font-bold rounded-xl text-sm transition-colors"
            >
              Login
            </button>
          </form>
          <p className="text-xs text-gray-500 text-center mt-4">
            Default password: admin123
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a14] p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-500 hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-3xl font-bold text-white">Applications</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => exportAsCSV()}
              className="flex items-center gap-2 px-4 py-2 bg-[#14B8A6] hover:bg-[#26b8a6] text-white font-bold rounded-xl text-sm transition-colors"
            >
              <Download size={16} />
              Export CSV
            </button>
            <button
              onClick={() => handleLogout()}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 font-bold rounded-xl text-sm transition-colors border border-red-600/30 hover:border-red-600/50"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* Inactivity Warning */}
        <div className="mb-6 p-4 bg-amber-950/30 border border-amber-700/50 rounded-xl text-amber-300 text-sm flex items-start gap-3">
          <div className="mt-0.5">⏱️</div>
          <div>
            <p className="font-semibold">Auto-logout in {AUTO_LOGOUT_MINUTES} minutes</p>
            <p className="text-xs opacity-75 mt-1">You will be automatically logged out due to inactivity. Activity on this page resets the timer.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#111118] border border-[#2a2a3a] rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">Total Applications</p>
            <p className="text-2xl font-bold text-white">{applications.length}</p>
          </div>
          <div className="bg-[#111118] border border-[#2a2a3a] rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">This Week</p>
            <p className="text-2xl font-bold text-white">
              {applications.filter(a => {
                const submittedDate = new Date(a.submittedAt);
                const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                return submittedDate > weekAgo;
              }).length}
            </p>
          </div>
          <div className="bg-[#111118] border border-[#2a2a3a] rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">Top Industry</p>
            <p className="text-2xl font-bold text-white">
              {applications.length > 0
                ? Object.entries(
                    applications.reduce((acc: Record<string, number>, app) => {
                      acc[app.industry] = (acc[app.industry] || 0) + 1;
                      return acc;
                    }, {})
                  ).sort((a, b) => b[1] - a[1])[0]?.[0] || '-'
                : '-'}
            </p>
          </div>
          <div className="bg-[#111118] border border-[#2a2a3a] rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">Last Submission</p>
            <p className="text-sm font-bold text-white">
              {applications.length > 0
                ? new Date(applications[applications.length - 1].submittedAt).toLocaleDateString()
                : '-'}
            </p>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-[#111118] border border-[#2a2a3a] rounded-2xl overflow-hidden">
          {applications.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              No applications yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2a2a3a]">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">Company</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">Industry</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">Channel</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">Volume</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">Challenge</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">Submitted</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, idx) => (
                    <tr
                      key={app.id}
                      className={`border-b border-[#2a2a3a] hover:bg-[#1a1a2a] transition-colors ${
                        idx === applications.length - 1 ? 'border-b-0' : ''
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-white font-medium">{app.company}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{app.industry || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{app.channel || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{app.volume || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-400 max-w-xs truncate">{app.challenge || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(app.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => deleteApplication(app.id)}
                          className="text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
