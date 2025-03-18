import React from 'react';

function Dashboard() {
  // Dummy data for demonstration
  const totalSpent = 500;
  const lastExpenseDate = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000); // 3 days ago
  
  const recentExpenses = [
    { date: '2023-11-20', category: 'Food 🍔', amount: 50, roastLevel: '🔥 Medium' },
    { date: '2023-11-18', category: 'Entertainment 🎮', amount: 75, roastLevel: '💀 Brutal' },
    { date: '2023-11-15', category: 'Shopping 🛍️', amount: 120, roastLevel: '🥲 Soft' },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Spent Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-100 rounded-full opacity-50 blur-xl"></div>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-orange-600 px-6 py-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-5 left-5 w-20 h-20 rounded-full bg-white"></div>
            </div>
            
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Your Damage Report</h2>
              <div className="text-3xl">📊</div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="text-4xl font-bold text-gray-800 flex items-baseline">
              ${totalSpent}
              <span className="text-sm text-gray-500 ml-2">this month</span>
            </div>
            <p className="mt-3 text-gray-600 italic">
              Congrats, you're basically a millionaire... in debt!
            </p>
          </div>
        </div>

        {/* Procrastination Meter Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full opacity-50 blur-xl"></div>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-5 left-5 w-20 h-20 rounded-full bg-white"></div>
            </div>
            
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Procrastination Meter</h2>
              <div className="text-3xl">⏰</div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="text-lg font-medium text-gray-800">
              Last expense logged: <span className="font-bold">{lastExpenseDate.toLocaleDateString()}</span>
            </div>
            <div className="mt-3 flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-4 rounded-full" 
                  style={{ width: '75%' }}
                ></div>
              </div>
            </div>
            <p className="mt-3 text-gray-600 italic">
              Your wallet is filing for divorce!
            </p>
          </div>
        </div>
      </div>

      {/* Recent Expenses Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl relative">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-100 rounded-full opacity-50 blur-xl"></div>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 px-6 py-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-5 left-5 w-20 h-20 rounded-full bg-white"></div>
          </div>
          
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Recent Bad Decisions</h2>
            <div className="text-3xl">📝</div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Category</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Roast Level</th>
                </tr>
              </thead>
              <tbody>
                {recentExpenses.map((expense, index) => (
                  <tr 
                    key={index} 
                    className="border-b border-gray-200 hover:bg-purple-50 transition-colors duration-150"
                  >
                    <td className="py-3 px-4 text-gray-700">{expense.date}</td>
                    <td className="py-3 px-4 text-gray-700">{expense.category}</td>
                    <td className="py-3 px-4 text-gray-700">${expense.amount}</td>
                    <td className="py-3 px-4 text-gray-700">{expense.roastLevel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;