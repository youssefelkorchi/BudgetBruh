import React, { useState, useEffect } from 'react';
import { categoryInfo, generateTotalSpendingSummary } from '../utils/roastGenerator';

function SpendingStats() {
  const [expenses, setExpenses] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    averagePerDay: 0,
    averagePerCategory: {},
    categoryTotals: {},
    highestCategory: { name: '', amount: 0 },
    lowestCategory: { name: '', amount: 0 },
    largestExpense: { amount: 0, category: '', date: '' },
    expensesByDay: {},
    expensesByMonth: {}
  });
  const [timeRange, setTimeRange] = useState('month'); // 'week', 'month', 'year', 'all'
  
  // Load expenses from localStorage
  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    setExpenses(storedExpenses);
  }, []);
  
  // Calculate statistics based on time range
  useEffect(() => {
    if (expenses.length === 0) return;
    
    // Filter expenses based on time range
    const now = new Date();
    let filteredExpenses = [...expenses];
    
    if (timeRange !== 'all') {
      const cutoffDate = new Date();
      if (timeRange === 'week') {
        cutoffDate.setDate(now.getDate() - 7);
      } else if (timeRange === 'month') {
        cutoffDate.setMonth(now.getMonth() - 1);
      } else if (timeRange === 'year') {
        cutoffDate.setFullYear(now.getFullYear() - 1);
      }
      
      filteredExpenses = expenses.filter(expense => 
        new Date(expense.date) >= cutoffDate
      );
    }
    
    // Calculate total spent
    const total = filteredExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    
    // Calculate category totals
    const categoryTotals = {};
    filteredExpenses.forEach(expense => {
      const category = expense.category;
      if (!categoryTotals[category]) {
        categoryTotals[category] = 0;
      }
      categoryTotals[category] += parseFloat(expense.amount);
    });
    
    // Find highest and lowest spending categories
    let highestCategory = { name: '', amount: 0 };
    let lowestCategory = { name: '', amount: Number.MAX_VALUE };
    
    Object.entries(categoryTotals).forEach(([category, amount]) => {
      if (amount > highestCategory.amount) {
        highestCategory = { name: category, amount };
      }
      if (amount < lowestCategory.amount) {
        lowestCategory = { name: category, amount };
      }
    });
    
    // If no expenses, reset lowest category
    if (Object.keys(categoryTotals).length === 0) {
      lowestCategory = { name: '', amount: 0 };
    }
    
    // Find largest single expense
    let largestExpense = { amount: 0, category: '', date: '' };
    filteredExpenses.forEach(expense => {
      const amount = parseFloat(expense.amount);
      if (amount > largestExpense.amount) {
        largestExpense = {
          amount,
          category: expense.category,
          date: expense.date
        };
      }
    });
    
    // Calculate average per day
    const dateSet = new Set(filteredExpenses.map(expense => expense.date.split('T')[0]));
    const uniqueDays = dateSet.size;
    const averagePerDay = uniqueDays > 0 ? total / uniqueDays : 0;
    
    // Calculate average per category
    const averagePerCategory = {};
    Object.entries(categoryTotals).forEach(([category, amount]) => {
      const categoryExpenses = filteredExpenses.filter(expense => expense.category === category);
      const categoryDays = new Set(categoryExpenses.map(expense => expense.date.split('T')[0])).size;
      averagePerCategory[category] = categoryDays > 0 ? amount / categoryDays : 0;
    });
    
    // Group expenses by day
    const expensesByDay = {};
    filteredExpenses.forEach(expense => {
      const day = expense.date.split('T')[0];
      if (!expensesByDay[day]) {
        expensesByDay[day] = 0;
      }
      expensesByDay[day] += parseFloat(expense.amount);
    });
    
    // Group expenses by month
    const expensesByMonth = {};
    filteredExpenses.forEach(expense => {
      const date = new Date(expense.date);
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!expensesByMonth[month]) {
        expensesByMonth[month] = 0;
      }
      expensesByMonth[month] += parseFloat(expense.amount);
    });
    
    // Update stats
    setStats({
      total,
      averagePerDay,
      averagePerCategory,
      categoryTotals,
      highestCategory,
      lowestCategory,
      largestExpense,
      expensesByDay,
      expensesByMonth
    });
  }, [expenses, timeRange]);
  
  // Format currency
  const formatCurrency = (amount) => {
    return `$${parseFloat(amount).toFixed(2)}`;
  };
  
  // Get category display info
  const getCategoryDisplay = (categoryKey) => {
    if (!categoryKey) return '';
    const info = categoryInfo[categoryKey] || { icon: '❓', description: 'Unknown' };
    return `${info.icon} ${categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)}`;
  };
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Get funny summary based on stats
  const getFunnySummary = () => {
    if (stats.total === 0) return "No expenses yet. Your wallet is suspiciously happy.";
    
    // Get a random roast based on the total amount
    return generateTotalSpendingSummary(stats.total.toFixed(0));
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Spending Statistics</h2>
            <p className="text-purple-200 text-sm mt-1">The numbers don't lie (but they do judge)</p>
          </div>
          <div className="text-3xl">📊</div>
        </div>
      </div>
      
      {/* Time range selector */}
      <div className="bg-purple-50 px-6 py-3 border-b border-purple-100">
        <div className="flex items-center justify-between">
          <div className="text-sm text-purple-700 font-medium">Time Range:</div>
          <div className="flex space-x-2">
            {['week', 'month', 'year', 'all'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-full text-sm ${
                  timeRange === range 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main stats */}
      <div className="p-6">
        {expenses.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">💰</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No expenses tracked yet</h3>
            <p className="text-gray-500">
              Start tracking your expenses to see your spending statistics.
              <br />Your wallet will thank you (eventually).
            </p>
          </div>
        ) : (
          <>
            {/* Funny summary */}
            <div className="mb-8 text-center">
              <p className="text-xl font-medium text-purple-700">{getFunnySummary()}</p>
            </div>
            
            {/* Stats grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Total spent */}
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                <div className="text-sm text-purple-700 mb-1">Total Spent</div>
                <div className="text-2xl font-bold text-purple-900">{formatCurrency(stats.total)}</div>
                <div className="text-xs text-purple-600 mt-1">
                  {timeRange === 'all' ? 'All time' : `Last ${timeRange}`}
                </div>
              </div>
              
              {/* Average per day */}
              <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                <div className="text-sm text-indigo-700 mb-1">Daily Average</div>
                <div className="text-2xl font-bold text-indigo-900">{formatCurrency(stats.averagePerDay)}</div>
                <div className="text-xs text-indigo-600 mt-1">
                  That's {formatCurrency(stats.averagePerDay * 30)} per month
                </div>
              </div>
              
              {/* Largest expense */}
              <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
                <div className="text-sm text-pink-700 mb-1">Largest Expense</div>
                <div className="text-2xl font-bold text-pink-900">{formatCurrency(stats.largestExpense.amount)}</div>
                <div className="text-xs text-pink-600 mt-1">
                  {getCategoryDisplay(stats.largestExpense.category)} on {formatDate(stats.largestExpense.date)}
                </div>
              </div>
              
              {/* Highest category */}
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                <div className="text-sm text-orange-700 mb-1">Highest Category</div>
                <div className="text-2xl font-bold text-orange-900">
                  {getCategoryDisplay(stats.highestCategory.name)}
                </div>
                <div className="text-xs text-orange-600 mt-1">
                  {formatCurrency(stats.highestCategory.amount)} total
                </div>
              </div>
              
              {/* Lowest category */}
              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <div className="text-sm text-green-700 mb-1">Lowest Category</div>
                <div className="text-2xl font-bold text-green-900">
                  {getCategoryDisplay(stats.lowestCategory.name)}
                </div>
                <div className="text-xs text-green-600 mt-1">
                  {formatCurrency(stats.lowestCategory.amount)} total
                </div>
              </div>
              
              {/* Number of expenses */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="text-sm text-blue-700 mb-1">Number of Expenses</div>
                <div className="text-2xl font-bold text-blue-900">{expenses.length}</div>
                <div className="text-xs text-blue-600 mt-1">
                  That's a lot of spending decisions
                </div>
              </div>
            </div>
            
            {/* Category breakdown */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Category Breakdown</h3>
              <div className="space-y-3">
                {Object.entries(stats.categoryTotals).sort((a, b) => b[1] - a[1]).map(([category, amount]) => {
                  const percentage = (amount / stats.total) * 100;
                  return (
                    <div key={category} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <div className="font-medium">{getCategoryDisplay(category)}</div>
                        <div className="text-gray-700">{formatCurrency(amount)} ({percentage.toFixed(1)}%)</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SpendingStats;