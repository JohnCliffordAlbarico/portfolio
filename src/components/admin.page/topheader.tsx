"use client";
import { Search, Menu, Bell, User, ChevronDown } from 'lucide-react';

interface TopHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  selectedTab: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ sidebarOpen, setSidebarOpen, selectedTab }) => {
  return (
    <header className="bg-slate-800/30 backdrop-blur-xl border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 mr-4"
          >
            <Menu size={20} />
          </button>
          <h2 className="text-2xl font-bold capitalize">{selectedTab}</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all"
            />
          </div>
          <button className="relative p-2 rounded-lg hover:bg-white/10">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;