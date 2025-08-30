"use client";
import { Lock, User, LogIn, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const session = localStorage.getItem('supabase.auth.token');
    if (session) {
      // Verify session with API
      fetch('/api/auth/verify', {
        headers: { Authorization: `Bearer ${session}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.isValid && data.role === 'admin') {
            router.push('/admin');
          }
        })
        .catch(() => localStorage.removeItem('supabase.auth.token'));
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Invalid credentials');
        setIsLoading(false);
        return;
      }

      if (data.role !== 'admin') {
        setError('Access denied: Admin role required');
        setIsLoading(false);
        return;
      }

      // Store session token
      if (data.session?.access_token) {
        if (rememberMe) {
          localStorage.setItem('supabase.auth.token', data.session.access_token);
        } else {
          sessionStorage.setItem('supabase.auth.token', data.session.access_token);
        }
      }

      // Successful login
      router.push('/admin');
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AdminPro
            </span>
          </h1>
          <p className="text-gray-400 mt-2">Sign in to access the admin dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                id="username"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all text-white"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all text-white"
                required
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
              Remember me
            </label>
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <LogIn size={16} />
            )}
            Sign In
          </button>
        </form>

        <div className="text-center mt-6">
          <a href="#" className="text-sm text-gray-400 hover:text-purple-300 transition-colors">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;