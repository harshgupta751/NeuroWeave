import React, { createContext, useContext, useState } from 'react';
import { useAgents } from './AgentContext';

const SimulationContext = createContext();

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within SimulationProvider');
  }
  return context;
};

export const SimulationProvider = ({ children }) => {
  const { agents, setAgents } = useAgents();
  const [simulationLog, setSimulationLog] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const addLog = (message, type = 'info') => {
    const log = {
      time: new Date().toLocaleTimeString(),
      message,
      type
    };
    setSimulationLog(prev => [...prev, log]);
  };

  const triggerFailure = () => {
    const activeAgents = agents.filter(a => a.status === 'active');
    if (activeAgents.length === 0) return;

    const randomAgent = activeAgents[Math.floor(Math.random() * activeAgents.length)];
    
    setAgents(prev => prev.map(a => 
      a.id === randomAgent.id ? { ...a, status: 'failed' } : a
    ));
    
    addLog(`${randomAgent.name} failed - Initiating recovery protocol`, 'error');

    setTimeout(() => {
      setAgents(prev => prev.map(a => 
        a.id === randomAgent.id ? { ...a, status: 'healing' } : a
      ));
      addLog(`${randomAgent.name} healing in progress`, 'warning');

      setTimeout(() => {
        setAgents(prev => prev.map(a => 
          a.id === randomAgent.id ? { ...a, status: 'active' } : a
        ));
        addLog(`${randomAgent.name} recovered successfully`, 'success');
      }, 2000);
    }, 1000);
  };

  const forceHeal = () => {
    const failedAgents = agents.filter(a => a.status === 'failed' || a.status === 'healing');
    
    failedAgents.forEach(agent => {
      setAgents(prev => prev.map(a => 
        a.id === agent.id ? { ...a, status: 'active' } : a
      ));
      addLog(`${agent.name} force healed`, 'success');
    });
  };

  const clearLog = () => {
    setSimulationLog([]);
  };

  const value = {
    simulationLog,
    isRunning,
    setIsRunning,
    triggerFailure,
    forceHeal,
    addLog,
    clearLog
  };

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
};