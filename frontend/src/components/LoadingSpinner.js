import React from 'react';

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-24 h-24">
        <div className="absolute top-0 left-0 w-full h-full border-8 border-purple-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-8 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">💸</span>
        </div>
      </div>
      <p className="mt-4 text-purple-600 font-medium animate-pulse">Calculating your poor life choices...</p>
    </div>
  );
}

export default LoadingSpinner;