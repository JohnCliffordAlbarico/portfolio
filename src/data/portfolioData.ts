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
  Eye
} from 'lucide-react';
import { skillsAPI, projectsAPI, experienceAPI, contactAPI } from '@/lib/api';

// Type definitions
interface ApiSkill {
  id: number;
  name: string;
  level: number;
  category: string;
  icon: string;
}

interface ApiProject {
  id: number;
  title: string;
  description: string;
  tech: string[];
  status: string;
  progress: number;
  github: string;
  live: string;
  icon: string;
  statusIcon: string;
}

interface ApiContactItem {
  id: number;
  icon: string;
  label: string;
  value: string;
  href: string;
  type: 'contact' | 'social';
}

// Icon mapping for dynamic icon resolution
const iconMap: { [key: string]: React.ComponentType<{ className?: string; size?: number }> } = {
  Terminal, Coffee, Code, Hexagon, FileText, Palette, Circle, Triangle, Square, 
  Rocket, Diamond, Database, Cloud, Zap, Shield, Eye, GitBranch, Globe, Monitor, 
  Server, Smartphone, CheckCircle, PlayCircle, PauseCircle, Mail, Phone, MapPin, 
  Github, Linkedin, MessageCircle
};

// Helper function to get icon component from string
export const getIconComponent = (iconName: string) => {
  return iconMap[iconName] || Code;
};

// Static fallback data
const fallbackSkillsData = [
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

// Dynamic skills data fetcher
export const getSkillsData = async () => {
  try {
    const response = await skillsAPI.getAll();
    return response.skills.map((skill: ApiSkill) => ({
      ...skill,
      icon: getIconComponent(skill.icon)
    }));
  } catch (error) {
    console.warn('Failed to fetch skills from API, using fallback data:', error);
    return fallbackSkillsData;
  }
};

// Export static data for immediate use (will be replaced by dynamic data)
export const skillsData = fallbackSkillsData;

// Static fallback data
const fallbackProjects = [
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

// Dynamic projects data fetcher
export const getProjectsData = async () => {
  try {
    const response = await projectsAPI.getAll();
    return response.projects.map((project: ApiProject) => ({
      ...project,
      icon: getIconComponent(project.icon),
      statusIcon: getIconComponent(project.statusIcon)
    }));
  } catch (error) {
    console.warn('Failed to fetch projects from API, using fallback data:', error);
    return fallbackProjects;
  }
};

// Export static data for immediate use (will be replaced by dynamic data)
export const projects = fallbackProjects;

export const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'experience', label: 'Experience', icon: GraduationCap },
  { id: 'contact', label: 'Contact', icon: Mail }
];

export const recentActivities = [
  { action: 'Completed', item: 'Portfolio API Integration', time: 'Just now', icon: Award },
  { action: 'Updated', item: 'Admin Dashboard with CRUD Operations', time: 'Just now', icon: Code2 },
  { action: 'Learning', item: 'Advanced React Patterns', time: 'This week', icon: BookOpen },
  { action: 'Planning', item: 'Full Stack Project Development', time: 'This month', icon: Globe }
];

// Static fallback data
const fallbackExperienceData = [
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
];

// Dynamic experience data fetcher
export const getExperienceData = async () => {
  try {
    const response = await experienceAPI.getAll();
    return response.experience;
  } catch (error) {
    console.warn('Failed to fetch experience from API, using fallback data:', error);
    return fallbackExperienceData;
  }
};

// Export static data for immediate use (will be replaced by dynamic data)
export const experienceData = fallbackExperienceData;

// Static fallback data
const fallbackContactData = [
  { icon: Mail, label: 'Email', value: 'johnclifford.albarico@email.com', href: 'mailto:johnclifford.albarico@email.com' },
  { icon: Phone, label: 'Phone', value: 'Available upon request', href: '#' },
  { icon: MapPin, label: 'Location', value: 'Philippines', href: '#' },
  { icon: Globe, label: 'Portfolio', value: 'johnclifford.dev', href: '#' }
];

const fallbackSocialLinks = [
  { icon: Github, label: 'GitHub', value: '@johnclifford', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', value: '/in/johnclifford-albarico', href: '#' },
  { icon: MessageCircle, label: 'Discord', value: 'johnclifford#1234', href: '#' }
];

// Dynamic contact data fetcher
export const getContactData = async () => {
  try {
    const response = await contactAPI.getAll();
    const contactItems = response.contact || [];
    
    const contacts = contactItems
      .filter((item: ApiContactItem) => item.type === 'contact')
      .map((item: ApiContactItem) => ({
        ...item,
        icon: getIconComponent(item.icon)
      }));
    
    const socials = contactItems
      .filter((item: ApiContactItem) => item.type === 'social')
      .map((item: ApiContactItem) => ({
        ...item,
        icon: getIconComponent(item.icon)
      }));
    
    return { contacts, socials };
  } catch (error) {
    console.warn('Failed to fetch contact data from API, using fallback data:', error);
    return { 
      contacts: fallbackContactData, 
      socials: fallbackSocialLinks 
    };
  }
};

// Export static data for immediate use (will be replaced by dynamic data)
export const contactData = fallbackContactData;
export const socialLinks = fallbackSocialLinks;

export const skillCategories = [
  { name: 'Programming Languages', icon: Code2, color: 'from-blue-500 to-cyan-500' },
  { name: 'Frontend', icon: Monitor, color: 'from-purple-500 to-pink-500' },
  { name: 'Backend', icon: Server, color: 'from-green-500 to-emerald-500' },
  { name: 'Database', icon: Database, color: 'from-orange-500 to-red-500' },
  { name: 'Hosting & Deployment', icon: Cloud, color: 'from-indigo-500 to-blue-500' },
  { name: 'Monitoring & Tools', icon: Activity, color: 'from-yellow-500 to-orange-500' }
];

// Helper function to refresh all data
export const refreshPortfolioData = async () => {
  const [skills, projects, experience, contact] = await Promise.all([
    getSkillsData(),
    getProjectsData(),
    getExperienceData(),
    getContactData()
  ]);
  
  return {
    skills,
    projects,
    experience,
    contacts: contact.contacts,
    socials: contact.socials
  };
};
