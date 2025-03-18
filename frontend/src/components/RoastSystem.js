import React, { useState } from 'react';

function RoastSystem() {
  const [intensity, setIntensity] = useState('medium');

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4 text-purple-600">Roast Settings 🔥</h2>
      <div className="flex items-center justify-center space-x-4">
        <button
          className={`px-4 py-2 rounded-full ${intensity === 'soft' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setIntensity('soft')}
        >
          🥲 Soft Roast
        </button>
        <button
          className={`px-4 py-2 rounded-full ${intensity === 'medium' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setIntensity('medium')}
        >
          🔥 Medium Roast
        </button>
        <button
          className={`px-4 py-2 rounded-full ${intensity === 'brutal' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setIntensity('brutal')}
        >
          💀 Brutal Roast
        </button>
      </div>
    </div>
  );
}

export default RoastSystem;