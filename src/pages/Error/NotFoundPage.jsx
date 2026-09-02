import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Home, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white min-h-[70vh]">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-red-100 rounded-full blur-xl opacity-60"></div>
            <div className="relative bg-white border-2 border-red-100 p-6 rounded-3xl shadow-sm">
              <Terminal className="w-16 h-16 text-red-500" />
            </div>
          </div>
        </div>
        
        <h1 className="text-[32px] font-bold tracking-tight text-slate-900">
          404 - Not Found
        </h1>
        
        <p className="text-[16px] text-slate-500 leading-relaxed max-w-sm mx-auto">
          The route or page you are looking for does not exist in the current ByteLab environment.
        </p>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link 
            to="/"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-slate-700 font-medium hover:bg-slate-50 border border-slate-200 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}
