// server/server.js
import express from 'express';
import cors from 'cors';
const router = express.Router();
import mcpService from './services/IntegrationService.js'

// Get all agents with their current status
router.get('/agents', async (req, res) => {
    try {
        const agents = await mcpService.getAllAgents();
        res.json({ success: true, agents });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get single agent status
router.get('/agents/:name/status', async (req, res) => {
    try {
        const status = await mcpService.getAgentStatus(req.params.name);
        res.json({ success: true, status });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get system analytics
router.get('/analytics', async (req, res) => {
    try {
        const analytics = await mcpService.getSystemAnalytics();
        res.json({ success: true, analytics });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get event logs
router.get('/logs', async (req, res) => {
    try {
        const logs = mcpService.getEventLog();
        res.json({ success: true, logs });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Clear event logs
router.delete('/logs', (req, res) => {
    try {
        mcpService.clearLogs();
        res.json({ success: true, message: 'Logs cleared' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Trigger agent failure (simulation)
router.post('/agents/:name/fail', async (req, res) => {
    try {
        const result = await mcpService.triggerAgentFailure(req.params.name);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Restart/heal an agent
router.post('/agents/:name/restart', async (req, res) => {
    try {
        const result = await mcpService.restartAgent(req.params.name);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Call an agent's functionality
router.post('/agents/:name/call', async (req, res) => {
    try {
        const result = await mcpService.callAgent(req.params.name, req.body.input);
        res.json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Simulate self-healing workflow
router.post('/simulate-healing', async (req, res) => {
    try {
        const result = await mcpService.simulateSelfHealing();
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Test MCP connection
router.get('/test-connection', async (req, res) => {
    try {
        const result = await mcpService.testMCPConnection();
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, connected: false, error: error.message });
    }
});

module.exports = router;