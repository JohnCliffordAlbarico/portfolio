'use client';
import { useState, useEffect } from 'react';
import { ExternalLink, LucideIcon, ArrowUpRight } from 'lucide-react';
import { contactAPI } from '../../../lib/api';
import { getIconComponent } from '../../../lib/utils';

interface ContactItem {
  id: number;
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
  type: 'contact' | 'social';
}

export default function ContactSection() {
  const [contactData, setContactData] = useState<ContactItem[]>([]);
  const [socialLinks, setSocialLinks] = useState<ContactItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await contactAPI.getAll();
        const contactItems = response.contact || [];
        
        interface ApiContactItem {
          id: number;
          icon: string;
          label: string;
          value: string;
          href: string;
          type: 'contact' | 'social';
        }

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
        
        setContactData(contacts);
        setSocialLinks(socials);
      } catch (error) {
        console.error('Failed to fetch contact data:', error);
        setContactData([]);
        setSocialLinks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg animate-pulse">
                    <div className="bg-gray-200 p-2 rounded-lg w-9 h-9"></div>
                    <div className="flex-grow space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Get In Touch</h3>
          <div className="space-y-4">
            {contactData.map((contact, idx) => (
              <a 
                key={idx} 
                href={contact.href} 
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-200 group cursor-pointer transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                target={contact.href.startsWith('http') ? '_blank' : '_self'}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={`Contact via ${contact.label}: ${contact.value}`}
              >
                <div className="bg-white p-2 rounded-lg group-hover:bg-blue-100 transition-all duration-200 group-hover:shadow-sm">
                  <contact.icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-blue-900 transition-colors duration-200">{contact.label}</p>
                  <p className="text-sm text-gray-600 group-hover:text-blue-700 transition-colors duration-200">{contact.value}</p>
                </div>
                {contact.href.startsWith('http') && (
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                )}
              </a>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Social Links</h3>
          <div className="space-y-4">
            {socialLinks.map((social, idx) => (
              <a 
                key={idx} 
                href={social.href} 
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-200 group cursor-pointer transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${social.label}: ${social.value}`}
              >
                <div className="bg-white p-2 rounded-lg group-hover:bg-blue-100 transition-all duration-200 group-hover:shadow-sm">
                  <social.icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-blue-900 transition-colors duration-200">{social.label}</p>
                  <p className="text-sm text-gray-600 group-hover:text-blue-700 transition-colors duration-200">{social.value}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
