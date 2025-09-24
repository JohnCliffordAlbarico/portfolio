"use client";
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Loader2, ExternalLink } from 'lucide-react';
import { projectsAPI } from '@/lib/api';

interface Project {
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

const ProjectsManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech: '',
    status: 'Planned',
    progress: 0,
    github: '#',
    live: '#',
    icon: 'Globe',
    statusIcon: 'CheckCircle'
  });

  const statusOptions = ['Completed', 'In Development', 'Planned'];
  const iconOptions = ['Globe', 'Monitor', 'Server', 'Smartphone', 'Database', 'Cloud'];
  const statusIconOptions = ['CheckCircle', 'PlayCircle', 'PauseCircle'];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      const projectData = {
        ...formData,
        tech: formData.tech.split(',').map(t => t.trim()).filter(t => t)
      };
      await projectsAPI.create(projectData);
      setFormData({
        title: '',
        description: '',
        tech: '',
        status: 'Planned',
        progress: 0,
        github: '#',
        live: '#',
        icon: 'Globe',
        statusIcon: 'CheckCircle'
      });
      setShowAddForm(false);
      fetchProjects();
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleUpdate = async (id: number, updatedData: Partial<Project>) => {
    try {
      await projectsAPI.update(id, updatedData);
      setEditingId(null);
      fetchProjects();
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsAPI.delete(id);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="animate-spin text-purple-400" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Projects Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {showAddForm && (
        <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Add New Project</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Project Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400"
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <textarea
              placeholder="Project Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 md:col-span-2"
              rows={3}
            />
            <input
              type="text"
              placeholder="Technologies (comma-separated)"
              value={formData.tech}
              onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
              className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 md:col-span-2"
            />
            <input
              type="url"
              placeholder="GitHub URL"
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400"
            />
            <input
              type="url"
              placeholder="Live Demo URL"
              value={formData.live}
              onChange={(e) => setFormData({ ...formData, live: e.target.value })}
              className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400"
            />
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                className="flex-1"
              />
              <span className="text-sm text-gray-400 w-16">Progress: {formData.progress}%</span>
            </div>
            <select
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white"
            >
              {iconOptions.map(icon => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAdd}
              disabled={!formData.title || !formData.description}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg text-white font-medium transition-colors"
            >
              <Save size={16} />
              Save
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isEditing={editingId === project.id}
            onEdit={() => setEditingId(project.id)}
            onSave={(updatedData) => handleUpdate(project.id, updatedData)}
            onCancel={() => setEditingId(null)}
            onDelete={() => handleDelete(project.id)}
            statusOptions={statusOptions}
            iconOptions={iconOptions}
          />
        ))}
      </div>
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (data: Partial<Project>) => void;
  onCancel: () => void;
  onDelete: () => void;
  statusOptions: string[];
  iconOptions: string[];
}

const ProjectCard = ({ project, isEditing, onEdit, onSave, onCancel, onDelete, statusOptions, iconOptions }: ProjectCardProps) => {
  const [editData, setEditData] = useState({
    title: project.title,
    description: project.description,
    tech: project.tech.join(', '),
    status: project.status,
    progress: project.progress,
    github: project.github,
    live: project.live,
    icon: project.icon,
    statusIcon: project.statusIcon
  });

  const handleSave = () => {
    const updatedData = {
      ...editData,
      tech: editData.tech.split(',').map(t => t.trim()).filter(t => t)
    };
    onSave(updatedData);
  };

  if (isEditing) {
    return (
      <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white"
            placeholder="Project Title"
          />
          <select
            value={editData.status}
            onChange={(e) => setEditData({ ...editData, status: e.target.value })}
            className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white md:col-span-2"
            rows={3}
            placeholder="Project Description"
          />
          <input
            type="text"
            value={editData.tech}
            onChange={(e) => setEditData({ ...editData, tech: e.target.value })}
            className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white md:col-span-2"
            placeholder="Technologies (comma-separated)"
          />
          <input
            type="url"
            value={editData.github}
            onChange={(e) => setEditData({ ...editData, github: e.target.value })}
            className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white"
            placeholder="GitHub URL"
          />
          <input
            type="url"
            value={editData.live}
            onChange={(e) => setEditData({ ...editData, live: e.target.value })}
            className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white"
            placeholder="Live Demo URL"
          />
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="100"
              value={editData.progress}
              onChange={(e) => setEditData({ ...editData, progress: parseInt(e.target.value) })}
              className="flex-1"
            />
            <span className="text-sm text-gray-400 w-16">{editData.progress}%</span>
          </div>
          <select
            value={editData.icon}
            onChange={(e) => setEditData({ ...editData, icon: e.target.value })}
            className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white"
          >
            {iconOptions.map(icon => (
              <option key={icon} value={icon}>{icon}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-colors"
          >
            <Save size={16} />
            Save
          </button>
          <button
            onClick={onCancel}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors"
          >
            <X size={16} />
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-gray-300 mb-4">{project.description}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          project.status === 'Completed' ? 'text-green-400 bg-green-400/10' :
          project.status === 'In Development' ? 'text-yellow-400 bg-yellow-400/10' :
          'text-gray-400 bg-gray-400/10'
        }`}>
          {project.status}
        </span>
        <div className="flex items-center gap-4">
          {project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ExternalLink size={16} />
            </a>
          )}
          {project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${project.progress}%` }}
        ></div>
      </div>
      <div className="text-sm text-gray-400 mt-1">{project.progress}% Complete</div>
    </div>
  );
};

export default ProjectsManager;
