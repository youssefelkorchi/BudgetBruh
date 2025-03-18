import React, { useState, useEffect } from 'react';
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
  const [activeTab, setActiveTab] = useState('dashboard');

  // Simulate a Bruh Moment after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBruhMoment(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Render content based on active tab
  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <>
            <RoastSystem />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <Dashboard />
              <div className="space-y-8">
                <SpendingChart />
              </div>
            </div>
          </>
        );
      case 'expenses':
        return <ExpenseForm />;
      case 'roast':
        return (
          <div className="max-w-2xl mx-auto">
            <RoastSystem />
            <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">Roast History</h2>
              <p className="text-gray-600">Your past financial decisions and the burns that came with them.</p>
              {/* Placeholder for roast history */}
              <div className="mt-6 space-y-4">
                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <p className="italic text-gray-700">"$50 on food? Are you feeding a small country?"</p>
                  <p className="text-sm text-gray-500">November 20, 2023</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4 py-2">
                  <p className="italic text-gray-700">"Another streaming service? You're collecting them like Pokémon."</p>
                  <p className="text-sm text-gray-500">November 18, 2023</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'stats':
        return (
          <div className="space-y-8">
            <SpendingChart />
            <Dashboard />
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto">
          {renderContent()}
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
