// API service functions for portfolio data management

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://johncliffordalbaricoportfolio.onrender.com/api' 
  : '/api';

// Skills API
export const skillsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/skills`);
    if (!response.ok) throw new Error('Failed to fetch skills');
    return response.json();
  },

  create: async (skill: {
    name: string;
    level: number;
    category: string;
    icon: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/skills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(skill),
    });
    if (!response.ok) throw new Error('Failed to create skill');
    return response.json();
  },

  update: async (id: number, skill: Partial<{
    name: string;
    level: number;
    category: string;
    icon: string;
  }>) => {
    const response = await fetch(`${API_BASE_URL}/skills`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...skill }),
    });
    if (!response.ok) throw new Error('Failed to update skill');
    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/skills?id=${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete skill');
    return response.json();
  },
};

// Projects API
export const projectsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/projects`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
  },

  create: async (project: {
    title: string;
    description: string;
    tech: string[];
    status: string;
    progress: number;
    github?: string;
    live?: string;
    icon?: string;
    statusIcon?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    if (!response.ok) throw new Error('Failed to create project');
    return response.json();
  },

  update: async (id: number, project: Partial<{
    title: string;
    description: string;
    tech: string[];
    status: string;
    progress: number;
    github: string;
    live: string;
    icon: string;
    statusIcon: string;
  }>) => {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...project }),
    });
    if (!response.ok) throw new Error('Failed to update project');
    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/projects?id=${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete project');
    return response.json();
  },
};

// Experience API
export const experienceAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/experience`);
    if (!response.ok) throw new Error('Failed to fetch experience');
    return response.json();
  },

  create: async (experience: {
    title: string;
    organization: string;
    period: string;
    description: string;
    type: 'education' | 'experience';
  }) => {
    const response = await fetch(`${API_BASE_URL}/experience`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(experience),
    });
    if (!response.ok) throw new Error('Failed to create experience');
    return response.json();
  },

  update: async (id: number, experience: Partial<{
    title: string;
    organization: string;
    period: string;
    description: string;
    type: 'education' | 'experience';
  }>) => {
    const response = await fetch(`${API_BASE_URL}/experience`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...experience }),
    });
    if (!response.ok) throw new Error('Failed to update experience');
    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/experience?id=${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete experience');
    return response.json();
  },
};

// Contact API
export const contactAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/contact`);
    if (!response.ok) throw new Error('Failed to fetch contact');
    return response.json();
  },

  create: async (contact: {
    icon: string;
    label: string;
    value: string;
    href: string;
    type?: 'contact' | 'social';
  }) => {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    });
    if (!response.ok) throw new Error('Failed to create contact');
    return response.json();
  },

  update: async (id: number, contact: Partial<{
    icon: string;
    label: string;
    value: string;
    href: string;
    type: 'contact' | 'social';
  }>) => {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...contact }),
    });
    if (!response.ok) throw new Error('Failed to update contact');
    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/contact?id=${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete contact');
    return response.json();
  },
};
