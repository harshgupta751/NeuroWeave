import React from 'react';
import { Activity, Clock, TrendingUp, Brain } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">System Analytics</h1>
            <p className="text-gray-400">Performance insights and healing metrics</p>
          </div>
          <select className="bg-gray-800 border border-purple-500/30 text-white rounded-lg px-4 py-2">
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>

        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">Total Healing Events</span>
              <Activity className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">247</div>
            <div className="text-sm text-green-400">↑ 12% from last period</div>
          </div>
          <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 backdrop-blur border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">Avg Detection Time</span>
              <Clock className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">0.28s</div>
            <div className="text-sm text-green-400">↓ 15% improvement</div>
          </div>
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur border border-blue-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">Avg Recovery Time</span>
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">2.8s</div>
            <div className="text-sm text-green-400">↓ 8% improvement</div>
          </div>
          <div className="bg-gradient-to-br from-indigo-900/40 to-indigo-800/20 backdrop-blur border border-indigo-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">ML Confidence</span>
              <Brain className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">94.2%</div>
            <div className="text-sm text-green-400">↑ 3% accuracy gain</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Healing Events Chart */}
          <div className="bg-gray-900/50 backdrop-blur border border-purple-500/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Healing Events Over Time</h3>
            <div className="h-64 relative flex items-end justify-around space-x-1 pb-8">
              {[2, 4, 3, 5, 3, 4, 5, 3, 4, 5, 4, 3, 5, 4, 3, 2, 4, 5, 3, 4].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end space-y-1">
                  <div 
                    className="bg-gradient-to-t from-green-500 to-green-400 rounded-t"
                    style={{ height: `${val * 20}%` }}
                  ></div>
                  <div 
                    className="bg-gradient-to-t from-red-500 to-red-400 rounded-t"
                    style={{ height: `${(6 - val) * 15}%` }}
                  ></div>
                </div>
              ))}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 pt-2">
                <span>05:37 PM</span>
                <span>08:37 PM</span>
                <span>11:37 PM</span>
                <span>02:37 AM</span>
                <span>03:37 PM</span>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-300 text-sm">Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-300 text-sm">Healing</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-300 text-sm">Failed</span>
              </div>
            </div>
          </div>

          {/* Network Uptime Distribution */}
          <div className="bg-gray-900/50 backdrop-blur border border-purple-500/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Network Uptime Distribution</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="relative w-64 h-64">
                <svg width="256" height="256" viewBox="0 0 256 256" className="transform -rotate-90">
                  <circle 
                    cx="128" 
                    cy="128" 
                    r="100" 
                    fill="none" 
                    stroke="#1f2937" 
                    strokeWidth="30"
                  />
                  <circle 
                    cx="128" 
                    cy="128" 
                    r="100" 
                    fill="none" 
                    stroke="#22c55e" 
                    strokeWidth="30"
                    strokeDasharray="600"
                    strokeDashoffset="27"
                  />
                  <circle 
                    cx="128" 
                    cy="128" 
                    r="100" 
                    fill="none" 
                    stroke="#fbbf24" 
                    strokeWidth="30"
                    strokeDasharray="14 586"
                    strokeDashoffset="-573"
                  />
                  <circle 
                    cx="128" 
                    cy="128" 
                    r="100" 
                    fill="none" 
                    stroke="#ef4444" 
                    strokeWidth="30"
                    strokeDasharray="13 587"
                    strokeDashoffset="-587"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold text-green-400">95.5%</div>
                  <div className="text-sm text-gray-400 mt-1">Active</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-300 text-sm">Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-300 text-sm">Healing</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-300 text-sm">Failed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Detection & Recovery Performance */}
          <div className="bg-gray-900/50 backdrop-blur border border-purple-500/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Detection & Recovery Performance</h3>
            <div className="h-64 relative">
              <svg className="w-full h-full" viewBox="0 0 500 250">
                <path 
                  d="M 0,80 L 50,70 L 100,75 L 150,65 L 200,70 L 250,60 L 300,65 L 350,55 L 400,60 L 450,50" 
                  stroke="#a855f7" 
                  strokeWidth="3" 
                  fill="none"
                />
                <path 
                  d="M 0,120 L 50,115 L 100,118 L 150,110 L 200,115 L 250,108 L 300,112 L 350,105 L 400,110 L 450,103" 
                  stroke="#fbbf24" 
                  strokeWidth="3" 
                  fill="none"
                />
                {[0, 1, 2, 3, 4].map((i) => (
                  <line key={i} x1="0" y1={i * 50} x2="450" y2={i * 50} stroke="#374151" strokeWidth="0.5" />
                ))}
              </svg>
            </div>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-gray-300 text-sm">Detection Time</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-300 text-sm">Recovery Time</span>
              </div>
            </div>
          </div>

          {/* ML Model Prediction Confidence */}
          <div className="bg-gray-900/50 backdrop-blur border border-purple-500/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">ML Model Prediction Confidence</h3>
            <div className="h-64 flex items-end justify-around space-x-1">
              {[91, 90, 91, 90, 87, 93, 92, 95, 90, 94, 97, 91, 85, 95, 90, 94, 92, 97, 91, 92].map((val, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t"
                  style={{ height: `${val}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}