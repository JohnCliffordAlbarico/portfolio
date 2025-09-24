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
import SkillsManager from '../../components/admin/SkillsManager';
import ProjectsManager from '../../components/admin/ProjectsManager';
import ExperienceManager from '../../components/admin/ExperienceManager';
import ContactManager from '../../components/admin/ContactManager';

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
            <div className="space-y-8">
              <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4">Portfolio Management Dashboard</h2>
                <p className="text-gray-300 mb-6">
                  Welcome to your portfolio admin panel. Use the navigation tabs to manage different sections of your portfolio.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-purple-600/20 rounded-lg p-4">
                    <h3 className="font-semibold text-purple-300">Skills</h3>
                    <p className="text-sm text-gray-400">Manage your technical skills and proficiency levels</p>
                  </div>
                  <div className="bg-blue-600/20 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-300">Projects</h3>
                    <p className="text-sm text-gray-400">Add and update your portfolio projects</p>
                  </div>
                  <div className="bg-green-600/20 rounded-lg p-4">
                    <h3 className="font-semibold text-green-300">Experience</h3>
                    <p className="text-sm text-gray-400">Update your work and education history</p>
                  </div>
                  <div className="bg-orange-600/20 rounded-lg p-4">
                    <h3 className="font-semibold text-orange-300">Contact</h3>
                    <p className="text-sm text-gray-400">Manage contact information and social links</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'skills' && (
            <SkillsManager />
          )}

          {selectedTab === 'projects' && (
            <ProjectsManager />
          )}

          {selectedTab === 'experience' && (
            <ExperienceManager />
          )}

          {selectedTab === 'contact' && (
            <ContactManager />
          )}

          {!['dashboard', 'skills', 'projects', 'experience', 'contact'].includes(selectedTab) && (
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