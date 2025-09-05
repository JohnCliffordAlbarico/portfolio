'use client';
import { ExternalLink, Download } from 'lucide-react';
import { contactData, socialLinks } from '../../../data/portfolioData';

export default function ContactSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Get In Touch</h3>
          <div className="space-y-4">
            {contactData.map((contact, idx) => (
              <a key={idx} href={contact.href} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group">
                <div className="bg-white p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <contact.icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{contact.label}</p>
                  <p className="text-sm text-gray-600">{contact.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Social Links</h3>
          <div className="space-y-4">
            {socialLinks.map((social, idx) => (
              <a key={idx} href={social.href} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group">
                <div className="bg-white p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <social.icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{social.label}</p>
                  <p className="text-sm text-gray-600">{social.value}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 ml-auto group-hover:text-blue-600" />
              </a>
            ))}
          </div>
          
          <div className="mt-6">
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
