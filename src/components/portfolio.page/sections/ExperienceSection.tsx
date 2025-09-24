'use client';
import { useState, useEffect } from 'react';
import { GraduationCap, Briefcase } from 'lucide-react';
import { experienceAPI } from '../../../lib/api';

interface Experience {
  id?: number;
  title: string;
  organization: string;
  period: string;
  description: string;
  type: 'education' | 'experience';
}

export default function ExperienceSection() {
  const [experienceData, setExperienceData] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await experienceAPI.getAll();
        setExperienceData(response.experience);
      } catch (error) {
        console.error('Failed to fetch experience:', error);
        setExperienceData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-l-4 border-gray-200 pl-6 pb-6 animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-200 p-2 rounded-lg w-9 h-9"></div>
                  <div className="flex-grow space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Education & Experience</h3>
        <div className="space-y-6">
          {experienceData.map((item, idx) => (
            <div key={idx} className="border-l-4 border-blue-600 pl-6 pb-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  {item.type === 'education' ? 
                    <GraduationCap className="w-5 h-5 text-blue-600" /> :
                    <Briefcase className="w-5 h-5 text-blue-600" />
                  }
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-blue-600 font-medium">{item.organization}</p>
                  <p className="text-sm text-gray-500 mb-2">{item.period}</p>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
