import React from 'react';

function SpendingChart() {
  // Dummy data for demonstration
  const categories = [
    { name: 'Food', percentage: 60, color: 'from-orange-400 to-red-500', icon: '🍔', comment: 'Because cooking is hard' },
    { name: 'Entertainment', percentage: 20, color: 'from-blue-400 to-indigo-500', icon: '🎮', comment: 'Netflix > Savings' },
    { name: 'Bills', percentage: 15, color: 'from-red-400 to-pink-500', icon: '💸', comment: 'Adulting, ugh' },
    { name: 'Shopping', percentage: 5, color: 'from-green-400 to-teal-500', icon: '🛍️', comment: 'Retail therapy' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl relative">
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-100 rounded-full opacity-50 blur-xl"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-100 rounded-full opacity-50 blur-xl"></div>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 px-6 py-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-5 left-5 w-20 h-20 rounded-full bg-white"></div>
          <div className="absolute bottom-5 right-10 w-16 h-16 rounded-full bg-white"></div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Your Money Black Holes</h2>
            <p className="text-green-100 text-sm mt-1">Where did it all go?</p>
          </div>
          <div className="text-3xl">📊</div>
        </div>
      </div>
      
      <div className="p-6">
        {/* Visual chart representation */}
        <div className="relative h-40 mb-6 bg-gray-100 rounded-lg overflow-hidden">
          <div className="flex h-full">
            {categories.map((category, index) => (
              <div 
                key={index}
                className={`h-full bg-gradient-to-r ${category.color}`}
                style={{ width: `${category.percentage}%` }}
                title={`${category.name}: ${category.percentage}%`}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Categories breakdown */}
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">{category.icon}</span>
                <span className="font-medium text-gray-800">{category.name}</span>
                <span className="ml-auto font-bold">{category.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className={`bg-gradient-to-r ${category.color} h-2 rounded-full`} 
                  style={{ width: `${category.percentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 italic">{category.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SpendingChart;