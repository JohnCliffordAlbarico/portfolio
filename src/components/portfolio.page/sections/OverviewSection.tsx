'use client';
import { User, MapPin, Calendar, Award, Code2, Clock } from 'lucide-react';
import StatCard from '../Statcard/page';
import { recentActivities } from '../../../data/portfolioData';

export default function OverviewSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <StatCard title="Projects" value="4+" icon={Award} trend="25" />
        <StatCard title="Technologies" value="15+" icon={Code2} trend="15" />
        <StatCard title="Languages" value="6+" icon={User} trend="12" />
        <StatCard title="Coffee Cups" value="∞" icon={User} />
      </div>

      <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="flex-shrink-0 flex justify-center lg:justify-start">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 md:w-16 md:h-16 text-white" />
            </div>
          </div>
          <div className="flex-grow text-center lg:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">John Clifford M. Albarico</h1>
            <p className="text-lg md:text-xl text-blue-600 mb-4">Aspiring Full Stack Developer</p>
            <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
              Passionate about creating innovative web solutions that bridge the gap between 
              beautiful design and robust functionality. Started my journey with C language and 
              adapted to modern technologies including Java, JavaScript, and Python. Currently 
              specializing in React.js, Next.js, and Supabase while expanding my expertise in 
              full-stack development and cloud hosting solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-gray-600 justify-center lg:justify-start">
                <MapPin className="w-4 h-4" />
                <span>Philippines</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 justify-center lg:justify-start">
                <Calendar className="w-4 h-4" />
                <span>Available for opportunities</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivities.map((activity, idx) => (
            <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-lg">
                <activity.icon className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-grow">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.action}</span> {activity.item}
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
