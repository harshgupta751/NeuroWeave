// client/src/services/apiService.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/mcp';

class APIService {
  // Get all agents
  async getAllAgents() {
    try {
      const response = await fetch(`${API_BASE_URL}/agents`);
      const data = await response.json();
      return data.success ? data.agents : [];
    } catch (error) {
      console.error('Error fetching agents:', error);
      return [];
    }
  }

  // Get single agent status
  async getAgentStatus(agentName) {
    try {
      const response = await fetch(`${API_BASE_URL}/agents/${agentName}/status`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching status for ${agentName}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Get system analytics
  async getAnalytics() {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics`);
      const data = await response.json();
      return data.success ? data.analytics : null;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      return null;
    }
  }

  // Get event logs
  async getLogs() {
    try {
      const response = await fetch(`${API_BASE_URL}/logs`);
      const data = await response.json();
      return data.success ? data.logs : [];
    } catch (error) {
      console.error('Error fetching logs:', error);
      return [];
    }
  }

  // Clear logs
  async clearLogs() {
    try {
      const response = await fetch(`${API_BASE_URL}/logs`, {
        method: 'DELETE'
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error clearing logs:', error);
      return { success: false, error: error.message };
    }
  }

  // Trigger agent failure
  async failAgent(agentName) {
    try {
      const response = await fetch(`${API_BASE_URL}/agents/${agentName}/fail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error failing agent ${agentName}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Restart agent
  async restartAgent(agentName) {
    try {
      const response = await fetch(`${API_BASE_URL}/agents/${agentName}/restart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error restarting agent ${agentName}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Call agent functionality
  async callAgent(agentName, input) {
    try {
      const response = await fetch(`${API_BASE_URL}/agents/${agentName}/call`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error calling agent ${agentName}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Simulate self-healing
  async simulateHealing() {
    try {
      const response = await fetch(`${API_BASE_URL}/simulate-healing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error simulating healing:', error);
      return { success: false, error: error.message };
    }
  }

  // Test MCP connection
  async testConnection() {
    try {
      const response = await fetch(`${API_BASE_URL}/test-connection`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error testing connection:', error);
      return { connected: false, error: error.message };
    }
  }
}

export default new APIService();