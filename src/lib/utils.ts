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
  MessageCircle,
  Award,
  BookOpen,
  Coffee,
  Database,
  Server,
  Monitor,
  Cloud,
  Zap,
  Shield,
  Terminal,
  Smartphone,
  Palette,
  GitBranch,
  Activity,
  CheckCircle,
  PlayCircle,
  PauseCircle,
  FileText,
  Code,
  Circle,
  Square,
  Triangle,
  Hexagon,
  Diamond,
  Rocket,
  Eye,
  LucideIcon
} from 'lucide-react';

// Icon mapping for dynamic icon resolution
const iconMap: { [key: string]: LucideIcon } = {
  Terminal, Coffee, Code, Hexagon, FileText, Palette, Circle, Triangle, Square, 
  Rocket, Diamond, Database, Cloud, Zap, Shield, Eye, GitBranch, Globe, Monitor, 
  Server, Smartphone, CheckCircle, PlayCircle, PauseCircle, Mail, Phone, MapPin, 
  Github, Linkedin, MessageCircle, User, Code2, Briefcase, GraduationCap, Award, BookOpen, Activity
};

// Helper function to get icon component from string
export const getIconComponent = (iconName: string): LucideIcon => {
  return iconMap[iconName] || Code;
};

// Sidebar navigation items
export const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'experience', label: 'Experience', icon: GraduationCap },
  { id: 'contact', label: 'Contact', icon: Mail }
];

// Recent activities for overview section
export const recentActivities = [
  { action: 'Completed', item: 'Portfolio API Integration', time: 'Just now', icon: Award },
  { action: 'Updated', item: 'Admin Dashboard with CRUD Operations', time: 'Just now', icon: Code2 },
  { action: 'Learning', item: 'Advanced React Patterns', time: 'This week', icon: BookOpen },
  { action: 'Planning', item: 'Full Stack Project Development', time: 'This month', icon: Globe }
];

// Skill categories for skills section
export const skillCategories = [
  { name: 'Programming Languages', icon: Code2, color: 'from-blue-500 to-cyan-500' },
  { name: 'Frontend', icon: Monitor, color: 'from-purple-500 to-pink-500' },
  { name: 'Backend', icon: Server, color: 'from-green-500 to-emerald-500' },
  { name: 'Database', icon: Database, color: 'from-orange-500 to-red-500' },
  { name: 'Hosting & Deployment', icon: Cloud, color: 'from-indigo-500 to-blue-500' },
  { name: 'Monitoring & Tools', icon: Activity, color: 'from-yellow-500 to-orange-500' }
];
