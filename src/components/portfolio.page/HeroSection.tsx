
"use client";
import { ChevronDown, Github, Linkedin, Mail, Code, Palette, Zap } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center z-10">
        {/* Profile Image */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-400 to-pink-400 p-1 shadow-2xl">
            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
              <span className="text-4xl font-bold">JCA</span>
            </div>
          </div>
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-30 blur-lg animate-pulse"></div>
        </div>

        {/* Main Content */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            John Clifford M. Albarico
          </span>
        </h1>
        
        <div className="text-xl md:text-2xl text-purple-200 mb-4">
         Aspiring Full Stack Developer
        </div>
        
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Crafting digital experiences that blend creativity with functionality. 
          I build modern web applications that users love and businesses need.
        </p>

        {/* Skills Icons */}
        <div className="flex justify-center space-x-6 mb-12">
          <div className="p-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <Code className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="p-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <Palette className="w-6 h-6 text-pink-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="p-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <Zap className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all duration-300">
            View My Work
          </button>
          <button className="px-8 py-4 border-2 border-white/20 rounded-full font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300">
            Get In Touch
          </button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-12">
          {[
            { icon: Github, label: 'GitHub' },
            { icon: Linkedin, label: 'LinkedIn' },
            { icon: Mail, label: 'Email' }
          ].map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#"
              className="p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-purple-400/50 transition-all duration-300 group"
              aria-label={label}
            >
              <Icon className="w-6 h-6 group-hover:text-purple-400 group-hover:scale-110 transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/60" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;