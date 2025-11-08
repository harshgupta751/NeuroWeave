import React from 'react';
import { Brain } from 'lucide-react';

export default function commonNavigation({ currentPage, setCurrentPage }) {
  const navItems = ['home', 'dashboard', 'analytics', 'admin', 'about'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="w-8 h-8 text-purple-500" />
          <span className="text-2xl font-bold text-white">NeuroWeave</span>
        </div>
        <div className="flex items-center space-x-6">
          {navItems.map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg capitalize transition-all ${
                currentPage === page 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-purple-500/20'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}