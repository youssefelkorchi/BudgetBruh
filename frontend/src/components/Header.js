import React from 'react';

function Header() {
  return (
    <header className="relative bg-gradient-to-r from-brand-700 to-brand-900 text-white py-8">
      {/* Abstract shapes in background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full"></div>
        <div className="absolute top-20 right-20 w-20 h-20 bg-white rounded-full"></div>
        <div className="absolute bottom-5 left-1/4 w-30 h-30 bg-white rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-2">
            <span className="text-5xl mr-3 animate-bounce-slow">💸</span>
            <h1 className="text-5xl font-extrabold tracking-tight">
              Budget <span className="text-brand-200">Bruh</span>
            </h1>
          </div>
          <p className="text-brand-200 text-lg font-light max-w-md text-center">
            The Roast Master of Your Wallet
          </p>
          
          <div className="mt-6 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
            <span className="text-brand-100">Making poor financial decisions look good since 2023</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;