'use client';

import { useState, useEffect } from 'react';

export default function TimeDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="hidden md:block text-right">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          --:--:--
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="hidden md:block text-right">
      <p className="text-sm font-medium text-gray-900 dark:text-white">
        {currentTime.toLocaleTimeString()}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {currentTime.toLocaleDateString()}
      </p>
    </div>
  );
}
