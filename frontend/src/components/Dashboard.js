import React from 'react';

function Dashboard() {
  // Dummy data for demonstration
  const totalSpent = 500;
  const lastExpenseDate = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000); // 3 days ago

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-purple-600">Your Damage Report 📊</h2>
        <div className="text-3xl font-bold text-gray-700">
          ${totalSpent}
          <span className="block text-sm text-gray-500 mt-2">
            Congrats, you're basically a millionaire... in debt!
          </span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-purple-600">Procrastination Meter ⏰</h2>
        <div className="text-lg text-gray-700">
          Last expense logged: {lastExpenseDate.toLocaleDateString()}
          <span className="block text-sm text-gray-500 mt-2">
            Your wallet is filing for divorce!
          </span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg md:col-span-2">
        <h2 className="text-2xl font-bold mb-4 text-purple-600">Recent Bad Decisions 📝</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2">
                <th className="p-2">Date</th>
                <th className="p-2">Category</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Roast Level</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-2">2023-11-20</td>
                <td className="p-2">Food 🍔</td>
                <td className="p-2">$50</td>
                <td className="p-2">🔥 Medium</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;