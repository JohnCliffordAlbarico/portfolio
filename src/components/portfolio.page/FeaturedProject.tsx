"use client";
import { ExternalLink, Github } from 'lucide-react';

const FeaturedProject = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Project
            </span>
          </h2>
          <p className="text-xl text-gray-300">My latest and greatest work</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Project Info */}
          <div className="order-2 lg:order-1">
            <h3 className="text-3xl font-bold mb-4">E-Commerce Platform</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              A full-featured e-commerce platform built with Next.js, TypeScript, and Stripe integration. 
              Features include user authentication, product management, shopping cart, and secure payments.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'MongoDB'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm hover:bg-white/10 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                <ExternalLink size={16} />
                Live Demo
              </button>
              <button className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
                <Github size={16} />
                View Code
              </button>
            </div>
          </div>

          {/* Project Preview */}
          <div className="order-1 lg:order-2">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-purple-400/50 transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-4xl font-bold text-white/20">Preview</div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-white/10 rounded w-3/4"></div>
                  <div className="h-3 bg-white/10 rounded w-1/2"></div>
                  <div className="h-3 bg-white/10 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;