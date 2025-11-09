// server/src/services/mcpIntegrationService.js
import axios from 'axios';

// MCP Agent Configuration (matching your MCP setup)
const MCP_AGENTS = {
  'finance-agent': { url: 'http://127.0.0.1:8001', role: 'Finance', id: 1 },
  'data-agent': { url: 'http://127.0.0.1:8002', role: 'Database', id: 2 },
  'math-agent': { url: 'http://127.0.0.1:8003', role: 'Math', id: 3 },
  'health-agent': { url: 'http://127.0.0.1:8004', role: 'Health Monitor', id: 4 },
  'summarizer-gemini': { url: 'http://127.0.0.1:8005', role: 'AI Summarizer', id: 5 },
};

const MCP_CENTRAL_HUB = 'http://127.0.0.1:8000';

class MCPIntegrationService {
  constructor() {
    this.agents = MCP_AGENTS;
    this.eventLog = [];
  }

  // Get all agents with their current status
  async getAllAgents() {
    const agentList = [];
    let index = 0;
    
    for (const [name, config] of Object.entries(this.agents)) {
      try {
        const healthResponse = await axios.get(`${config.url}/health`, {
          timeout: 3000
        });
        
        const health = healthResponse.data;
        
        agentList.push({
          id: config.id,
          name: name,
          role: config.role,
          status: health.status === 'ok' ? 'active' : 
                  health.status === 'restarting' ? 'healing' : 'failed',
          x: 0.2 + (index % 3) * 0.3,
          y: 0.2 + Math.floor(index / 3) * 0.3,
          lastSync: health.ts ? this.formatTimestamp(health.ts) : 'unknown',
          cpu: health.cpu || 'N/A',
          memory: health.memory || 'N/A',
          url: config.url
        });
      } catch (error) {
        // Agent is down
        agentList.push({
          id: config.id,
          name: name,
          role: config.role,
          status: 'failed',
          x: 0.2 + (index % 3) * 0.3,
          y: 0.2 + Math.floor(index / 3) * 0.3,
          lastSync: 'offline',
          cpu: 'N/A',
          memory: 'N/A',
          url: config.url
        });
        
        this.addLog(`${name} is offline or unreachable`, 'error');
      }
      index++;
    }
    
    return agentList;
  }

  // Get single agent status
  async getAgentStatus(agentName) {
    const config = this.agents[agentName];
    if (!config) {
      throw new Error(`Agent ${agentName} not found`);
    }

    try {
      const response = await axios.get(`${config.url}/health`, {
        timeout: 3000
      });
      return response.data;
    } catch (error) {
      return { status: 'failed', error: error.message };
    }
  }

  // Trigger agent failure (for simulation)
  async triggerAgentFailure(agentName) {
    const config = this.agents[agentName];
    if (!config) {
      throw new Error(`Agent ${agentName} not found`);
    }

    try {
      // Call set_faulty endpoint if available (for health-agent)
      await axios.post(`${config.url}/set_faulty`, {}, {
        timeout: 3000
      });
      
      this.addLog(`${agentName} marked as faulty`, 'error');
      return { success: true, message: `${agentName} failed` };
    } catch (error) {
      this.addLog(`Failed to mark ${agentName} as faulty: ${error.message}`, 'error');
      return { success: false, error: error.message };
    }
  }

  // Restart/heal an agent
  async restartAgent(agentName) {
    const config = this.agents[agentName];
    if (!config) {
      throw new Error(`Agent ${agentName} not found`);
    }

    try {
      this.addLog(`${agentName} restart initiated`, 'warning');
      
      const response = await axios.post(`${config.url}/restart`, {}, {
        timeout: 5000
      });
      
      this.addLog(`${agentName} restarted successfully`, 'success');
      return { success: true, message: response.data.message };
    } catch (error) {
      this.addLog(`${agentName} restart failed: ${error.message}`, 'error');
      return { success: false, error: error.message };
    }
  }

  // Call an agent's functionality
  async callAgent(agentName, input) {
    const config = this.agents[agentName];
    if (!config) {
      throw new Error(`Agent ${agentName} not found`);
    }

    try {
      const response = await axios.post(`${config.url}/call`, {
        input,
        meta: { timestamp: Date.now() }
      }, {
        timeout: 10000
      });
      
      this.addLog(`${agentName} call successful`, 'success');
      return response.data;
    } catch (error) {
      this.addLog(`${agentName} call failed: ${error.message}`, 'error');
      throw error;
    }
  }

  // Get system-wide analytics
  async getSystemAnalytics() {
    const agents = await this.getAllAgents();
    
    const analytics = {
      totalAgents: agents.length,
      activeAgents: agents.filter(a => a.status === 'active').length,
      failedAgents: agents.filter(a => a.status === 'failed').length,
      healingAgents: agents.filter(a => a.status === 'healing').length,
      uptime: 0,
      healingEvents: this.eventLog.filter(e => e.type === 'warning' || e.type === 'error').length,
      avgRecoveryTime: 2.8, // Mock for now
      avgDetectionTime: 0.28, // Mock for now
      mlConfidence: 94.2 // Mock for now
    };

    // Calculate uptime percentage
    if (analytics.totalAgents > 0) {
      analytics.uptime = ((analytics.activeAgents / analytics.totalAgents) * 100).toFixed(1);
    }

    return analytics;
  }

  // Get event logs
  getEventLog() {
    return this.eventLog.slice(-50); // Return last 50 events
  }

  // Add log entry
  addLog(message, type = 'info') {
    this.eventLog.push({
      timestamp: new Date().toISOString(),
      time: new Date().toLocaleTimeString(),
      message,
      type
    });
  }

  // Clear logs
  clearLogs() {
    this.eventLog = [];
  }

  // Format timestamp
  formatTimestamp(ts) {
    const now = Date.now() / 1000;
    const diff = now - ts;
    
    if (diff < 60) return `${Math.floor(diff)}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  }

  // Test MCP Central Hub connection
  async testMCPConnection() {
    try {
      const response = await axios.get(`${MCP_CENTRAL_HUB}/status`, {
        timeout: 3000
      });
      return { connected: true, data: response.data };
    } catch (error) {
      return { connected: false, error: error.message };
    }
  }

  // Simulate self-healing workflow
  async simulateSelfHealing() {
    const agents = await this.getAllAgents();
    const activeAgents = agents.filter(a => a.status === 'active');
    
    if (activeAgents.length === 0) {
      return { success: false, message: 'No active agents to fail' };
    }

    // Pick a random active agent
    const randomAgent = activeAgents[Math.floor(Math.random() * activeAgents.length)];
    
    this.addLog(`🔴 ${randomAgent.name} failure detected`, 'error');
    
    // Trigger failure
    await this.triggerAgentFailure(randomAgent.name);
    
    // Wait 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    this.addLog(`🟡 ${randomAgent.name} healing in progress`, 'warning');
    
    // Restart agent
    await this.restartAgent(randomAgent.name);
    
    // Wait 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    this.addLog(`🟢 ${randomAgent.name} recovered successfully`, 'success');
    
    return { 
      success: true, 
      agent: randomAgent.name,
      message: 'Self-healing simulation completed'
    };
  }
}

const mcpService = new MCPIntegrationService();

// Provide both a default export (for default-style imports) and a named export
export default mcpService;
export { mcpService };
