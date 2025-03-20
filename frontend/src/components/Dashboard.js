import React, { useState, useEffect } from 'react';
import { categoryInfo } from '../utils/roastGenerator';

function Dashboard() {
  // State for data
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [lastExpenseDate, setLastExpenseDate] = useState(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000));
  
  // Load expenses from localStorage
  useEffect(() => {
    const loadExpenseData = () => {
      const allExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
      
      // Sort by timestamp or id (newest first)
      const sortedExpenses = allExpenses.sort((a, b) => {
        if (a.timestamp && b.timestamp) {
          return new Date(b.timestamp) - new Date(a.timestamp);
        }
        return b.id - a.id;
      });
      
      // Get only the 3 most recent expenses
      setRecentExpenses(sortedExpenses.slice(0, 3));
      
      // Set last expense date if there are any expenses
      if (sortedExpenses.length > 0) {
        setLastExpenseDate(new Date(sortedExpenses[0].date));
      }
      
      // Calculate total spent in the last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const recentTotal = allExpenses
        .filter(exp => new Date(exp.date) >= thirtyDaysAgo)
        .reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
      
      setTotalSpent(recentTotal);
    };
    
    // Load expenses initially
    loadExpenseData();
    
    // Set up event listener for new expenses
    const handleExpenseAdded = () => loadExpenseData();
    window.addEventListener('expenseAdded', handleExpenseAdded);
    
    // Clean up
    return () => {
      window.removeEventListener('expenseAdded', handleExpenseAdded);
    };
  }, []);
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Get category with icon
  const getCategoryWithIcon = (category) => {
    const info = categoryInfo[category] || { icon: '❓' };
    return `${info.icon} ${category.charAt(0).toUpperCase() + category.slice(1)}`;
  };
  
  // Get roast level based on intensity
  const getRoastLevel = (expense) => {
    // Check for roastIntensity property directly
    const intensity = expense.roastIntensity;
    
    // Return appropriate icon based on intensity
    if (intensity === 'brutal') return '💀 Brutal';
    if (intensity === 'soft') return '🥲 Soft';
    return '🔥 Medium';
  };

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
              ${totalSpent.toFixed(2)}
              <span className="text-sm text-gray-500 ml-2">last 30 days</span>
            </div>
            <p className="mt-3 text-gray-600 italic">
              {totalSpent > 1000 
                ? "Congrats, you're basically a millionaire... in debt!" 
                : totalSpent > 500 
                  ? "Your wallet is crying in the corner right now."
                  : totalSpent > 0 
                    ? "Not too shabby, but there's still room for improvement."
                    : "No expenses? Either you're incredibly frugal or you're hiding something."}
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
                {recentExpenses.length > 0 ? (
                  recentExpenses.map((expense, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-gray-200 hover:bg-purple-50 transition-colors duration-150"
                    >
                      <td className="py-3 px-4 text-gray-700">{formatDate(expense.date)}</td>
                      <td className="py-3 px-4 text-gray-700">{getCategoryWithIcon(expense.category)}</td>
                      <td className="py-3 px-4 text-gray-700">${parseFloat(expense.amount).toFixed(2)}</td>
                      <td className="py-3 px-4 text-gray-700">{getRoastLevel(expense)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-6 text-center text-gray-500">
                      No expenses yet. Add some questionable financial decisions!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;