import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import RoastSystem from './components/RoastSystem';
import SpendingChart from './components/SpendingChart';
import BruhMoment from './components/BruhMoment';
import './App.css';

function App() {
  const [showBruhMoment, setShowBruhMoment] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <Navigation />
      <main className="flex-grow p-4">
        <div className="container mx-auto">
          <RoastSystem />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Dashboard />
            <div>
              <ExpenseForm />
              <div className="mt-8">
                <SpendingChart />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BruhMoment 
        isVisible={showBruhMoment}
        message="$100 on coffee? Bruh, did you really need that caffeine IV drip? 💸"
        onClose={() => setShowBruhMoment(false)}
      />
    </div>
  );
}

export default App;
