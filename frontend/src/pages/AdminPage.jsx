import React from 'react';
import { AlertTriangle, Shield, Zap, Activity, Clock, RefreshCw } from 'lucide-react';

export default function AdminPage({ mcpData }) {
  const { agents, logs, simulateHealing, refreshData, loading } = mcpData;

  const handleSimulateFailure = async () => {
    await simulateHealing();
  };

  const handleRefresh = () => {
    refreshData();
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Simulation Control Panel</h1>
            <p className="text-gray-400">Test and trigger self-healing behaviors on real MCP agents</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg font-semibold transition-all flex items-center space-x-2"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* System Status */}
            <div className="bg-gray-900/50 backdrop-blur border border-purple-500/30 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">MCP System Status</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4">
                  <div className="text-gray-300 text-sm mb-2">Total Agents</div>
                  <div className="text-3xl font-bold text-white">{agents.length}</div>
                </div>
                <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4">
                  <div className="text-gray-300 text-sm mb-2">Status</div>
                  <div className="inline-block px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
                    {agents.filter(a => a.status === 'active').length > 0 ? 'Ready' : 'Degraded'}
                  </div>
                </div>
                <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
                  <div className="text-gray-300 text-sm mb-2">Events Logged</div>
                  <div className="text-3xl font-bold text-white">{logs.length}</div>
                </div>
              </div>
            </div>

            {/* Agent List */}
            <div className="bg-gray-900/50 backdrop-blur border border-purple-500/30 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Connected MCP Agents</h2>
              <div className="space-y-3">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    className={`p-4 rounded-lg border ${
                      agent.status === 'active'
                        ? 'bg-green-900/20 border-green-500/30'
                        : agent.status === 'healing'
                        ? 'bg-yellow-900/20 border-yellow-500/30'
                        : 'bg-red-900/20 border-red-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            agent.status === 'active'
                              ? 'bg-green-500'
                              : agent.status === 'healing'
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                        ></div>
                        <div>
                          <div className="text-white font-semibold">{agent.name}</div>
                          <div className="text-gray-400 text-sm">{agent.role}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${
                          agent.status === 'active'
                            ? 'text-green-400'
                            : agent.status === 'healing'
                            ? 'text-yellow-400'
                            : 'text-red-400'
                        }`}>
                          {agent.status.toUpperCase()}
                        </div>
                        <div className="text-gray-500 text-xs">Last sync: {agent.lastSync}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulation Actions */}
            <div className="bg-gray-900/50 backdrop-blur border border-purple-500/30 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Simulation Actions</h2>

              {/* Simulate Self-Healing */}
              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-400 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">Simulate Self-Healing Workflow</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Triggers a random MCP agent failure and watches the autonomous healing process in real-time.
                      The system will detect the failure, initiate recovery protocols, and restore the agent.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleSimulateFailure}
                  disabled={loading || agents.filter(a => a.status === 'active').length === 0}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all flex items-center justify-center space-x-2"
                >
                  <Zap className="w-5 h-5" />
                  <span>{loading ? 'Processing...' : 'Trigger Self-Healing Simulation'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Simulation Log */}
          <div className="bg-gray-900/50 backdrop-blur border border-purple-500/30 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Real-Time MCP Log</h2>
              <span className="text-xs text-gray-500">{logs.length} events</span>
            </div>
            <div className="p-6 h-[700px] overflow-y-auto space-y-3">
              {logs.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="mb-2">No events logged yet</p>
                  <p className="text-sm">Trigger a simulation to see real-time MCP agent healing</p>
                </div>
              ) : (
                logs
                  .slice()
                  .reverse()
                  .map((log, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-lg border ${
                        log.type === 'error'
                          ? 'bg-red-900/20 border-red-500/30'
                          : log.type === 'warning'
                          ? 'bg-yellow-900/20 border-yellow-500/30'
                          : 'bg-green-900/20 border-green-500/30'
                      }`}
                    >
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