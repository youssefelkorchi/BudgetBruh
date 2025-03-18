import React from 'react';

function Footer() {
  const funnyQuotes = [
    "You're broke, but at least you're laughing!",
    "Saving money is like not eating cake. It's technically possible.",
    "Your wallet called. It's feeling lighter than your financial responsibility.",
    "Budget Bruh: Making poor financial decisions look good since 2023."
  ];
  
  // Get a random quote
  const randomQuote = funnyQuotes[Math.floor(Math.random() * funnyQuotes.length)];

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <span className="text-2xl mr-2">💸</span>
              <span className="font-bold text-lg">Budget Bruh</span>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400 italic">{randomQuote}</p>
            <p className="text-sm text-gray-500 mt-2">
              Made with 💔 for your wallet
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;