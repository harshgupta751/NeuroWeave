import React, { useState } from 'react';
import Navigation from '../src/components/commonNavigation.jsx';
import HomePage from './pages/HomePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AnalyticsPage from './pages/AnalyticsPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import { AgentProvider } from './context/AgentContext.jsx';
import { SimulationProvider } from './context/SimulationContext.jsx';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'dashboard':
        return <DashboardPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'admin':
        return <AdminPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <AgentProvider>
      <SimulationProvider>
        <div className="min-h-screen bg-black text-white">
          <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
          {renderPage()}
        </div>
      </SimulationProvider>
    </AgentProvider>
  );
}