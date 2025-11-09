// client/src/hooks/useMCPAgents.js
import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/apiService';

export const useMCPAgents = (autoRefresh = true, refreshInterval = 5000) => {
  const [agents, setAgents] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Fetch all agents
  const fetchAgents = useCallback(async () => {
    try {
      const agentData = await apiService.getAllAgents();
      setAgents(agentData);
      setError(null);
      setIsConnected(true);
    } catch (err) {
      setError(err.message);
      setIsConnected(false);
    }
  }, []);

  // Fetch analytics
  const fetchAnalytics = useCallback(async () => {
    try {
      const analyticsData = await apiService.getAnalytics();
      setAnalytics(analyticsData);
    } catch (err) {
      console.error('Error fetching analytics:', err);
    }
  }, []);

  // Fetch logs
  const fetchLogs = useCallback(async () => {
    try {
      const logData = await apiService.getLogs();
      setLogs(logData);
    } catch (err) {
      console.error('Error fetching logs:', err);
    }
  }, []);

  // Refresh all data
  const refreshData = useCallback(async () => {
    setLoading(true);
    await Promise.all([
      fetchAgents(),
      fetchAnalytics(),
      fetchLogs()
    ]);
    setLoading(false);
  }, [fetchAgents, fetchAnalytics, fetchLogs]);

  // Simulate healing
  const simulateHealing = useCallback(async () => {
    const result = await apiService.simulateHealing();
    if (result.success) {
      // Refresh data after simulation
      setTimeout(() => refreshData(), 1000);
    }
    return result;
  }, [refreshData]);

  // Fail specific agent
  const failAgent = useCallback(async (agentName) => {
    const result = await apiService.failAgent(agentName);
    if (result.success) {
      await refreshData();
    }
    return result;
  }, [refreshData]);

  // Restart specific agent
  const restartAgent = useCallback(async (agentName) => {
    const result = await apiService.restartAgent(agentName);
    if (result.success) {
      await refreshData();
    }
    return result;
  }, [refreshData]);

  // Call agent
  const callAgent = useCallback(async (agentName, input) => {
    return await apiService.callAgent(agentName, input);
  }, []);

  // Clear logs
  const clearLogs = useCallback(async () => {
    await apiService.clearLogs();
    await fetchLogs();
  }, [fetchLogs]);

  // Test connection
  const testConnection = useCallback(async () => {
    const result = await apiService.testConnection();
    setIsConnected(result.connected);
    return result;
  }, []);

  // Initial load
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Auto-refresh
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchAgents();
      fetchAnalytics();
      fetchLogs();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchAgents, fetchAnalytics, fetchLogs]);

  return {
    agents,
    analytics,
    logs,
    loading,
    error,
    isConnected,
    refreshData,
    simulateHealing,
    failAgent,
    restartAgent,
    callAgent,
    clearLogs,
    testConnection
  };
};