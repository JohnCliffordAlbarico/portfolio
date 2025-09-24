"use client";
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Loader2 } from 'lucide-react';
import { skillsAPI } from '@/lib/api';

interface Skill {
  id: number;
  name: string;
  level: number;
  category: string;
  icon: string;
}

const SkillsManager = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    level: 50,
    category: '',
    icon: ''
  });

  const categories = [
    'Programming Languages',
    'Frontend',
    'Backend',
    'Database',
    'Hosting & Deployment',
    'Monitoring & Tools'
  ];

  const iconOptions = [
    'Terminal', 'Coffee', 'Code', 'Hexagon', 'FileText', 'Palette',
    'Circle', 'Triangle', 'Square', 'Rocket', 'Diamond', 'Database',
    'Cloud', 'Zap', 'Shield', 'Eye', 'GitBranch'
  ];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await skillsAPI.getAll();
      setSkills(response.skills || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      await skillsAPI.create(formData);
      setFormData({ name: '', level: 50, category: '', icon: '' });
      setShowAddForm(false);
      fetchSkills();
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  const handleUpdate = async (id: number, updatedData: Partial<Skill>) => {
    try {
      await skillsAPI.update(id, updatedData);
      setEditingId(null);
      fetchSkills();
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      try {
        await skillsAPI.delete(id);
        fetchSkills();
      } catch (error) {
        console.error('Error deleting skill:', error);
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
        <h2 className="text-2xl font-bold">Skills Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
        >
          <Plus size={16} />
          Add Skill
        </button>
      </div>

      {showAddForm && (
        <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Add New Skill</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Skill Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400"
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
              className="col-span-1"
            />
            <div className="text-sm text-gray-400">Level: {formData.level}%</div>
            <select
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white"
            >
              <option value="">Select Icon</option>
              {iconOptions.map(icon => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAdd}
              disabled={!formData.name || !formData.category || !formData.icon}
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

      <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 font-medium text-gray-300">Name</th>
                <th className="text-left p-4 font-medium text-gray-300">Level</th>
                <th className="text-left p-4 font-medium text-gray-300">Category</th>
                <th className="text-left p-4 font-medium text-gray-300">Icon</th>
                <th className="text-left p-4 font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <SkillRow
                  key={skill.id}
                  skill={skill}
                  isEditing={editingId === skill.id}
                  onEdit={() => setEditingId(skill.id)}
                  onSave={(updatedData) => handleUpdate(skill.id, updatedData)}
                  onCancel={() => setEditingId(null)}
                  onDelete={() => handleDelete(skill.id)}
                  categories={categories}
                  iconOptions={iconOptions}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface SkillRowProps {
  skill: Skill;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (data: Partial<Skill>) => void;
  onCancel: () => void;
  onDelete: () => void;
  categories: string[];
  iconOptions: string[];
}

const SkillRow = ({ skill, isEditing, onEdit, onSave, onCancel, onDelete, categories, iconOptions }: SkillRowProps) => {
  const [editData, setEditData] = useState({
    name: skill.name,
    level: skill.level,
    category: skill.category,
    icon: skill.icon
  });

  const handleSave = () => {
    onSave(editData);
  };

  if (isEditing) {
    return (
      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
        <td className="p-4">
          <input
            type="text"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            className="bg-slate-700/50 border border-white/10 rounded px-2 py-1 text-white text-sm w-full"
          />
        </td>
        <td className="p-4">
          <input
            type="range"
            min="0"
            max="100"
            value={editData.level}
            onChange={(e) => setEditData({ ...editData, level: parseInt(e.target.value) })}
            className="w-20"
          />
          <span className="ml-2 text-sm">{editData.level}%</span>
        </td>
        <td className="p-4">
          <select
            value={editData.category}
            onChange={(e) => setEditData({ ...editData, category: e.target.value })}
            className="bg-slate-700/50 border border-white/10 rounded px-2 py-1 text-white text-sm"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </td>
        <td className="p-4">
          <select
            value={editData.icon}
            onChange={(e) => setEditData({ ...editData, icon: e.target.value })}
            className="bg-slate-700/50 border border-white/10 rounded px-2 py-1 text-white text-sm"
          >
            {iconOptions.map(icon => (
              <option key={icon} value={icon}>{icon}</option>
            ))}
          </select>
        </td>
        <td className="p-4">
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="p-1 hover:bg-green-500/20 text-green-400 rounded transition-colors"
            >
              <Save size={16} />
            </button>
            <button
              onClick={onCancel}
              className="p-1 hover:bg-gray-500/20 text-gray-400 rounded transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
      <td className="p-4 font-medium">{skill.name}</td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-20 bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
              style={{ width: `${skill.level}%` }}
            ></div>
          </div>
          <span className="text-sm">{skill.level}%</span>
        </div>
      </td>
      <td className="p-4 text-gray-300">{skill.category}</td>
      <td className="p-4 text-gray-300">{skill.icon}</td>
      <td className="p-4">
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="p-1 hover:bg-white/10 rounded transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-1 hover:bg-red-500/20 text-red-400 rounded transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default SkillsManager;
