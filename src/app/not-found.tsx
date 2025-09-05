'use client';

import Link from 'next/link';
import { Home, ArrowLeft, Code2, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
            <Code2 className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-6">
            Oops! The page you are looking for does not exist.
          </p>
        </div>

        {/* Custom Message */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium text-gray-600">Message from the developer</span>
          </div>
          <p className="text-lg font-semibold text-gray-800">
            John Clifford Albarico was here, nothing to see here? are you curious why this exist...? Well search it up you silly :)
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Aspiring Full Stack Developer
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          
          <div className="flex justify-center">
            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-xs text-gray-400">
          <p>Built with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}
