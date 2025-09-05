'use client';
import { GraduationCap, Briefcase } from 'lucide-react';
import { experienceData } from '../../../data/portfolioData';

export default function ExperienceSection() {
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
