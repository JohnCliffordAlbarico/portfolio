import { LucideIcon, Code2, Sparkles } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  sidebarItems: { id: string; label: string; icon: LucideIcon }[];
}

export default function Sidebar({ activeSection, setActiveSection, sidebarItems }: SidebarProps) {
  return (
    <aside className="w-72 bg-gradient-to-b from-white via-gray-50 to-white shadow-xl border-r border-gray-200 min-h-screen sticky top-16">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <Code2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Portfolio</h2>
            <p className="text-xs text-gray-500">Navigation</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          <span>John Clifford M. Albarico</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6">
        <nav className="space-y-3">
          {sidebarItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`group w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all duration-300 transform hover:scale-[1.02] ${
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
                  {item.id === 'overview' && 'About & Stats'}
                  {item.id === 'skills' && 'Technologies & Tools'}
                  {item.id === 'projects' && 'My Work & Portfolio'}
                  {item.id === 'experience' && 'Education & Journey'}
                  {item.id === 'contact' && 'Get In Touch'}
                </div>
              </div>
              {activeSection === item.id && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <p className="text-xs text-gray-600 font-medium">Always Learning</p>
          <p className="text-xs text-gray-500">Building the future</p>
        </div>
      </div>
    </aside>
  );
}