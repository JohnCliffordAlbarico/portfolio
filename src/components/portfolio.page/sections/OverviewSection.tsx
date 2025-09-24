'use client';
import { User, MapPin, Calendar, Award, Code2, Clock } from 'lucide-react';
import StatCard from '../Statcard/page';
import { recentActivities } from '../../../data/portfolioData';
import Image from 'next/image';

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
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src="/images/cliff.jpg"
                alt="John Clifford M. Albarico"
                width={128}
                height={128}
                className="w-full h-full object-cover"
                priority
              />
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

     
    </div>
  );
}
