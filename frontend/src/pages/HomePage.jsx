import React from 'react';
import { Zap, TrendingUp, Activity, Shield, Brain, ChevronDown, Cpu } from 'lucide-react';
import NetworkBackground from '../components/NetworkBackground';

export default function HomePage({ setCurrentPage }) {
  return (
    <div className="min-h-screen pt-20">
      <NetworkBackground />
      
      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
        <div className="flex items-center space-x-4 mb-6">
          <Zap className="w-12 h-12 text-purple-400" />
          <h1 className="text-7xl font-bold text-white">NeuroWeave</h1>
          <Zap className="w-12 h-12 text-cyan-400" />
        </div>
        
        <p className="text-3xl text-gray-300 mb-4">Self-Healing AI Network</p>
        
        <p className="text-xl text-gray-400 max-w-3xl mb-12">
          An autonomous AI system that detects failures, repairs connections, and maintains full functionality without human intervention.
        </p>
        
        <div className="flex space-x-4">
          <button 
            onClick={() => setCurrentPage('dashboard')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center space-x-2"
          >
            <span>Launch Dashboard</span>
            <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
          </button>
          <button 
            onClick={() => setCurrentPage('admin')}
            className="px-8 py-4 bg-white/10 backdrop-blur text-white rounded-lg font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all"
          >
            Try Simulation
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur border border-green-500/30 rounded-2xl p-8 text-center">
            <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <div className="text-5xl font-bold text-white mb-2">99.9%</div>
            <div className="text-gray-300">Uptime</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 backdrop-blur border border-orange-500/30 rounded-2xl p-8 text-center">
            <Zap className="w-12 h-12 text-orange-400 mx-auto mb-4" />
            <div className="text-5xl font-bold text-white mb-2">&lt;3s</div>
            <div className="text-gray-300">Recovery Time</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur border border-blue-500/30 rounded-2xl p-8 text-center">
            <Activity className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <div className="text-5xl font-bold text-white mb-2">12</div>
            <div className="text-gray-300">Active Agents</div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-5xl font-bold text-white text-center mb-16">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900/50 backdrop-blur border border-purple-500/30 rounded-2xl p-8">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Detect</h3>
            <p className="text-gray-400">
              Advanced machine learning algorithms continuously monitor agent health and detect anomalies in real-time before they become critical failures.
            </p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur border border-purple-500/30 rounded-2xl p-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Heal</h3>
            <p className="text-gray-400">
              Autonomous healing protocols activate immediately, rerouting connections and rebalancing loads to maintain system integrity without downtime.
            </p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur border border-purple-500/30 rounded-2xl p-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Evolve</h3>
            <p className="text-gray-400">
              The system learns from every incident, improving prediction accuracy and reducing recovery times with each healing cycle.
            </p>
          </div>
        </div>
      </div>

      {/* Why It Matters */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur border border-purple-500/30 rounded-3xl p-12">
          <h2 className="text-4xl font-bold text-white text-center mb-6">Why It Matters</h2>
          <p className="text-xl text-gray-300 text-center mb-12">
            In critical systems where downtime costs lives and millions, NeuroWeave ensures continuous AI reliability through autonomous recovery.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: '🏥', title: 'Healthcare AI', desc: 'Medical diagnostics' },
              { icon: '💰', title: 'Financial Trading', desc: 'Market operations' },
              { icon: '🚗', title: 'Autonomous Vehicles', desc: 'Safe navigation' },
              { icon: '⚡', title: 'Critical Infrastructure', desc: 'Power & utilities' }
            ].map((item, i) => (
              <div key={i} className="bg-gray-900/50 rounded-xl p-6 text-center border border-gray-700/50">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-br from-purple-600/20 to-cyan-600/20 backdrop-blur border border-purple-500/30 rounded-3xl p-12">
          <Cpu className="w-20 h-20 text-purple-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Experience Self-Healing AI?</h2>
          <p className="text-xl text-gray-300 mb-8">
            See NeuroWeave in action. Monitor real-time healing, analyze performance metrics, and simulate network events.
          </p>
          <button 
            onClick={() => setCurrentPage('dashboard')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-cyan-700 transition-all inline-flex items-center space-x-2"
          >
            <span>Explore Now</span>
            <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <p className="text-gray-500">© 2025 NeuroWeave. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}