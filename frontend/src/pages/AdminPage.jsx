import React from 'react';
import { AlertTriangle, Plus, Play, Shield, Zap, Activity, Clock } from 'lucide-react';
import { useAgents } from '../context/AgentContext';
import { useSimulation } from '../context/SimulationContext';

export default function AdminPage() {
  const { agents, addAgent } = useAgents();
  const { simulationLog, triggerFailure, forceHeal, addLog } = useSimulation();
  
  const handleAddAgent = () => {
    const newAgent = addAgent();
    addLog(`${newAgent.name} added to network`, 'success');
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Simulation Control Panel</h1>
          <p className="text-gray-400">Test and trigger self-healing behaviors manually</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* System Status */}
            <div className="bg-gray-900/50 backdrop-blur border border-purple-500/30 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">System Status</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4">
                  <div className="text-gray-300 text-sm mb-2">Total Agents</div>
                  <div className="text-3xl font-bold text-white">{agents.length}</div>
                </div>
                <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4">
                  <div className="text-gray-300 text-sm mb-2">Status</div>
                  <div className="inline-block px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">Ready</div>
                </div>
                <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
                  <div className="text-gray-300 text-sm mb-2">Simulations Run</div>
                  <div className="text-3xl font-bold text-white">{Math.floor(simulationLog.length / 3)}</div>
                </div>
              </div>
            </div>

            {/* Simulation Actions */}
            <div className="bg-gray-900/50 backdrop-blur border border-purple-500/30 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Simulation Actions</h2>
              
              {/* Simulate Agent Failure */}
              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 mb-4">
                <div className="flex items-start space-x-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-400 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">Simulate Agent Failure</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Randomly deactivate one agent to test the self-healing mechanism
                    </p>
                  </div>
                </div>
                <button 
                  onClick={triggerFailure}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center space-x-2"
                >
                  <Zap className="w-5 h-5" />
                  <span>Trigger Failure</span>
                </button>
              </div>

              {/* Add New Agent */}
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6 mb-4">
                <div className="flex items-start space-x-3 mb-4">
                  <Plus className="w-6 h-6 text-blue-400 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">Add New Agent</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Create and integrate a new agent into the network
                    </p>
                  </div>
                </div>
                <button 
                  onClick={handleAddAgent}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Agent</span>
                </button>
              </div>

              {/* Force Healing */}
              <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <Shield className="w-6 h-6 text-green-400 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">Force Healing</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Manually trigger the self-healing algorithm
                    </p>
                  </div>
                </div>
                <button 
                  onClick={forceHeal}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Force Heal</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Simulation Log */}
          <div className="bg-gray-900/50 backdrop-blur border border-purple-500/30 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white">Simulation Log</h2>
            </div>
            <div className="p-6 h-[600px] overflow-y-auto space-y-3">
              {simulationLog.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="mb-2">No simulations run yet</p>
                  <p className="text-sm">Trigger a failure to see the system heal itself</p>
                </div>
              ) : (
                simulationLog.slice().reverse().map((log, i) => (
                  <div key={i} className={`p-4 rounded-lg border ${
                    log.type === 'error' ? 'bg-red-900/20 border-red-500/30' :
                    log.type === 'warning' ? 'bg-yellow-900/20 border-yellow-500/30' :
                    'bg-green-900/20 border-green-500/30'
                  }`}>
                    <div className="flex items-start space-x-3">
                      {log.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />}
                      {log.type === 'warning' && <Clock className="w-5 h-5 text-yellow-400 mt-0.5" />}
                      {log.type === 'success' && <Shield className="w-5 h-5 text-green-400 mt-0.5" />}
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{log.message}</p>
                        <p className="text-gray-500 text-xs mt-1">{log.time}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}