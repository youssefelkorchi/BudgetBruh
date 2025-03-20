// Utility functions for expense management

// Get all expenses from localStorage
export const getExpenses = () => {
  return JSON.parse(localStorage.getItem('expenses') || '[]');
};

// Save expenses to localStorage
export const saveExpenses = (expenses) => {
  localStorage.setItem('expenses', JSON.stringify(expenses));
};

// Add a new expense
export const addExpense = (expense) => {
  const expenses = getExpenses();
  
  // Add timestamp for sorting and ensure note field exists
  const newExpense = {
    ...expense,
    id: Date.now().toString(), // Unique ID
    timestamp: new Date().toISOString(),
    note: expense.note || '' // Ensure note field exists
  };
  
  expenses.push(newExpense);
  saveExpenses(expenses);
  
  // Check if this is a large expense that should trigger a bruh moment
  if (parseFloat(expense.amount) >= 100) {
    // Dispatch a custom event for the bruh moment
    const bruhEvent = new CustomEvent('bruhMoment', {
      detail: {
        message: `Bruh! You just spent $${expense.amount} on ${expense.category}. That's a lot of money!`
      }
    });
    window.dispatchEvent(bruhEvent);
  }
  
  return newExpense;
};

// Delete an expense
export const deleteExpense = (expenseId) => {
  const expenses = getExpenses();
  const updatedExpenses = expenses.filter(expense => expense.id !== expenseId);
  saveExpenses(updatedExpenses);
  return updatedExpenses;
};

// Get total spent
export const getTotalSpent = (timeRange = 'all') => {
  const expenses = getExpenses();
  
  if (timeRange === 'all') {
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  }
  
  const now = new Date();
  const cutoffDate = new Date();
  
  switch (timeRange) {
    case 'week':
      cutoffDate.setDate(now.getDate() - 7);
      break;
    case 'month':
      cutoffDate.setMonth(now.getMonth() - 1);
      break;
    case 'year':
      cutoffDate.setFullYear(now.getFullYear() - 1);
      break;
    default:
      break;
  }
  
  return expenses
    .filter(expense => new Date(expense.date) >= cutoffDate)
    .reduce((total, expense) => total + parseFloat(expense.amount), 0);
};

// Get days since last expense
export const getDaysSinceLastExpense = () => {
  const expenses = getExpenses();
  
  if (expenses.length === 0) {
    return 0;
  }
  
  // Sort expenses by date (newest first)
  const sortedExpenses = [...expenses].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
  
  const lastExpenseDate = new Date(sortedExpenses[0].date);
  const today = new Date();
  
  // Calculate difference in days
  const diffTime = Math.abs(today - lastExpenseDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

// Get expenses by category
export const getExpensesByCategory = (timeRange = 'all') => {
  const expenses = getExpenses();
  const categoryTotals = {};
  
  let filteredExpenses = expenses;
  
  if (timeRange !== 'all') {
    const now = new Date();
    const cutoffDate = new Date();
    
    switch (timeRange) {
      case 'week':
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        break;
    }
    
    filteredExpenses = expenses.filter(expense => 
      new Date(expense.date) >= cutoffDate
    );
  }
  
  filteredExpenses.forEach(expense => {
    const category = expense.category;
    if (!categoryTotals[category]) {
      categoryTotals[category] = 0;
    }
    categoryTotals[category] += parseFloat(expense.amount);
  });
  
  return categoryTotals;
};

// Create a named object for the default export
const expenseUtils = {
  getExpenses,
  saveExpenses,
  addExpense,
  deleteExpense,
  getTotalSpent,
  getDaysSinceLastExpense,
  getExpensesByCategory
};

// Export the named object
export default expenseUtils;