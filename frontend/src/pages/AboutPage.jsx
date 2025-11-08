import React from 'react';
import { Code, Smartphone, Brain, Cpu, Zap, Shield, TrendingUp, Github, Linkedin, Mail } from 'lucide-react';

export default function AboutPage() {
  const team = [
    { name: 'Alex Chen', role: 'Full Stack Developer', icon: Code, color: 'from-purple-500 to-pink-500', desc: 'Built the web infrastructure and real-time monitoring dashboard' },
    { name: 'Sarah Martinez', role: 'Mobile Developer', icon: Smartphone, color: 'from-blue-500 to-cyan-500', desc: 'Designed mobile interface for remote network management' },
    { name: 'David Park', role: 'ML Engineer', icon: Brain, color: 'from-green-500 to-emerald-500', desc: 'Developed anomaly detection and prediction algorithms' },
    { name: 'Emily Johnson', role: 'AI Architect', icon: Cpu, color: 'from-orange-500 to-red-500', desc: 'Architected the autonomous agent coordination system' },
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">About NeuroWeave</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Building the future of autonomous AI systems through self-healing networks
          </p>
        </div>

        {/* Our Innovation */}
        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur border border-purple-500/30 rounded-3xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Our Innovation</h2>
          <div className="space-y-4 text-gray-300">
            <p className="text-lg leading-relaxed">
              NeuroWeave was born from a critical challenge in modern AI systems: downtime. In industries where milliseconds matter—healthcare diagnostics, autonomous vehicles, financial trading—a single agent failure can cascade into catastrophic consequences.
            </p>
            <p className="text-lg leading-relaxed">
              We envisioned a network that doesn't just detect failures, but actively heals itself. Using advanced machine learning for anomaly prediction, real-time monitoring for instant detection, and autonomous coordination for seamless recovery, NeuroWeave maintains continuous operation without human intervention.
            </p>
            <p className="text-lg leading-relaxed">
              Our system learns from every failure, improving its prediction accuracy and reducing recovery times. What started as a hackathon project has evolved into a proof-of-concept that demonstrates the future of resilient AI infrastructure.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 backdrop-blur border border-orange-500/30 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Real-Time Detection</h3>
              <p className="text-gray-400">
                ML-powered anomaly detection monitors agent health continuously, identifying potential failures before they occur through pattern recognition and predictive analytics.
              </p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur border border-green-500/30 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Autonomous Healing</h3>
              <p className="text-gray-400">
                When failures occur, the network automatically reroutes connections, rebalances workloads, and initiates recovery protocols without requiring manual intervention.
              </p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur border border-blue-500/30 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Continuous Learning</h3>
              <p className="text-gray-400">
                Each healing event improves the system's intelligence, refining prediction models and optimizing recovery strategies for faster, more efficient self-repair.
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-gray-900/50 backdrop-blur border border-purple-500/30 rounded-3xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'React.js', 'Node.js', 'Express.js', 'MongoDB',
              'MCP Protocol', 'Scikit-learn', 'D3.js', 'Three.js',
              'WebSocket', 'Redis', 'Docker', 'Kubernetes'
            ].map((tech, i) => (
              <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 text-center">
                <span className="text-purple-400 font-semibold">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Meet the Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => {
              const IconComponent = member.icon;
              return (
                <div key={i} className="bg-gray-900/50 backdrop-blur border border-purple-500/30 rounded-2xl p-6 text-center hover:border-purple-400/50 transition-all">
                  <div className={`w-20 h-20 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-purple-400 text-sm mb-4">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.desc}</p>
                  <div className="flex justify-center space-x-3 mt-4">
                    <button className="w-10 h-10 bg-purple-600/20 hover:bg-purple-600/40 rounded-lg flex items-center justify-center transition-all">
                      <Github className="w-5 h-5 text-purple-400" />
                    </button>
                    <button className="w-10 h-10 bg-purple-600/20 hover:bg-purple-600/40 rounded-lg flex items-center justify-center transition-all">
                      <Linkedin className="w-5 h-5 text-purple-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Future Vision */}
        <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur border border-indigo-500/30 rounded-3xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Future Vision</h2>
          <p className="text-gray-300 text-center text-lg mb-12 max-w-3xl mx-auto">
            NeuroWeave is just the beginning. We envision a world where AI systems are truly autonomous, capable of self-optimization, self-repair, and continuous evolution. Our next steps include:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900/30 rounded-xl p-6">
              <h4 className="text-xl font-bold text-white mb-3">Multi-Cloud Support</h4>
              <p className="text-gray-400">Seamless healing across distributed cloud environments</p>
            </div>
            <div className="bg-gray-900/30 rounded-xl p-6">
              <h4 className="text-xl font-bold text-white mb-3">Predictive Scaling</h4>
              <p className="text-gray-400">AI-driven resource allocation before failures occur</p>
            </div>
            <div className="bg-gray-900/30 rounded-xl p-6">
              <h4 className="text-xl font-bold text-white mb-3">Industry Integration</h4>
              <p className="text-gray-400">Tailored solutions for healthcare, finance, and IoT</p>
            </div>
          </div>
        </div>

        {/* Get In Touch */}
        <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur border border-purple-500/30 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-300 mb-8">
            Interested in NeuroWeave? We'd love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>Contact Us</span>
            </button>
            <button className="px-8 py-4 bg-gray-800 border border-purple-500/50 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all flex items-center space-x-2">
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}