import React, { useState } from 'react';
import { Activity, AlertTriangle, Clock, Zap, Brain } from 'lucide-react';
import AgentNetwork from '../components/AgentNetwork';

export default function DashboardPage({ mcpData }) {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const { agents, analytics, logs, loading, isConnected } = mcpData;

  if (loading && agents.length === 0) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading MCP Agents...</p>
        </div>
      </div>
    );
  }

  const activeAgents = agents.filter(a => a.status === 'active').length;
  const failedAgents = agents.filter(a => a.status === 'failed').length;
  const healingAgents = agents.filter(a => a.status === 'healing').length;

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Zap className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">Neural Network Monitor</h1>
            <Zap className="w-8 h-8 text-cyan-400" />
            {isConnected && (
              <span className="ml-4 px-3 py-1 bg-green-500/20 border border-green-500 rounded-full text-green-400 text-sm">
                🟢 Live MCP Data
              </span>
            )}
          </div>
          <p className="text-gray-400">Real-time visualization of the self-healing MCP agent network</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-300">Total Agents</span>
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-4xl font-bold text-white">{agents.length}</div>
          </div>
          <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 backdrop-blur border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-300">Active</span>
              <Activity className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-4xl font-bold text-white">{activeAgents}</div>
            <div className="text-sm text-green-400 mt-1">
              {analytics ? `${analytics.uptime}%` : '100%'} operational
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 backdrop-blur border border-red-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-300">Failed / Healing</span>
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div className="text-4xl font-bold text-white">{failedAgents} / {healingAgents}</div>
            <div className="text-sm text-gray-400 mt-1">
              {failedAgents === 0 && healingAgents === 0 ? 'All systems stable' : 'Recovery in progress'}
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur border border-blue-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-300">Recovery Time</span>
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-4xl font-bold text-white">
              {analytics ? `${analytics.avgRecoveryTime}s` : '2.8s'}
            </div>
            <div className="text-sm text-gray-400 mt-1">Average response</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Network Visualization */}
          <div className="lg:col-span-2 bg-gray-900/50 backdrop-blur border border-purple-500/30 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Brain className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">MCP Agent Network</h2>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm">Live</span>
              </div>
            </div>
            <div className="h-[500px] bg-gradient-to-br from-gray-900 to-black relative">
              <AgentNetwork agents={agents} onAgentClick={setSelectedAgent} />
              <div className="absolute bottom-6 left-6 flex items-center space-x-4 bg-gray-900/80 backdrop-blur rounded-lg p-3 border border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-white text-sm">Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-white text-sm">Failed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-white text-sm">Healing</span>
                </div>
              </div>
              <div className="absolute bottom-6 right-6 bg-gray-900/80 backdrop-blur rounded-lg p-3 border border-gray-700">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-green-400" />
                  <span className="text-white text-sm">Network Health</span>
                </div>
                <div className="text-2xl font-bold text-green-400">
                  {analytics ? `${analytics.uptime}%` : '100%'}
                </div>
              </div>
            </div>
          </div>

          {/* System Events */}
          <div className="bg-gray-900/50 backdrop-blur border border-purple-500/30 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-800 flex items-center space-x-3">
              <Activity className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">System Events</h2>
            </div>
            <div className="p-6 h-[500px] overflow-y-auto space-y-3">
              {logs.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No events logged yet</p>
                  <p className="text-sm mt-2">MCP system initialized with {agents.length} agents</p>
                  <p className="text-xs text-purple-400 mt-4">{new Date().toLocaleTimeString()}</p>
                </div>
              ) : (
                logs.slice().reverse().map((log, i) => (
                  <div key={i} className={`p-3 rounded-lg border ${
                    log.type === 'error' ? 'bg-red-900/20 border-red-500/30' :
                    log.type === 'warning' ? 'bg-yellow-900/20 border-yellow-500/30' :
                    'bg-green-900/20 border-green-500/30'
                  }`}>
                    <div className="flex items-start space-x-2">
                      <Activity className={`w-4 h-4 mt-0.5 ${
                        log.type === 'error' ? 'text-red-400' :
                        log.type === 'warning' ? 'text-yellow-400' :
                        'text-green-400'
                      }`} />
                      <div className="flex-1">
                        <p className="text-white text-sm">{log.message}</p>
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