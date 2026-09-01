import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';
import { Button } from './ui/Button.jsx';
import { GlobalNav } from './layout/GlobalNav.jsx';

export function RouteErrorBoundary() {
  const error = useRouteError();
  console.error("Router Boundary Caught:", error);

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-[#1d1d1f]">
      <GlobalNav />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#fafafa] rounded-[16px] border border-[#e5e5e5] p-8 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-semibold text-black">Application Error</h1>
            <p className="text-sm text-[#737373]">
              Something unexpected happened. We've logged this issue.
            </p>
          </div>
          
          <div className="bg-[#171717] text-[#a3a3a3] p-4 rounded-[8px] text-[12px] font-mono text-left overflow-x-auto whitespace-pre">
            {error?.statusText || error?.message || "Unknown error occurred"}
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 border-t border-[#e5e5e5]">
            <Button variant="secondary" onClick={() => window.location.reload()}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reload Page
            </Button>
            <Link to="/">
              <Button variant="primary">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
