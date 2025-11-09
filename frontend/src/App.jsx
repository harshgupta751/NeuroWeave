import React, { useState } from 'react';
import Navigation from '../src/components/commonNavigation.jsx';
import HomePage from './pages/HomePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AnalyticsPage from './pages/AnalyticsPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import { useMCPAgents } from './hooks/useMCPAgents';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  
  // Use MCP integration hook with auto-refresh every 5 seconds
  const mcpData = useMCPAgents(true, 5000);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} mcpData={mcpData} />;
      case 'dashboard':
        return <DashboardPage mcpData={mcpData} />;
      case 'analytics':
        return <AnalyticsPage mcpData={mcpData} />;
      case 'admin':
        return <AdminPage mcpData={mcpData} />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} mcpData={mcpData} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {/* Connection Status Indicator */}
      {!mcpData.isConnected && (
        <div className="fixed top-20 right-6 z-50 bg-red-500/20 border border-red-500 rounded-lg px-4 py-2 text-red-400 text-sm">
          ⚠️ MCP Agents Offline
        </div>
      )}
      {renderPage()}
    </div>
  );
}