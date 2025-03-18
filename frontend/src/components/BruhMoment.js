import React from 'react';

function BruhMoment({ isVisible, message, onClose }) {
  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg animate-bounce">
      <div className="flex items-center">
        <span className="text-2xl mr-2">😱</span>
        <div>
          <h3 className="font-bold">BRUH MOMENT!</h3>
          <p>{message}</p>
        </div>
        <button onClick={onClose} className="ml-4 text-white hover:text-red-200">
          ✕
        </button>
      </div>
    </div>
  );
}

export default BruhMoment;