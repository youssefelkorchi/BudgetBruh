import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import RoastSystem from './components/RoastSystem';
import SpendingChart from './components/SpendingChart';
import ExpenseList from './components/ExpenseList';
import SpendingStats from './components/SpendingStats';
import BruhMoment from './components/BruhMoment';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bruhMoment, setBruhMoment] = useState({
    visible: false,
    message: ''
  });
  
  // Listen for bruh moment events
  useEffect(() => {
    const handleBruhMoment = (event) => {
      setBruhMoment({
        visible: true,
        message: event.detail.message
      });
    };
    
    window.addEventListener('bruhMoment', handleBruhMoment);
    
    return () => {
      window.removeEventListener('bruhMoment', handleBruhMoment);
    };
  }, []);
  
  // For demo purposes, trigger a bruh moment after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!localStorage.getItem('demoShown')) {
        setBruhMoment({
          visible: true,
          message: "Welcome to Budget Bruh! This is what a Bruh Moment looks like when you spend too much. Try not to see this too often! 💸"
        });
        localStorage.setItem('demoShown', 'true');
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Dashboard />
            <SpendingChart />
          </div>
        );
      case 'expenses':
        return <ExpenseForm />;
      case 'history':
        return <ExpenseList />;
      case 'stats':
        return <SpendingStats />;
      case 'roast':
        return <RoastSystem />;
      default:
        return <Dashboard />;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        {renderTabContent()}
      </main>
      
      <Footer />
      
      <BruhMoment 
        isVisible={bruhMoment.visible} 
        message={bruhMoment.message} 
        onClose={() => setBruhMoment({ visible: false, message: '' })} 
      />
    </div>
  );
}

export default App;
