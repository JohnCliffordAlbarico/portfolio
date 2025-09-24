"use client";
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Loader2, GraduationCap, Briefcase } from 'lucide-react';
import { experienceAPI } from '@/lib/api';

interface Experience {
  id: number;
  title: string;
  organization: string;
  period: string;
  description: string;
  type: 'education' | 'experience';
}

const ExperienceManager = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    period: '',
    description: '',
    type: 'experience' as 'education' | 'experience'
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await experienceAPI.getAll();
      setExperiences(response.experience || []);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      await experienceAPI.create(formData);
      setFormData({
        title: '',
        organization: '',
        period: '',
        description: '',
        type: 'experience'
      });
      setShowAddForm(false);
      fetchExperiences();
    } catch (error) {
      console.error('Error adding experience:', error);
    }
  };

  const handleUpdate = async (id: number, updatedData: Partial<Experience>) => {
    try {
      await experienceAPI.update(id, updatedData);
      setEditingId(null);
      fetchExperiences();
    } catch (error) {
      console.error('Error updating experience:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      try {
        await experienceAPI.delete(id);
        fetchExperiences();
      } catch (error) {
        console.error('Error deleting experience:', error);
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
        <h2 className="text-2xl font-bold">Experience Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
        >
          <Plus size={16} />
          Add Experience
        </button>
      </div>

      {showAddForm && (
        <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Add New Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Organization"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Period (e.g., 2023 - Present)"
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400"
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'education' | 'experience' })}
              className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white"
            >
              <option value="experience">Work Experience</option>
              <option value="education">Education</option>
            </select>
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 md:col-span-2"
              rows={4}
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAdd}
              disabled={!formData.title || !formData.organization || !formData.period || !formData.description}
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
        {experiences.map((experience) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            isEditing={editingId === experience.id}
            onEdit={() => setEditingId(experience.id)}
            onSave={(updatedData) => handleUpdate(experience.id, updatedData)}
            onCancel={() => setEditingId(null)}
            onDelete={() => handleDelete(experience.id)}
          />
        ))}
      </div>
    </div>
  );
};

interface ExperienceCardProps {
  experience: Experience;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (data: Partial<Experience>) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const ExperienceCard = ({ experience, isEditing, onEdit, onSave, onCancel, onDelete }: ExperienceCardProps) => {
  const [editData, setEditData] = useState({
    title: experience.title,
    organization: experience.organization,
    period: experience.period,
    description: experience.description,
    type: experience.type
  });

  const handleSave = () => {
    onSave(editData);
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
            placeholder="Title"
          />
          <input
            type="text"
            value={editData.organization}
            onChange={(e) => setEditData({ ...editData, organization: e.target.value })}
            className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white"
            placeholder="Organization"
          />
          <input
            type="text"
            value={editData.period}
            onChange={(e) => setEditData({ ...editData, period: e.target.value })}
            className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white"
            placeholder="Period"
          />
          <select
            value={editData.type}
            onChange={(e) => setEditData({ ...editData, type: e.target.value as 'education' | 'experience' })}
            className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white"
          >
            <option value="experience">Work Experience</option>
            <option value="education">Education</option>
          </select>
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white md:col-span-2"
            rows={4}
            placeholder="Description"
          />
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
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            experience.type === 'education' ? 'bg-blue-600/20' : 'bg-green-600/20'
          }`}>
            {experience.type === 'education' ? (
              <GraduationCap className={experience.type === 'education' ? 'text-blue-400' : 'text-green-400'} size={24} />
            ) : (
              <Briefcase className="text-green-400" size={24} />
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1">{experience.title}</h3>
            <p className="text-purple-300 font-medium">{experience.organization}</p>
            <p className="text-gray-400 text-sm">{experience.period}</p>
          </div>
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
      
      <p className="text-gray-300 leading-relaxed">{experience.description}</p>
      
      <div className="mt-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          experience.type === 'education' 
            ? 'text-blue-400 bg-blue-400/10' 
            : 'text-green-400 bg-green-400/10'
        }`}>
          {experience.type === 'education' ? 'Education' : 'Work Experience'}
        </span>
      </div>
    </div>
  );
};

export default ExperienceManager;
