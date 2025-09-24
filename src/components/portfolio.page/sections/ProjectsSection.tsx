'use client';
import { useState, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';
import ProjectCard from '../ProjectCard/page';
import { projectsAPI } from '../../../lib/api';
import { getIconComponent } from '../../../lib/utils';

interface Project {
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
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAll();
        const projectsWithIcons = response.projects.map((project: any) => ({
          ...project,
          icon: getIconComponent(project.icon),
          statusIcon: getIconComponent(project.statusIcon)
        }));
        setProjects(projectsWithIcons);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
