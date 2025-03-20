import React from 'react';

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'expenses', label: 'Add Expense', icon: '💸' },
    { id: 'history', label: 'History', icon: '📝' },
    { id: 'stats', label: 'Statistics', icon: '📈' },
    { id: 'roast', label: 'Roast Me', icon: '🔥' }
  ];
  
  return (
    <nav className="bg-white shadow-md py-2 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-center md:justify-start space-x-1 md:space-x-4 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-purple-100 text-purple-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;