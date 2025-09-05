import { Github, ExternalLink, LucideIcon } from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    tech: string[];
    status: string;
    progress: number;
    github: string;
    live: string;
    icon: LucideIcon;
    statusIcon: LucideIcon;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <project.icon className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
        </div>
        <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
          project.status === 'Completed' 
            ? 'bg-green-100 text-green-800' 
            : project.status === 'In Development'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          <project.statusIcon className="w-3 h-3" />
          {project.status}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">{project.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech, idx) => (
          <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
            {tech}
          </span>
        ))}
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-500">Progress</span>
          <span className="text-xs text-gray-500">{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <a href={project.github} className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
          <Github className="w-4 h-4" />
          Code
        </a>
        <a href={project.live} className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
          <ExternalLink className="w-4 h-4" />
          Live Demo
        </a>
      </div>
    </div>
  );
}