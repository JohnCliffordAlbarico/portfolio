"use client";
import { 
  Home, 
  Users, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  FileText, 
  Calendar, 
  Settings,
  Code2,
  Briefcase,
  GraduationCap,
  Mail
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface NavigationBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ sidebarOpen, setSidebarOpen, selectedTab, setSelectedTab }) => {
  const sidebarItems: SidebarItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'experience', label: 'Experience', icon: GraduationCap },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800/50 backdrop-blur-xl border-r border-white/10 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
      <div className="flex items-center justify-center h-16 border-b border-white/10">
        <h1 className="text-xl font-bold">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AdminPro
          </span>
        </h1>
      </div>
      
      <nav className="mt-8 px-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setSelectedTab(item.id);
                setSidebarOpen(false); // Close sidebar on mobile after selection
              }}
              className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200 ${
                selectedTab === item.id 
                  ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30 text-purple-300' 
                  : 'hover:bg-white/5 text-gray-300 hover:text-white'
              }`}
            >
              <Icon size={20} className="mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default NavigationBar;