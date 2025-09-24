'use client'
import { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import Image from 'next/image';
// Using cliff.jpg from public directory
import Sidebar from '../../components/portfolio.page/Sidebar/page';
import PortfolioContent from '../../components/portfolio.page/PortfolioContent';
import ThemeToggle from '../../components/ThemeToggle';
import TimeDisplay from '../../components/TimeDisplay';
import { sidebarItems } from '../../lib/utils';


export default function Home() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg overflow-hidden">
                <Image 
                  src="/images/cliff.jpg" 
                  alt="Cliff Logo" 
                  width={40} 
                  height={40} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">John Clifford M. Albarico</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Aspiring Full Stack Developer</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">John Clifford</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Full Stack Dev</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <TimeDisplay />
              
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6 text-gray-900 dark:text-white" /> : <Menu className="w-6 h-6 text-gray-900 dark:text-white" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} sidebarItems={sidebarItems} />
        </div>
        
        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
            <div className="relative w-80 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-2xl transition-colors duration-300">
              {/* Mobile Sidebar Header */}
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg">
                      <Image 
                        src="/images/cliff.jpg" 
                        alt="Cliff Logo" 
                        width={40} 
                        height={40} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Portfolio</h2>
                      <p className="text-xs text-gray-500">Navigation</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/50 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  <span>John Clifford M. Albarico</span>
                </div>
              </div>
              
              {/* Mobile Navigation */}
              <div className="p-6">
                <nav className="space-y-3">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`group w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all duration-300 ${
                        activeSection === item.id
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                          : 'text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-gray-900 hover:shadow-md'
                      }`}
                    >
                      <div className={`p-2 rounded-lg transition-all duration-300 ${
                        activeSection === item.id
                          ? 'bg-white/20'
                          : 'bg-gray-100 group-hover:bg-blue-100'
                      }`}>
                        <item.icon className={`w-5 h-5 transition-colors duration-300 ${
                          activeSection === item.id
                            ? 'text-white'
                            : 'text-gray-600 group-hover:text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <span className={`font-semibold transition-colors duration-300 ${
                          activeSection === item.id
                            ? 'text-white'
                            : 'text-gray-700 group-hover:text-gray-900'
                        }`}>
                          {item.label}
                        </span>
                        <div className={`text-xs mt-1 transition-colors duration-300 ${
                          activeSection === item.id
                            ? 'text-white/80'
                            : 'text-gray-500 group-hover:text-gray-600'
                        }`}>
                          {item.id === 'overview' && "About & Stats"}
                          {item.id === 'skills' && "Technologies & Tools"}
                          {item.id === 'projects' && "My Work & Portfolio"}
                          {item.id === 'experience' && "Education & Journey"}
                          {item.id === 'contact' && "Get In Touch"}
                        </div>
                      </div>
                      {activeSection === item.id && (
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      )}
                    </button>
                  ))}
                </nav>
              </div>
              
              {/* Mobile Sidebar Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
                <div className="text-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-xs text-gray-600 font-medium">Always Learning</p>
                  <p className="text-xs text-gray-500">Building the future</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <main className="flex-1 max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
          <PortfolioContent activeSection={activeSection} />
        </main>
      </div>
    </div>
  );
}