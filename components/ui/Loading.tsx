import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        {/* Jewelry-inspired loading spinner */}
        <div className="relative h-20 w-20 mb-6">
          {/* Outer ring - represents a jewelry ring */}
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          
          {/* Spinning diamond effect */}
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-amber-500 border-t-transparent border-r-transparent"></div>
          
          {/* Diamond facets effect */}
          <div className="absolute inset-4 animate-spin rounded-full border-2 border-amber-300 border-t-transparent border-l-transparent" 
               style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
          
          {/* Center diamond point */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-2 w-2 rotate-45 bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg"></div>
          </div>
          
          {/* Small diamond accents */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2">
            <div className="h-1 w-1 rotate-45 bg-amber-400 animate-pulse"></div>
          </div>
          <div className="absolute -right-1 top-1/2 -translate-y-1/2">
            <div className="h-1 w-1 rotate-45 bg-amber-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
            <div className="h-1 w-1 rotate-45 bg-amber-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <div className="absolute -left-1 top-1/2 -translate-y-1/2">
            <div className="h-1 w-1 rotate-45 bg-amber-400 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
          </div>
        </div>
        
        {/* Brand and loading text */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-gray-900 tracking-widest animate-pulse">
              SIYANA
            </h3>
            <span className="text-amber-600 font-bold">✦</span>
          </div>
          
          <p className="text-sm font-medium text-amber-800 tracking-widest uppercase">
            GOLD & DIAMONDS
          </p>
          
          {/* Simple loading dots */}
          <div className="flex items-center gap-1 mt-4">
            <div className="h-2 w-2 rounded-full bg-amber-500 animate-bounce"></div>
            <div className="h-2 w-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="h-2 w-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;