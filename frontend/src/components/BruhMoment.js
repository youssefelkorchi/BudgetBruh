import React from 'react';

function BruhMoment({ isVisible, message, onClose }) {
  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md transform transition-all duration-500 animate-bounce-slow">
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 relative">
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 text-white opacity-70 hover:opacity-100 transition-opacity"
          >
            ✕
          </button>
          
          <div className="flex items-start">
            <div className="text-4xl mr-3">😱</div>
            <div>
              <h3 className="font-bold text-xl text-white mb-1">BRUH MOMENT!</h3>
              <p className="text-white text-opacity-90">{message}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-10 px-6 py-2 text-right">
          <button
            onClick={onClose}
            className="text-sm text-white text-opacity-80 hover:text-opacity-100 transition-opacity"
          >
            I'll do better next time (no you won't)
          </button>
        </div>
      </div>
    </div>
  );
}

export default BruhMoment;