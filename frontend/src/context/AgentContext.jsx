import React, { createContext, useContext, useState } from 'react';

const AgentContext = createContext();

export const useAgents = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgents must be used within AgentProvider');
  }
  return context;
};

export const AgentProvider = ({ children }) => {
  const [agents, setAgents] = useState([
    { id: 1, name: 'Agent 1', role: 'Weather', status: 'active', x: 0.2, y: 0.3, lastSync: '2s ago' },
    { id: 2, name: 'Agent 2', role: 'Finance', status: 'active', x: 0.35, y: 0.5, lastSync: '1s ago' },
    { id: 3, name: 'Agent 3', role: 'Traffic', status: 'active', x: 0.5, y: 0.2, lastSync: '3s ago' },
    { id: 4, name: 'Agent 4', role: 'Analytics', status: 'active', x: 0.65, y: 0.6, lastSync: '2s ago' },
    { id: 5, name: 'Agent 5', role: 'Security', status: 'active', x: 0.5, y: 0.7, lastSync: '1s ago' },
    { id: 6, name: 'Agent 6', role: 'Database', status: 'active', x: 0.3, y: 0.8, lastSync: '4s ago' },
    { id: 7, name: 'Agent 7', role: 'API Gateway', status: 'active', x: 0.2, y: 0.6, lastSync: '2s ago' },
    { id: 8, name: 'Agent 8', role: 'Cache', status: 'active', x: 0.4, y: 0.4, lastSync: '1s ago' },
    { id: 9, name: 'Agent 9', role: 'ML Model', status: 'active', x: 0.6, y: 0.4, lastSync: '3s ago' },
    { id: 10, name: 'Agent 10', role: 'Monitoring', status: 'active', x: 0.7, y: 0.3, lastSync: '2s ago' },
    { id: 11, name: 'Agent 11', role: 'Logging', status: 'active', x: 0.5, y: 0.5, lastSync: '1s ago' },
    { id: 12, name: 'Agent 12', role: 'Backup', status: 'active', x: 0.4, y: 0.7, lastSync: '5s ago' },
  ]);

  const [selectedAgent, setSelectedAgent] = useState(null);

  const addAgent = () => {
    const newAgent = {
      id: agents.length + 1,
      name: `Agent ${agents.length + 1}`,
      role: 'New Service',
      status: 'active',
      x: Math.random() * 0.8 + 0.1,
      y: Math.random() * 0.8 + 0.1,
      lastSync: 'just now'
    };
    setAgents([...agents, newAgent]);
    return newAgent;
  };

  const updateAgent = (id, updates) => {
    setAgents(prev => prev.map(agent => 
      agent.id === id ? { ...agent, ...updates } : agent
    ));
  };

  const removeAgent = (id) => {
    setAgents(prev => prev.filter(agent => agent.id !== id));
  };

  const value = {
    agents,
    setAgents,
    selectedAgent,
    setSelectedAgent,
    addAgent,
    updateAgent,
    removeAgent
  };

  return (
    <AgentContext.Provider value={value}>
      {children}
    </AgentContext.Provider>
  );
};