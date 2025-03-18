import React, { useState } from 'react';

function Navigation() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'expenses', label: 'Add Expense', icon: '💰' },
    { id: 'roast', label: 'Roast Me', icon: '🔥' },
    { id: 'insights', label: 'Insights', icon: '📈' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="flex -mb-px overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center px-6 py-4 text-sm font-medium transition-all duration-200 ease-in-out ${
                  activeTab === tab.id
                    ? 'text-brand-700 border-b-2 border-brand-600'
                    : 'text-gray-500 hover:text-brand-600 hover:border-b-2 hover:border-brand-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
                
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-400 to-brand-600"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;