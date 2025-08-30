"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../../components/portfolio.page/NavBar';
import HeroSection from '../../components/portfolio.page/HeroSection';
import FeaturedProject from '../../components/portfolio.page/FeaturedProject';
import StatsSection from '../../components/portfolio.page/StatsSection';

const Portfolio = () => {
  const [isAdmin, setIsAdmin] = useState(true); // Mock admin state, replace with your auth logic
  const router = useRouter();

  const handleAuthLogin = () => {
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-x-hidden">
      <NavBar />
      <HeroSection />
      <FeaturedProject />
      <StatsSection />
      {isAdmin && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={handleAuthLogin}
          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 text-sm font-medium transition-colors duration-200"

          >
            Admin: Go to Auth Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;