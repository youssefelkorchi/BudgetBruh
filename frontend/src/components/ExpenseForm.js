import React, { useState, useEffect } from 'react';
import { generateRoast } from '../utils/roastGenerator';

function ExpenseForm() {
  // Update the initial state
  const [expense, setExpense] = useState({
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    note: ''
  });
  const [roastShown, setRoastShown] = useState(false);
  const [currentRoast, setCurrentRoast] = useState('');
  const [roastIntensity, setRoastIntensity] = useState('medium');

  const categories = [
    { value: 'food', label: 'Food & Drinks (Your Stomach\'s Demands)' },
    { value: 'entertainment', label: 'Entertainment (Your Happiness Tax)' },
    { value: 'shopping', label: 'Shopping (The "Needs")' },
    { value: 'bills', label: 'Bills (The Unavoidable Pain)' },
    { value: 'travel', label: 'Travel (Escaping Reality)' },
    { value: 'health', label: 'Health (Body Maintenance)' },
    { value: 'other', label: 'Other (The Mysterious Money Pit)' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense(prev => ({ ...prev, [name]: value }));
  };

  // Update the handleSubmit function to ensure the note is properly saved
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!expense.amount || !expense.category) {
      alert("Don't try to hide your spending! Fill out all required fields.");
      return;
    }
  
    // Parse amount as number
    const amountNum = parseFloat(expense.amount);
    
    // Create expense object with timestamp and roast intensity
    // In the handleSubmit function:
    const newExpense = {
      ...expense,
      amount: amountNum,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      roastIntensity: roastIntensity // Make sure this line exists
    };
  
    // Get existing expenses from localStorage
    const existingExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    
    // Add new expense
    const updatedExpenses = [...existingExpenses, newExpense];
    
    // Save to localStorage
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  
    // Dispatch event to notify other components
    const expenseAddedEvent = new CustomEvent('expenseAdded', { 
      detail: { expense: newExpense } 
    });
    window.dispatchEvent(expenseAddedEvent);
    
    // Generate and show roast
    const roast = generateRoast(newExpense.category, amountNum, roastIntensity);
    setCurrentRoast(roast);
    setRoastShown(true);
  
    // Check for Bruh Moment (large expense)
    if (amountNum >= 100) {
      // Trigger Bruh Moment alert via custom event
      const bruhEvent = new CustomEvent('bruhMoment', { 
        detail: { 
          expense: newExpense,
          message: `$${amountNum} on ${newExpense.category}? Bruh, did you really need that? 💸`
        } 
      });
      window.dispatchEvent(bruhEvent);
    }
  
    // Reset form
    setExpense({
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      note: ''
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-purple-600 mb-4">Confess Your Financial Sins</h2>
        <p className="text-gray-600 mb-6">Let's see how much damage you've done to your wallet today.</p>
        
        {/* Roast Intensity Selector */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Roast Intensity:</label>
          <div className="flex space-x-4">
            <button 
              type="button"
              onClick={() => setRoastIntensity('soft')}
              className={`px-4 py-2 rounded-lg flex items-center ${roastIntensity === 'soft' 
                ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                : 'bg-gray-100 text-gray-700'}`}
            >
              <span className="text-xl mr-2">🥲</span> Soft Roast
            </button>
            <button 
              type="button"
              onClick={() => setRoastIntensity('medium')}
              className={`px-4 py-2 rounded-lg flex items-center ${roastIntensity === 'medium' 
                ? 'bg-orange-100 text-orange-800 border-2 border-orange-300' 
                : 'bg-gray-100 text-gray-700'}`}
            >
              <span className="text-xl mr-2">🔥</span> Medium Roast
            </button>
            <button 
              type="button"
              onClick={() => setRoastIntensity('brutal')}
              className={`px-4 py-2 rounded-lg flex items-center ${roastIntensity === 'brutal' 
                ? 'bg-red-100 text-red-800 border-2 border-red-300' 
                : 'bg-gray-100 text-gray-700'}`}
            >
              <span className="text-xl mr-2">💀</span> Brutal Roast
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="amount">
              Amount:
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <input
                type="number"
                id="amount"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
                placeholder="How much did you waste this time?"
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                step="0.01"
                min="0"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="category">
              Category:
            </label>
            <select
              id="category"
              name="category"
              value={expense.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">Select your financial downfall...</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="date">
              Date of Damage:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={expense.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="note">
              Note (Optional):
            </label>
            <textarea
              id="note"
              name="note"
              value={expense.note}
              onChange={handleChange}
              placeholder="What's your excuse for this expense?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-24"
              rows="3"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition duration-300 font-medium text-lg"
          >
            Confess Your Spending Sins
          </button>
        </form>
      </div>
      
      {/* Roast Display */}
      {roastShown && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-2xl">😂</span>
            </div>
            <div className="ml-3">
              <p className="text-yellow-700 font-medium">{currentRoast}</p>
              <button 
                onClick={() => setRoastShown(false)} 
                className="text-sm text-yellow-600 hover:text-yellow-800 mt-2"
              >
                Hide (but you can't hide from the truth)
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Expense List Preview */}
      <ExpenseListPreview />
    </div>
  );
}

// Simple preview of recent expenses
// Update the ExpenseListPreview component

const ExpenseListPreview = () => {
  const [recentExpenses, setRecentExpenses] = useState([]);
  
  useEffect(() => {
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    setRecentExpenses(expenses.slice(-3).reverse()); // Get last 3 expenses
  }, []);
  
  if (recentExpenses.length === 0) return null;
  
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h3 className="text-xl font-bold text-purple-600 mb-4">Your Recent Bad Decisions</h3>
      <div className="space-y-4">
        {recentExpenses.map(exp => (
          <div key={exp.id} className="border-l-4 border-purple-400 pl-4 py-2">
            <div className="flex justify-between">
              <p className="font-medium">${parseFloat(exp.amount).toFixed(2)} - {exp.category}</p>
              <p className="text-gray-500">{new Date(exp.date).toLocaleDateString()}</p>
            </div>
            {exp.note && <p className="text-gray-600 text-sm mt-1">{exp.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseForm;