import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

function ExpenseForm() {
  const [expense, setExpense] = useState({
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const categories = [
    { value: 'food', label: 'Food', icon: '🍔', color: 'from-orange-400 to-red-500' },
    { value: 'entertainment', label: 'Entertainment', icon: '🎮', color: 'from-blue-400 to-indigo-500' },
    { value: 'bills', label: 'Bills', icon: '💸', color: 'from-red-400 to-pink-500' },
    { value: 'shopping', label: 'Shopping', icon: '🛍️', color: 'from-green-400 to-teal-500' },
    { value: 'transport', label: 'Transport', icon: '🚗', color: 'from-yellow-400 to-amber-500' },
    { value: 'impulse', label: 'Impulse Buys', icon: '🤪', color: 'from-purple-400 to-violet-500' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form or show success message
    }, 1500);
  };

  if (isSubmitting) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl relative">
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-100 rounded-full opacity-50 blur-xl"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full opacity-50 blur-xl"></div>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 px-8 py-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-5 left-5 w-20 h-20 rounded-full bg-white"></div>
          <div className="absolute bottom-5 right-10 w-16 h-16 rounded-full bg-white"></div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Confess Your Spending</h2>
            <p className="text-purple-200 text-sm mt-1">We promise to judge... hilariously</p>
          </div>
          <div className="text-4xl animate-bounce">💸</div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 relative">
        <div className="space-y-8">
          {/* Amount Input with fun animation */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <span className="mr-2">How much damage?</span>
              <button 
                type="button" 
                className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full hover:bg-purple-200 transition-colors"
                onClick={() => setShowTip(!showTip)}
              >
                💡 Tip
              </button>
            </label>
            
            {showTip && (
              <div className="absolute right-0 top-0 mt-8 bg-purple-50 border border-purple-200 p-3 rounded-lg shadow-lg z-10 text-sm text-purple-700 max-w-xs animate-fade-in">
                The bigger the number, the spicier the roast! Are you brave enough?
                <div className="absolute -top-2 right-4 w-4 h-4 bg-purple-50 border-t border-l border-purple-200 transform rotate-45"></div>
              </div>
            )}
            
            <div className="relative mt-1 rounded-md shadow-sm group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm group-hover:text-purple-500 transition-colors">$</span>
              </div>
              <input
                type="number"
                value={expense.amount}
                onChange={(e) => setExpense({...expense, amount: e.target.value})}
                className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-lg py-4 transition-all duration-200 hover:border-purple-300"
                placeholder="How much did you waste this time?"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-400 sm:text-sm">USD</span>
              </div>
            </div>
          </div>
          
          {/* Category Selection with gradient cards */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">What's your excuse?</label>
            <div className="grid grid-cols-3 gap-4">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setExpense({...expense, category: cat.value})}
                  className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                    expense.category === cat.value
                      ? 'ring-4 ring-purple-500 ring-opacity-50 transform scale-105'
                      : 'hover:shadow-md'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-${expense.category === cat.value ? '100' : '80'}`}></div>
                  <div className="relative p-4 flex flex-col items-center justify-center h-24">
                    <span className="text-3xl mb-2">{cat.icon}</span>
                    <span className={`text-sm font-medium ${expense.category === cat.value ? 'text-white' : 'text-white text-opacity-90'}`}>
                      {cat.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Date Input with custom styling */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">When did this happen?</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">📅</span>
              </div>
              <input
                type="date"
                value={expense.date}
                onChange={(e) => setExpense({...expense, date: e.target.value})}
                className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-4 transition-all duration-200 hover:border-purple-300"
                required
              />
            </div>
          </div>
          
          {/* Note Input with character count */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Any regrets? (Optional)</label>
            <div className="relative">
              <textarea
                value={expense.note}
                onChange={(e) => setExpense({...expense, note: e.target.value})}
                rows="3"
                className="focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-lg transition-all duration-200 hover:border-purple-300"
                placeholder="Tell us the sad story behind this expense..."
              ></textarea>
              <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                {expense.note.length}/100
              </div>
            </div>
          </div>
          
          {/* Submit button with animation */}
          <button
            type="submit"
            className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl text-base font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="mr-2 text-xl">🔥</span>
            Roast Me For This Decision
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;