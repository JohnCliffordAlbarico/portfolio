'use client';
import { Code2, Sparkles } from 'lucide-react';
import SkillBar from '../SkillBar/page';
import { skillsData, skillCategories } from '../../../data/portfolioData';

export default function SkillsSection() {
  return (
    <div className="space-y-6">
      {/* Skills Header */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <Code2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Technical Skills</h3>
            <p className="text-sm text-gray-600">My expertise and proficiency levels</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          <span>Continuously learning and expanding my skill set</span>
        </div>
      </div>

      {/* Enhanced Skills Grid */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {skillsData.slice(0, 4).map((skill, idx) => (
              <div key={idx} className="group">
                <SkillBar skill={skill} />
              </div>
            ))}
          </div>
          <div className="space-y-6">
            {skillsData.slice(4).map((skill, idx) => (
              <div key={idx} className="group">
                <SkillBar skill={skill} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, idx) => (
          <div key={idx} className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 bg-gradient-to-br ${category.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                  {category.name}
                </h4>
                <p className="text-xs text-gray-500">
                  {skillsData.filter(skill => skill.category === category.name).length} skills
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {skillsData
                .filter(skill => skill.category === category.name)
                .map((skill, skillIdx) => (
                  <div key={skillIdx} className="group/skill flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300 border border-transparent hover:border-blue-100">
                    <div className="p-2 bg-white rounded-lg shadow-sm group-hover/skill:shadow-md group-hover/skill:scale-105 transition-all duration-300">
                      <skill.icon className="w-4 h-4 text-gray-600 group-hover/skill:text-blue-600 transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-700 group-hover/skill:text-gray-900 transition-colors duration-300">
                        {skill.name}
                      </span>
                      <div className="text-xs text-gray-500 group-hover/skill:text-gray-600 transition-colors duration-300">
                        {skill.level >= 90 && "Expert"}
                        {skill.level >= 75 && skill.level < 90 && "Advanced"}
                        {skill.level >= 50 && skill.level < 75 && "Intermediate"}
                        {skill.level >= 25 && skill.level < 50 && "Beginner"}
                        {skill.level < 25 && "Learning"}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${category.color} transition-all duration-1000`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-gray-600 w-8 text-right">
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                ))}
              {skillsData.filter(skill => skill.category === category.name).length === 0 && (
                <div className="text-center py-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-400 font-medium">Coming soon...</p>
                  <p className="text-xs text-gray-300">More skills to be added</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
