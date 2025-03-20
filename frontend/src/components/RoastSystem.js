import React, { useState, useEffect } from 'react';

const RoastSystem = () => {
  const [roastHistory, setRoastHistory] = useState([]);
  const [roastIntensity, setRoastIntensity] = useState(() => {
    // Get saved intensity from localStorage or default to medium
    return localStorage.getItem('roastIntensity') || 'medium';
  });
  
  useEffect(() => {
    // Save intensity preference to localStorage
    localStorage.setItem('roastIntensity', roastIntensity);
    
    // Load roast history from localStorage
    const savedRoasts = JSON.parse(localStorage.getItem('roastHistory') || '[]');
    setRoastHistory(savedRoasts);
  }, [roastIntensity]);
  
  // Listen for new roasts
  useEffect(() => {
    const handleNewRoast = (event) => {
      const { roast, timestamp, category } = event.detail;
      
      // Add new roast to history
      const newRoast = {
        text: roast,
        timestamp: timestamp || new Date().toISOString(),
        category: category || 'general'
      };
      
      setRoastHistory(prevRoasts => {
        const updatedRoasts = [newRoast, ...prevRoasts].slice(0, 10); // Keep only 10 most recent
        localStorage.setItem('roastHistory', JSON.stringify(updatedRoasts));
        return updatedRoasts;
      });
    };
    
    // Add event listener
    window.addEventListener('newRoast', handleNewRoast);
    
    // Cleanup
    return () => window.removeEventListener('newRoast', handleNewRoast);
  }, []);
  
  // Get color based on intensity
  const getIntensityColor = (intensity) => {
    switch(intensity) {
      case 'soft': return 'border-green-500 text-green-700 bg-green-50';
      case 'brutal': return 'border-red-500 text-red-700 bg-red-50';
      default: return 'border-orange-500 text-orange-700 bg-orange-50';
    }
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <h2 className="text-2xl font-bold text-purple-600 mb-4">Roast Intensity</h2>
      <p className="text-gray-600 mb-6">How badly do you want Budget Bruh to roast your spending habits?</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => setRoastIntensity('soft')}
          className={`p-4 rounded-xl border-2 transition-all ${
            roastIntensity === 'soft' 
              ? 'border-green-500 bg-green-50 shadow-md' 
              : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
          }`}
        >
          <div className="text-4xl mb-2">🥲</div>
          <h3 className="font-bold text-lg mb-1">Soft Roast</h3>
          <p className="text-sm text-gray-600">"You're doing great...ish."</p>
        </button>
        
        <button
          onClick={() => setRoastIntensity('medium')}
          className={`p-4 rounded-xl border-2 transition-all ${
            roastIntensity === 'medium' 
              ? 'border-orange-500 bg-orange-50 shadow-md' 
              : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
          }`}
        >
          <div className="text-4xl mb-2">🔥</div>
          <h3 className="font-bold text-lg mb-1">Medium Roast</h3>
          <p className="text-sm text-gray-600">"Bruh, you're pushing it."</p>
        </button>
        
        <button
          onClick={() => setRoastIntensity('brutal')}
          className={`p-4 rounded-xl border-2 transition-all ${
            roastIntensity === 'brutal' 
              ? 'border-red-500 bg-red-50 shadow-md' 
              : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
          }`}
        >
          <div className="text-4xl mb-2">💀</div>
          <h3 className="font-bold text-lg mb-1">Brutal Roast</h3>
          <p className="text-sm text-gray-600">"Your wallet is crying."</p>
        </button>
      </div>
      
      {roastHistory.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-purple-600 mb-4">Recent Roasts</h3>
          <div className="space-y-4">
            {roastHistory.map((roast, index) => (
              <div 
                key={index} 
                className={`border-l-4 pl-4 py-2 ${getIntensityColor(roast.intensity || roastIntensity)}`}
              >
                <p className="italic">{roast.text}</p>
                <p className="text-sm text-gray-500">
                  {new Date(roast.timestamp).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoastSystem;