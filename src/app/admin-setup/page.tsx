"use client";
import { useState, useEffect } from 'react';
import { Shield, User, Lock, Key, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const AdminSetup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    adminSecret: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [hasAdmin, setHasAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if admin already exists
    fetch('/api/auth/register-admin')
      .then(res => res.json())
      .then(data => {
        setHasAdmin(data.hasAdmin);
        if (data.hasAdmin) {
          setMessage('Admin account already exists. You can login at /authlogin');
        }
      })
      .catch(() => setHasAdmin(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setStatus('error');
      setMessage('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setStatus('error');
      setMessage('Password must be at least 8 characters long');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/auth/register-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          adminSecret: formData.adminSecret
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Admin account created successfully! You can now login at /authlogin');
        setHasAdmin(true);
        // Clear form
        setFormData({ email: '', password: '', confirmPassword: '', adminSecret: '' });
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to create admin account');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  if (hasAdmin === null) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-purple-400 mx-auto mb-4" size={32} />
          <p className="text-gray-400">Checking admin status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="text-purple-400" size={32} />
          </div>
          <h1 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Admin Setup
            </span>
          </h1>
          <p className="text-gray-400 mt-2">Create your admin account</p>
        </div>

        {hasAdmin ? (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="text-green-400" size={32} />
            </div>
            <h2 className="text-xl font-semibold text-green-400">Admin Account Exists</h2>
            <p className="text-gray-300">An admin account is already configured.</p>
            <a 
              href="/authlogin"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              Go to Login
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your admin email"
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter password (min 8 characters)"
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all text-white"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Admin Secret Key
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="password"
                  value={formData.adminSecret}
                  onChange={(e) => setFormData({ ...formData, adminSecret: e.target.value })}
                  placeholder="Enter admin secret key"
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all text-white"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Contact the developer for the admin secret key
              </p>
            </div>

            {message && (
              <div className={`flex items-center gap-2 p-3 rounded-lg ${
                status === 'success' ? 'bg-green-600/20 text-green-400' :
                status === 'error' ? 'bg-red-600/20 text-red-400' :
                'bg-blue-600/20 text-blue-400'
              }`}>
                {status === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                <span className="text-sm">{message}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 ${
                status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {status === 'loading' ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Shield size={16} />
              )}
              Create Admin Account
            </button>
          </form>
        )}

        <div className="text-center mt-6">
          <a href="/authlogin" className="text-sm text-gray-400 hover:text-purple-300 transition-colors">
            Already have an admin account? Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;
