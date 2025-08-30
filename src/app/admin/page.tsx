"use client";
import { 
  BarChart3, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Activity,
  Package,
  FileText,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Plus,
  LogOut,
  Loader2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavigationBar from '../../components/admin.page/navigationbar';
import TopHeader from '../../components/admin.page/topheader';

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check session on mount
  useEffect(() => {
    const session = localStorage.getItem('supabase.auth.token') || sessionStorage.getItem('supabase.auth.token');
    if (!session) {
      router.push('/authlogin');
      return;
    }

    fetch('/api/auth/verify', {
      headers: { Authorization: `Bearer ${session}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.isValid || data.role !== 'admin') {
          localStorage.removeItem('supabase.auth.token');
          sessionStorage.removeItem('supabase.auth.token');
          router.push('/authlogin');
        } else {
          setIsLoading(false);
        }
      })
      .catch(() => {
        localStorage.removeItem('supabase.auth.token');
        sessionStorage.removeItem('supabase.auth.token');
        router.push('/authlogin');
      });
  }, [router]);

  const handleLogout = async () => {
    localStorage.removeItem('supabase.auth.token');
    sessionStorage.removeItem('supabase.auth.token');
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
    } catch (err) {
      console.error('Logout error:', err);
    }
    router.push('/authlogin');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-purple-400 mx-auto mb-4" />
          <p className="text-gray-400">Verifying session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Sidebar */}
      <NavigationBar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        selectedTab={selectedTab} 
        setSelectedTab={setSelectedTab} 
      />

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <TopHeader 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          selectedTab={selectedTab} 
        />

        {/* Dashboard Content */}
        <main className="p-6">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-colors duration-300"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>

          {selectedTab === 'dashboard' && (
            <>
              {/* Manage Portfolio Section */}
              <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Manage Portfolio</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                    <Plus size={16} />
                    Add Asset
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-4 font-medium text-gray-300">Asset ID</th>
                        <th className="text-left p-4 font-medium text-gray-300">Name</th>
                        <th className="text-left p-4 font-medium text-gray-300">Value</th>
                        <th className="text-left p-4 font-medium text-gray-300">Status</th>
                        <th className="text-left p-4 font-medium text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4 font-mono text-sm">Coming Soon</td>
                        <td className="p-4">Placeholder Asset</td>
                        <td className="p-4 font-semibold">$0.00</td>
                        <td className="p-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium text-gray-400 bg-gray-400/10">
                            Pending
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <button className="p-1 hover:bg-white/10 rounded transition-colors">
                              <Eye size={16} />
                            </button>
                            <button className="p-1 hover:bg-white/10 rounded transition-colors">
                              <Edit size={16} />
                            </button>
                            <button className="p-1 hover:bg-red-500/20 text-red-400 rounded transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {selectedTab !== 'dashboard' && (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Package size={32} className="text-purple-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4 capitalize">{selectedTab} Section</h3>
                <p className="text-gray-400">
                  This section is under development. The {selectedTab} functionality will be implemented here.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Admin;