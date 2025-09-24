"use client";
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Loader2, Mail, Phone, MapPin, Github, Linkedin, MessageCircle, Globe, ExternalLink } from 'lucide-react';
import { contactAPI } from '@/lib/api';

interface Contact {
  id: number;
  icon: string;
  label: string;
  value: string;
  href: string;
  type: 'contact' | 'social';
}

const ContactManager = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    icon: 'Mail',
    label: '',
    value: '',
    href: '',
    type: 'contact' as 'contact' | 'social'
  });

  const iconOptions = [
    { name: 'Mail', component: Mail },
    { name: 'Phone', component: Phone },
    { name: 'MapPin', component: MapPin },
    { name: 'Globe', component: Globe },
    { name: 'Github', component: Github },
    { name: 'Linkedin', component: Linkedin },
    { name: 'MessageCircle', component: MessageCircle },
    { name: 'ExternalLink', component: ExternalLink }
  ];

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await contactAPI.getAll();
      setContacts(response.contact || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      await contactAPI.create(formData);
      setFormData({
        icon: 'Mail',
        label: '',
        value: '',
        href: '',
        type: 'contact'
      });
      setShowAddForm(false);
      fetchContacts();
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const handleUpdate = async (id: number, updatedData: Partial<Contact>) => {
    try {
      await contactAPI.update(id, updatedData);
      setEditingId(null);
      fetchContacts();
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactAPI.delete(id);
        fetchContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find(option => option.name === iconName);
    return iconOption ? iconOption.component : Mail;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="animate-spin text-purple-400" size={32} />
      </div>
    );
  }

  const contactItems = contacts.filter(c => c.type === 'contact');
  const socialItems = contacts.filter(c => c.type === 'social');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Contact Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
        >
          <Plus size={16} />
          Add Contact
        </button>
      </div>

      {showAddForm && (
        <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Add New Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'contact' | 'social' })}
              className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white"
            >
              <option value="contact">Contact Information</option>
              <option value="social">Social Link</option>
            </select>
            <select
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white"
            >
              {iconOptions.map(icon => (
                <option key={icon.name} value={icon.name}>{icon.name}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Label (e.g., Email, GitHub)"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Value (e.g., john@example.com)"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400"
            />
            <input
              type="url"
              placeholder="Link/URL (e.g., mailto:john@example.com)"
              value={formData.href}
              onChange={(e) => setFormData({ ...formData, href: e.target.value })}
              className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 md:col-span-2"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAdd}
              disabled={!formData.label || !formData.value || !formData.href}
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

      {/* Contact Information Section */}
      <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-blue-300">Contact Information</h3>
        <div className="grid gap-4">
          {contactItems.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              isEditing={editingId === contact.id}
              onEdit={() => setEditingId(contact.id)}
              onSave={(updatedData) => handleUpdate(contact.id, updatedData)}
              onCancel={() => setEditingId(null)}
              onDelete={() => handleDelete(contact.id)}
              iconOptions={iconOptions}
              getIconComponent={getIconComponent}
            />
          ))}
        </div>
      </div>

      {/* Social Links Section */}
      <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-purple-300">Social Links</h3>
        <div className="grid gap-4">
          {socialItems.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              isEditing={editingId === contact.id}
              onEdit={() => setEditingId(contact.id)}
              onSave={(updatedData) => handleUpdate(contact.id, updatedData)}
              onCancel={() => setEditingId(null)}
              onDelete={() => handleDelete(contact.id)}
              iconOptions={iconOptions}
              getIconComponent={getIconComponent}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface ContactItemProps {
  contact: Contact;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (data: Partial<Contact>) => void;
  onCancel: () => void;
  onDelete: () => void;
  iconOptions: { name: string; component: any }[];
  getIconComponent: (iconName: string) => any;
}

const ContactItem = ({ contact, isEditing, onEdit, onSave, onCancel, onDelete, iconOptions, getIconComponent }: ContactItemProps) => {
  const [editData, setEditData] = useState({
    icon: contact.icon,
    label: contact.label,
    value: contact.value,
    href: contact.href,
    type: contact.type
  });

  const handleSave = () => {
    onSave(editData);
  };

  const IconComponent = getIconComponent(contact.icon);

  if (isEditing) {
    return (
      <div className="bg-slate-700/30 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={editData.type}
            onChange={(e) => setEditData({ ...editData, type: e.target.value as 'contact' | 'social' })}
            className="bg-slate-600/50 border border-white/10 rounded px-3 py-2 text-white text-sm"
          >
            <option value="contact">Contact Information</option>
            <option value="social">Social Link</option>
          </select>
          <select
            value={editData.icon}
            onChange={(e) => setEditData({ ...editData, icon: e.target.value })}
            className="bg-slate-600/50 border border-white/10 rounded px-3 py-2 text-white text-sm"
          >
            {iconOptions.map(icon => (
              <option key={icon.name} value={icon.name}>{icon.name}</option>
            ))}
          </select>
          <input
            type="text"
            value={editData.label}
            onChange={(e) => setEditData({ ...editData, label: e.target.value })}
            className="bg-slate-600/50 border border-white/10 rounded px-3 py-2 text-white text-sm"
            placeholder="Label"
          />
          <input
            type="text"
            value={editData.value}
            onChange={(e) => setEditData({ ...editData, value: e.target.value })}
            className="bg-slate-600/50 border border-white/10 rounded px-3 py-2 text-white text-sm"
            placeholder="Value"
          />
          <input
            type="url"
            value={editData.href}
            onChange={(e) => setEditData({ ...editData, href: e.target.value })}
            className="bg-slate-600/50 border border-white/10 rounded px-3 py-2 text-white text-sm md:col-span-2"
            placeholder="Link/URL"
          />
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-white text-sm font-medium transition-colors"
          >
            <Save size={14} />
            Save
          </button>
          <button
            onClick={onCancel}
            className="flex items-center gap-2 px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-white text-sm font-medium transition-colors"
          >
            <X size={14} />
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          contact.type === 'social' ? 'bg-purple-600/20' : 'bg-blue-600/20'
        }`}>
          <IconComponent className={contact.type === 'social' ? 'text-purple-400' : 'text-blue-400'} size={20} />
        </div>
        <div>
          <h4 className="font-medium">{contact.label}</h4>
          <p className="text-gray-400 text-sm">{contact.value}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {contact.href !== '#' && (
          <a
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            <ExternalLink size={16} />
          </a>
        )}
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
  );
};

export default ContactManager;
