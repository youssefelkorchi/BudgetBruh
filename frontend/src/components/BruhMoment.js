import React, { useState, useEffect } from 'react';

const BruhMoment = ({ isVisible, message, onClose }) => {
  const [animation, setAnimation] = useState('translate-y-full');
  
  useEffect(() => {
    if (isVisible) {
      // Slide in animation
      setTimeout(() => setAnimation('translate-y-0'), 100);
      
      // Auto close after 8 seconds
      const timer = setTimeout(() => {
        setAnimation('translate-y-full');
        setTimeout(onClose, 500); // Call onClose after animation completes
      }, 8000);
      
      return () => clearTimeout(timer);
    } else {
      setAnimation('translate-y-full');
    }
  }, [isVisible, onClose]);
  
  if (!isVisible && animation === 'translate-y-full') return null;
  
  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-red-500 text-white p-6 shadow-lg transform transition-transform duration-500 ease-in-out ${animation} z-50`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-4xl mr-4">😱</span>
          <div>
            <h3 className="text-xl font-bold mb-1">BRUH MOMENT!</h3>
            <p className="text-white">{message}</p>
          </div>
        </div>
        <button 
          onClick={() => {
            setAnimation('translate-y-full');
            setTimeout(onClose, 500);
          }}
          className="bg-white text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition duration-300"
        >
          I Know, I Know
        </button>
      </div>
    </div>
  );
};

export default BruhMoment;