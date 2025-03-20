import React, { useState, useEffect } from 'react';
import { categoryInfo } from '../utils/roastGenerator';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filters, setFilters] = useState({
    category: 'All Categories',
    dateRange: 'All Time',
    minAmount: '',
    maxAmount: ''
  });

  // Load expenses from localStorage
  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    
    // Sort expenses by timestamp or ID (newest first)
    const sortedExpenses = storedExpenses.sort((a, b) => {
      // First try to sort by timestamp if available
      if (a.timestamp && b.timestamp) {
        return new Date(b.timestamp) - new Date(a.timestamp);
      }
      // Fall back to ID (which is typically a timestamp-based value)
      return b.id - a.id;
    });
    
    setExpenses(sortedExpenses);
    setFilteredExpenses(sortedExpenses);
  }, []);

  // Apply filters when they change
  useEffect(() => {
    let result = [...expenses];
    
    // Filter by category
    if (filters.category !== 'All Categories') {
      result = result.filter(expense => expense.category === filters.category);
    }
    
    // Filter by date range
    if (filters.dateRange !== 'All Time') {
      const now = new Date();
      let cutoffDate = new Date();
      
      switch (filters.dateRange) {
        case 'Last 7 Days':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'Last 30 Days':
          cutoffDate.setDate(now.getDate() - 30);
          break;
        case 'Last 90 Days':
          cutoffDate.setDate(now.getDate() - 90);
          break;
        case 'This Year':
          cutoffDate = new Date(now.getFullYear(), 0, 1);
          break;
        default:
          break;
      }
      
      result = result.filter(expense => new Date(expense.date) >= cutoffDate);
    }
    
    // Filter by min amount
    if (filters.minAmount) {
      result = result.filter(expense => parseFloat(expense.amount) >= parseFloat(filters.minAmount));
    }
    
    // Filter by max amount
    if (filters.maxAmount) {
      result = result.filter(expense => parseFloat(expense.amount) <= parseFloat(filters.maxAmount));
    }
    
    setFilteredExpenses(result);
  }, [filters, expenses]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: 'All Categories',
      dateRange: 'All Time',
      minAmount: '',
      maxAmount: ''
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get category display info
  const getCategoryInfo = (categoryKey) => {
    const info = categoryInfo[categoryKey] || { icon: '❓', description: 'Unknown' };
    return `${info.icon} ${categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)}`;
  };
  
  // Get roast level icon
  const getRoastLevelIcon = (expense) => {
    const intensity = expense.roastIntensity || 'medium';
    if (intensity === 'brutal') return '💀 Brutal';
    if (intensity === 'soft') return '🥲 Soft';
    return '🔥 Medium';
  };

  // Calculate total amount
  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-purple-600 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">Your Financial Journey</h2>
        <p className="text-purple-200 text-sm">Every questionable decision, documented</p>
      </div>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-gray-50 border-b border-gray-200">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option>All Categories</option>
            {Object.keys(categoryInfo).map(cat => (
              <option key={cat} value={cat}>{getCategoryInfo(cat)}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
          <select
            name="dateRange"
            value={filters.dateRange}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option>All Time</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Min Amount ($)</label>
          <input
            type="number"
            name="minAmount"
            value={filters.minAmount}
            onChange={handleFilterChange}
            placeholder="Min"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Max Amount ($)</label>
          <input
            type="number"
            name="maxAmount"
            value={filters.maxAmount}
            onChange={handleFilterChange}
            placeholder="Max"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      
      <div className="p-4 flex justify-end">
        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
        >
          Clear Filters
        </button>
      </div>
      
      {/* Expense Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Date <span className="text-xs">↓</span>
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Roast Level
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense, index) => (
              <tr 
                key={index} 
                className={`border-b border-gray-100 hover:bg-indigo-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className="py-3 px-4">{formatDate(expense.date)}</td>
                <td className="py-3 px-4">{getCategoryInfo(expense.category)}</td>
                <td className="py-3 px-4 font-medium">${parseFloat(expense.amount).toFixed(2)}</td>
                <td className="py-3 px-4 text-gray-600">{expense.note || '-'}</td>
                <td className="py-3 px-4 text-gray-600">{getRoastLevelIcon(expense)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Summary */}
      <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing {filteredExpenses.length} of {expenses.length} expenses
        </div>
        <div className="font-medium text-purple-700">
          Total: ${totalAmount.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default ExpenseList;