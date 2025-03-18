import React, { useState } from 'react';

function RoastSystem() {
  const [intensity, setIntensity] = useState('medium');

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl relative mb-8">
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-100 rounded-full opacity-50 blur-xl"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-100 rounded-full opacity-50 blur-xl"></div>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-red-600 px-6 py-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-5 left-5 w-20 h-20 rounded-full bg-white"></div>
          <div className="absolute bottom-5 right-10 w-16 h-16 rounded-full bg-white"></div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Roast Settings</h2>
            <p className="text-yellow-100 text-sm mt-1">How much heat can you handle?</p>
          </div>
          <div className="text-3xl animate-bounce">🔥</div>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 mb-4">
          Select your roast intensity level. The spicier the roast, the more it'll hurt your feelings (but in a funny way).
        </p>
        
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => setIntensity('soft')}
            className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
              intensity === 'soft'
                ? 'ring-4 ring-green-500 ring-opacity-50 transform scale-105'
                : 'hover:shadow-md'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 opacity-${intensity === 'soft' ? '100' : '80'}`}></div>
            <div className="relative p-4 flex flex-col items-center justify-center h-24">
              <span className="text-3xl mb-2">🥲</span>
              <span className={`text-sm font-medium ${intensity === 'soft' ? 'text-white' : 'text-white text-opacity-90'}`}>
                Soft Roast
              </span>
              <span className="text-xs text-white text-opacity-80 mt-1">
                "You're doing great...ish"
              </span>
            </div>
          </button>
          
          <button
            onClick={() => setIntensity('medium')}
            className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
              intensity === 'medium'
                ? 'ring-4 ring-orange-500 ring-opacity-50 transform scale-105'
                : 'hover:shadow-md'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 opacity-${intensity === 'medium' ? '100' : '80'}`}></div>
            <div className="relative p-4 flex flex-col items-center justify-center h-24">
              <span className="text-3xl mb-2">🔥</span>
              <span className={`text-sm font-medium ${intensity === 'medium' ? 'text-white' : 'text-white text-opacity-90'}`}>
                Medium Roast
              </span>
              <span className="text-xs text-white text-opacity-80 mt-1">
                "Bruh, you're pushing it"
              </span>
            </div>
          </button>
          
          <button
            onClick={() => setIntensity('brutal')}
            className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
              intensity === 'brutal'
                ? 'ring-4 ring-red-500 ring-opacity-50 transform scale-105'
                : 'hover:shadow-md'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 opacity-${intensity === 'brutal' ? '100' : '80'}`}></div>
            <div className="relative p-4 flex flex-col items-center justify-center h-24">
              <span className="text-3xl mb-2">💀</span>
              <span className={`text-sm font-medium ${intensity === 'brutal' ? 'text-white' : 'text-white text-opacity-90'}`}>
                Brutal Roast
              </span>
              <span className="text-xs text-white text-opacity-80 mt-1">
                "Your wallet is crying"
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoastSystem;