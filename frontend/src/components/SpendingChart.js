import React from 'react';

function SpendingChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-purple-600">Your Money Black Holes 📊</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Placeholder for actual chart */}
        <div className="h-40 bg-purple-100 rounded-lg flex items-center justify-center">
          <span className="text-purple-600">Food: 60% (Because cooking is hard)</span>
        </div>
        <div className="h-40 bg-blue-100 rounded-lg flex items-center justify-center">
          <span className="text-blue-600">Entertainment: 30% (Netflix {'>'} Savings)</span>
        </div>
        <div className="h-40 bg-green-100 rounded-lg flex items-center justify-center">
          <span className="text-green-600">Bills: 5% (Adulting, ugh)</span>
        </div>
        <div className="h-40 bg-red-100 rounded-lg flex items-center justify-center">
          <span className="text-red-600">Impulse Buys: 5% (Oops)</span>
        </div>
      </div>
    </div>
  );
}

export default SpendingChart;