# NeuroWeave + MCP Integration Setup Guide

## 📁 Project Structure

```
neuroweave/
├── client/                    # React Frontend
├── server/                    # Express Backend
└── MCP/                       # Your existing MCP agents folder
    ├── data_agent.py
    ├── health_agent.py
    ├── math_agent.py
    ├── summarizer_agent_gemini.py
    └── server.py
```

## 🚀 Step-by-Step Setup

### 1. **Install Backend Dependencies**

```bash
cd server
npm install
```

### 2. **Install Frontend Dependencies**

```bash
cd client
npm install
```

### 3. **Start Your MCP Agents**

Open **5 separate terminals** and start each agent:

**Terminal 1 - Finance Agent (Port 8001):**
```bash
cd MCP
# If you have a finance_agent.py, run it
# Otherwise, skip this or create a dummy one
uvicorn finance_agent:app --host 127.0.0.1 --port 8001
```

**Terminal 2 - Data Agent (Port 8002):**
```bash
cd MCP
uvicorn data_agent:app --host 127.0.0.1 --port 8002
```

**Terminal 3 - Math Agent (Port 8003):**
```bash
cd MCP
uvicorn math_agent:app --host 127.0.0.1 --port 8003
```

**Terminal 4 - Health Agent (Port 8004):**
```bash
cd MCP
uvicorn health_agent:app --host 127.0.0.1 --port 8004
```

**Terminal 5 - Summarizer Agent (Port 8005):**
```bash
cd MCP
uvicorn summarizer_agent_gemini:app --host 127.0.0.1 --port 8005
```

### 4. **Start NeuroWeave Backend**

**Terminal 6:**
```bash
cd server
npm start
```

Backend will start on `http://localhost:5000`

### 5. **Start NeuroWeave Frontend**

**Terminal 7:**
```bash
cd client
npm start
```

Frontend will start on `http://localhost:3000`

## 🎯 Testing the Integration

### Test 1: Check Backend Connection
```bash
curl http://localhost:5000/health
```

Should return:
```json
{
  "status": "ok",
  "service": "NeuroWeave Backend",
  "timestamp": "..."
}
```

### Test 2: Check MCP Agents
```bash
curl http://localhost:5000/api/mcp/agents
```

Should return all your MCP agents with their status.

### Test 3: Test Simulation
```bash
curl -X POST http://localhost:5000/api/mcp/simulate-healing
```

This will trigger a random agent failure and auto-healing!

## 🌐 Access Your Application

1. Open browser: `http://localhost:3000`
2. Navigate to **Dashboard** to see live MCP agents
3. Go to **Admin** page and click "Trigger Self-Healing Simulation"
4. Watch your real MCP agents fail and recover in real-time!

## 🔧 Configuration

### Update Agent URLs (if different)

Edit `server/src/services/mcpIntegrationService.js`:

```javascript
const MCP_AGENTS = {
  'finance-agent': { url: 'http://127.0.0.1:8001', role: 'Finance', id: 1 },
  'data-agent': { url: 'http://127.0.0.1:8002', role: 'Database', id: 2 },
  // ... add or modify agents here
};
```

### Change Backend Port

Edit `server/server.js`:
```javascript
const PORT = process.env.PORT || 5000; // Change this
```

### Change Frontend API URL

Create `client/.env`:
```
REACT_APP_API_URL=http://localhost:5000/api/mcp
```

## 📊 Features

✅ **Real-time MCP agent monitoring**
✅ **Live health status from actual agents**
✅ **Interactive network visualization**
✅ **Self-healing simulation with real agents**
✅ **Event logging from MCP agents**
✅ **Auto-refresh every 5 seconds**

## 🐛 Troubleshooting

### Problem: "MCP Agents Offline" warning

**Solution:**
- Make sure all 5 MCP agent terminals are running
- Check each agent's health endpoint individually:
  - `curl http://127.0.0.1:8001/health`
  - `curl http://127.0.0.1:8002/health`
  - etc.

### Problem: CORS errors in browser console

**Solution:**
- Backend already has CORS enabled
- Make sure backend is running on port 5000
- Check browser console for actual error

### Problem: "Cannot GET /api/mcp/agents"

**Solution:**
- Ensure backend is running: `cd server && npm start`
- Check backend logs for errors

### Problem: Agents show as "failed" even when running

**Solution:**
- Verify agent endpoints match in `mcpIntegrationService.js`
- Check if agents have `/health` endpoint
- Ensure agents return `{status: "ok"}` format

## 🎨 Customization

### Add More Agents

1. Start your new agent on a new port (e.g., 8006)
2. Add to `server/src/services/mcpIntegrationService.js`:

```javascript
const MCP_AGENTS = {
  // existing agents...
  'my-new-agent': { url: 'http://127.0.0.1:8006', role: 'Custom', id: 6 },
};
```

3. Restart backend
4. Your new agent will appear in the dashboard!

## 🚀 Production Deployment

### Backend (Heroku/Railway/Render)

```bash
cd server
# Set environment variable
PORT=8080
# Deploy
```

### Frontend (Vercel/Netlify)

```bash
cd client
npm run build
# Deploy build folder
```

## 📝 API Endpoints

### GET `/api/mcp/agents`
Returns all agents with their current status

### GET `/api/mcp/analytics`
Returns system-wide analytics

### GET `/api/mcp/logs`
Returns event logs

### POST `/api/mcp/simulate-healing`
Triggers self-healing simulation

### POST `/api/mcp/agents/:name/fail`
Manually fail a specific agent

### POST `/api/mcp/agents/:name/restart`
Restart a specific agent

## 📚 Next Steps

1. ✅ Test all MCP agents individually
2. ✅ Start backend server
3. ✅ Start frontend application
4. ✅ Run self-healing simulation
5. ✅ Customize agent roles and names
6. ✅ Add more agents as needed
7. ✅ Deploy to production!

## 🎉 Success!

Your NeuroWeave website is now successfully integrated with real MCP Protocol agents!

**Visit:** `http://localhost:3000` to see your self-healing AI network in action! 🚀