'use client'
import { useState, useEffect } from 'react';
import { 
  User, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Globe,
  Calendar,
  Star,
  ExternalLink,
  Download,
  MessageCircle,
  TrendingUp,
  Award,
  BookOpen,
  Coffee,
  Clock,
  Database,
  Server,
  Monitor,
  Cloud,
  Zap,
  Shield,
  Terminal,
  Layers,
  Cpu,
  Smartphone,
  Palette,
  GitBranch,
  Activity,
  CheckCircle,
  PlayCircle,
  PauseCircle,
  Menu,
  X,
  Sparkles,
  FileText,
  Code,
  Circle,
  Square,
  Triangle,
  Hexagon,
  Diamond,
  Heart,
  Flame,
  Rocket,
  Wrench,
  Settings,
  Eye,
  Lock
} from 'lucide-react';
import Sidebar from '../../components/portfolio.page/Sidebar/page';
import StatCard from '../../components/portfolio.page/Statcard/page';
import SkillBar from '../../components/portfolio.page/SkillBar/page';
import ProjectCard from '../../components/portfolio.page/ProjectCard/page';
import ThemeToggle from '../../components/ThemeToggle';
import TimeDisplay from '../../components/TimeDisplay';


export default function Home() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const skillsData = [
    // Programming Languages
    { name: 'C Language', level: 85, category: 'Programming Languages', icon: Terminal },
    { name: 'Java', level: 80, category: 'Programming Languages', icon: Coffee },
    { name: 'JavaScript', level: 90, category: 'Programming Languages', icon: Code },
    { name: 'Python', level: 75, category: 'Programming Languages', icon: Hexagon },
    { name: 'HTML', level: 95, category: 'Programming Languages', icon: FileText },
    { name: 'CSS', level: 90, category: 'Programming Languages', icon: Palette },
    
    // Frontend Technologies
    { name: 'React.js', level: 85, category: 'Frontend', icon: Circle },
    { name: 'Next.js', level: 80, category: 'Frontend', icon: Triangle },
    
    // Backend Technologies
    { name: 'Node.js', level: 75, category: 'Backend', icon: Square },
    { name: 'Express.js', level: 70, category: 'Backend', icon: Rocket },
    { name: 'GraphQL', level: 65, category: 'Backend', icon: Diamond },
    
    // Database
    { name: 'Supabase (PostgreSQL)', level: 80, category: 'Database', icon: Database },
    
    // Hosting & Deployment
    { name: 'Render.com', level: 85, category: 'Hosting & Deployment', icon: Cloud },
    { name: 'Vercel', level: 80, category: 'Hosting & Deployment', icon: Zap },
    
    // Monitoring & Tools
    { name: 'Cloudflare', level: 70, category: 'Monitoring & Tools', icon: Shield },
    { name: 'Uptimerobot', level: 75, category: 'Monitoring & Tools', icon: Eye },
    { name: 'Git', level: 85, category: 'Monitoring & Tools', icon: GitBranch }
  ];

  const projects = [
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'Modern, responsive portfolio built with Next.js and Supabase',
      tech: ['Next.js', 'Supabase', 'Tailwind CSS', 'Vercel'],
      status: 'Completed',
      progress: 100,
      github: '#',
      live: '#',
      icon: Globe,
      statusIcon: CheckCircle
    },
    {
      id: 2,
      title: 'Full Stack Web Application',
      description: 'Coming soon - A comprehensive web application showcasing full-stack development skills',
      tech: ['React.js', 'Node.js', 'Express', 'Supabase'],
      status: 'In Development',
      progress: 60,
      github: '#',
      live: '#',
      icon: Monitor,
      statusIcon: PlayCircle
    },
    {
      id: 3,
      title: 'API Integration Project',
      description: 'Coming soon - A project demonstrating API integration and backend development',
      tech: ['JavaScript', 'GraphQL', 'PostgreSQL', 'Render.com'],
      status: 'Planned',
      progress: 0,
      github: '#',
      live: '#',
      icon: Server,
      statusIcon: PauseCircle
    },
    {
      id: 4,
      title: 'Mobile-Responsive Dashboard',
      description: 'Coming soon - A responsive dashboard with real-time monitoring capabilities',
      tech: ['React.js', 'Cloudflare', 'Uptimerobot', 'Vercel'],
      status: 'Planned',
      progress: 0,
      github: '#',
      live: '#',
      icon: Smartphone,
      statusIcon: PauseCircle
    }
  ];

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'experience', label: 'Experience', icon: GraduationCap },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <StatCard title="Projects" value="4+" icon={Briefcase} trend="25" />
              <StatCard title="Technologies" value="15+" icon={Code2} trend="15" />
              <StatCard title="Languages" value="6+" icon={Terminal} trend="12" />
              <StatCard title="Coffee Cups" value="∞" icon={Coffee} />
            </div>

            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                <div className="flex-shrink-0 flex justify-center lg:justify-start">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 md:w-16 md:h-16 text-white" />
                  </div>
                </div>
                <div className="flex-grow text-center lg:text-left">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">John Clifford M. Albarico</h1>
                  <p className="text-lg md:text-xl text-blue-600 mb-4">Aspiring Full Stack Developer</p>
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
                    Passionate about creating innovative web solutions that bridge the gap between 
                    beautiful design and robust functionality. Started my journey with C language and 
                    adapted to modern technologies including Java, JavaScript, and Python. Currently 
                    specializing in React.js, Next.js, and Supabase while expanding my expertise in 
                    full-stack development and cloud hosting solutions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <div className="flex items-center gap-2 text-gray-600 justify-center lg:justify-start">
                      <MapPin className="w-4 h-4" />
                      <span>Philippines</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 justify-center lg:justify-start">
                      <Calendar className="w-4 h-4" />
                      <span>Available for opportunities</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: 'Completed', item: 'Portfolio Website Modernization', time: 'Just now', icon: Award },
                  { action: 'Updated', item: 'Skills & Technologies Section', time: 'Just now', icon: Code2 },
                  { action: 'Learning', item: 'Advanced React Patterns', time: 'This week', icon: BookOpen },
                  { action: 'Planning', item: 'Full Stack Project Development', time: 'This month', icon: Globe }
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <activity.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.action}</span> {activity.item}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-6">
            {/* Skills Header */}
            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Code2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Technical Skills</h3>
                  <p className="text-sm text-gray-600">My expertise and proficiency levels</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span>Continuously learning and expanding my skill set</span>
              </div>
            </div>

            {/* Enhanced Skills Grid */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {skillsData.slice(0, 4).map((skill, idx) => (
                    <div key={idx} className="group">
                      <SkillBar skill={skill} />
                    </div>
                  ))}
                </div>
                <div className="space-y-6">
                  {skillsData.slice(4).map((skill, idx) => (
                    <div key={idx} className="group">
                      <SkillBar skill={skill} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Programming Languages', icon: Code2, color: 'from-blue-500 to-cyan-500' },
                { name: 'Frontend', icon: Monitor, color: 'from-purple-500 to-pink-500' },
                { name: 'Backend', icon: Server, color: 'from-green-500 to-emerald-500' },
                { name: 'Database', icon: Database, color: 'from-orange-500 to-red-500' },
                { name: 'Hosting & Deployment', icon: Cloud, color: 'from-indigo-500 to-blue-500' },
                { name: 'Monitoring & Tools', icon: Activity, color: 'from-yellow-500 to-orange-500' }
              ].map((category, idx) => (
                <div key={idx} className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 bg-gradient-to-br ${category.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                        {category.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {skillsData.filter(skill => skill.category === category.name).length} skills
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {skillsData
                      .filter(skill => skill.category === category.name)
                      .map((skill, skillIdx) => (
                        <div key={skillIdx} className="group/skill flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300 border border-transparent hover:border-blue-100">
                          <div className="p-2 bg-white rounded-lg shadow-sm group-hover/skill:shadow-md group-hover/skill:scale-105 transition-all duration-300">
                            <skill.icon className="w-4 h-4 text-gray-600 group-hover/skill:text-blue-600 transition-colors duration-300" />
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-700 group-hover/skill:text-gray-900 transition-colors duration-300">
                              {skill.name}
                            </span>
                            <div className="text-xs text-gray-500 group-hover/skill:text-gray-600 transition-colors duration-300">
                              {skill.level >= 90 && 'Expert'}
                              {skill.level >= 75 && skill.level < 90 && 'Advanced'}
                              {skill.level >= 50 && skill.level < 75 && 'Intermediate'}
                              {skill.level >= 25 && skill.level < 50 && 'Beginner'}
                              {skill.level < 25 && 'Learning'}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2 overflow-hidden">
                              <div 
                                className={`h-2 rounded-full bg-gradient-to-r ${category.color} transition-all duration-1000`}
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-bold text-gray-600 w-8 text-right">
                              {skill.level}%
                            </span>
                          </div>
                        </div>
                      ))}
                    {skillsData.filter(skill => skill.category === category.name).length === 0 && (
                      <div className="text-center py-6">
                        <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                          <Sparkles className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-400 font-medium">Coming soon...</p>
                        <p className="text-xs text-gray-300">More skills to be added</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Education & Experience</h3>
              <div className="space-y-6">
                {[
                  {
                    title: 'Self-Taught Full Stack Development',
                    organization: 'Independent Learning',
                    period: '2023 - Present',
                    description: 'Self-directed learning journey starting with C language, progressing to modern web technologies including React.js, Next.js, Node.js, and Supabase. Specialized in hosting solutions on Render.com and Vercel.',
                    type: 'education'
                  },
                  {
                    title: 'Programming Language Mastery',
                    organization: 'Personal Projects',
                    period: '2023 - Present',
                    description: 'Developed proficiency in multiple programming languages: C (foundation), Java, JavaScript, Python, HTML, and CSS. Built various projects to demonstrate practical application of these skills.',
                    type: 'experience'
                  },
                  {
                    title: 'Cloud & DevOps Skills',
                    organization: 'Hands-on Experience',
                    period: '2024 - Present',
                    description: 'Gained expertise in cloud hosting platforms (Render.com, Vercel), monitoring tools (Cloudflare, Uptimerobot), and database management with Supabase PostgreSQL.',
                    type: 'experience'
                  },
                  {
                    title: 'Future Learning Goals',
                    organization: 'Continuous Growth',
                    period: 'Ongoing',
                    description: 'Planning to expand knowledge in advanced React patterns, microservices architecture, and additional cloud platforms to enhance full-stack development capabilities.',
                    type: 'education'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="border-l-4 border-blue-600 pl-6 pb-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        {item.type === 'education' ? 
                          <GraduationCap className="w-5 h-5 text-blue-600" /> :
                          <Briefcase className="w-5 h-5 text-blue-600" />
                        }
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-blue-600 font-medium">{item.organization}</p>
                        <p className="text-sm text-gray-500 mb-2">{item.period}</p>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Get In Touch</h3>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: 'Email', value: 'johnclifford.albarico@email.com', href: 'mailto:johnclifford.albarico@email.com' },
                    { icon: Phone, label: 'Phone', value: 'Available upon request', href: '#' },
                    { icon: MapPin, label: 'Location', value: 'Philippines', href: '#' },
                    { icon: Globe, label: 'Portfolio', value: 'johnclifford.dev', href: '#' }
                  ].map((contact, idx) => (
                    <a key={idx} href={contact.href} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group">
                      <div className="bg-white p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                        <contact.icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{contact.label}</p>
                        <p className="text-sm text-gray-600">{contact.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Social Links</h3>
                <div className="space-y-4">
                  {[
                    { icon: Github, label: 'GitHub', value: '@johnclifford', href: '#' },
                    { icon: Linkedin, label: 'LinkedIn', value: '/in/johnclifford-albarico', href: '#' },
                    { icon: MessageCircle, label: 'Discord', value: 'johnclifford#1234', href: '#' }
                  ].map((social, idx) => (
                    <a key={idx} href={social.href} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group">
                      <div className="bg-white p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                        <social.icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{social.label}</p>
                        <p className="text-sm text-gray-600">{social.value}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 ml-auto group-hover:text-blue-600" />
                    </a>
                  ))}
                </div>
                
                <div className="mt-6">
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Resume
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
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
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Code2 className="w-6 h-6 text-white" />
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
          {renderContent()}
        </main>
      </div>
    </div>
  );
}