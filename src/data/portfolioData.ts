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
  ExternalLink,
  Download,
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

export const skillsData = [
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

export const projects = [
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

export const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'experience', label: 'Experience', icon: GraduationCap },
  { id: 'contact', label: 'Contact', icon: Mail }
];

export const recentActivities = [
  { action: 'Completed', item: 'Portfolio Website Modernization', time: 'Just now', icon: Award },
  { action: 'Updated', item: 'Skills & Technologies Section', time: 'Just now', icon: Code2 },
  { action: 'Learning', item: 'Advanced React Patterns', time: 'This week', icon: BookOpen },
  { action: 'Planning', item: 'Full Stack Project Development', time: 'This month', icon: Globe }
];

export const experienceData = [
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

export const contactData = [
  { icon: Mail, label: 'Email', value: 'johnclifford.albarico@email.com', href: 'mailto:johnclifford.albarico@email.com' },
  { icon: Phone, label: 'Phone', value: 'Available upon request', href: '#' },
  { icon: MapPin, label: 'Location', value: 'Philippines', href: '#' },
  { icon: Globe, label: 'Portfolio', value: 'johnclifford.dev', href: '#' }
];

export const socialLinks = [
  { icon: Github, label: 'GitHub', value: '@johnclifford', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', value: '/in/johnclifford-albarico', href: '#' },
  { icon: MessageCircle, label: 'Discord', value: 'johnclifford#1234', href: '#' }
];

export const skillCategories = [
  { name: 'Programming Languages', icon: Code2, color: 'from-blue-500 to-cyan-500' },
  { name: 'Frontend', icon: Monitor, color: 'from-purple-500 to-pink-500' },
  { name: 'Backend', icon: Server, color: 'from-green-500 to-emerald-500' },
  { name: 'Database', icon: Database, color: 'from-orange-500 to-red-500' },
  { name: 'Hosting & Deployment', icon: Cloud, color: 'from-indigo-500 to-blue-500' },
  { name: 'Monitoring & Tools', icon: Activity, color: 'from-yellow-500 to-orange-500' }
];
