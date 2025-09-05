import { LucideIcon } from 'lucide-react';

interface SkillBarProps {
  skill: { name: string; level: number; category: string; icon: LucideIcon };
}

export default function SkillBar({ skill }: SkillBarProps) {
  return (
    <div className="group p-4 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-purple-50 transition-all duration-300 hover:shadow-md border border-gray-100 hover:border-blue-200">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
            <skill.icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
              {skill.name}
            </span>
            <div className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
              {skill.category}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded-full border border-gray-200 group-hover:border-blue-200 group-hover:text-blue-600 transition-all duration-300">
            {skill.category}
          </span>
          <span className="text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
            {skill.level}%
          </span>
        </div>
      </div>
      
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000 ease-out relative overflow-hidden"
            style={{ width: `${skill.level}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </div>
        </div>
        
        {/* Skill level indicator dots */}
        <div className="flex justify-between mt-2">
          {[0, 25, 50, 75, 100].map((level) => (
            <div
              key={level}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                skill.level >= level
                  ? 'bg-blue-500 shadow-sm'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Skill level description */}
      <div className="mt-2 text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
        {skill.level >= 90 && 'Expert Level'}
        {skill.level >= 75 && skill.level < 90 && 'Advanced'}
        {skill.level >= 50 && skill.level < 75 && 'Intermediate'}
        {skill.level >= 25 && skill.level < 50 && 'Beginner'}
        {skill.level < 25 && 'Learning'}
      </div>
    </div>
  );
}