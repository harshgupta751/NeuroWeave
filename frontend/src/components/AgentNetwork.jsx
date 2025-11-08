import React, { useEffect, useRef, useState } from 'react';

export default function AgentNetwork({ agents, onAgentClick }) {
  const canvasRef = useRef(null);
  const [hoveredAgent, setHoveredAgent] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;

    const drawAgent = (agent, x, y) => {
      const radius = agent.status === 'active' ? 25 : agent.status === 'healing' ? 22 : 20;
      
      // Glow effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius + 10);
      if (agent.status === 'active') {
        gradient.addColorStop(0, 'rgba(168, 85, 247, 0.8)');
        gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
      } else if (agent.status === 'healing') {
        gradient.addColorStop(0, 'rgba(251, 191, 36, 0.8)');
        gradient.addColorStop(1, 'rgba(251, 191, 36, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(239, 68, 68, 0.6)');
        gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
      }
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius + 10, 0, Math.PI * 2);
      ctx.fill();

      // Main circle
      ctx.fillStyle = agent.status === 'active' ? '#a855f7' : 
                      agent.status === 'healing' ? '#fbbf24' : '#ef4444';
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Inner circle
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.beginPath();
      ctx.arc(x, y, radius - 5, 0, Math.PI * 2);
      ctx.fill();

      // Agent label
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(agent.name, x, y - radius - 10);
    };

    const drawConnection = (x1, y1, x2, y2) => {
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      agents.forEach((agent, i) => {
        agents.slice(i + 1).forEach(otherAgent => {
          if (Math.random() > 0.5) {
            drawConnection(agent.x * width, agent.y * height, 
                         otherAgent.x * width, otherAgent.y * height);
          }
        });
      });

      // Draw agents
      agents.forEach(agent => {
        drawAgent(agent, agent.x * width, agent.y * height);
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [agents]);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const hovered = agents.find(agent => {
      const ax = agent.x * rect.width;
      const ay = agent.y * rect.height;
      const dist = Math.sqrt((x - ax) ** 2 + (y - ay) ** 2);
      return dist < 25;
    });

    setHoveredAgent(hovered);
  };

  return (
    <div className="relative w-full h-full">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full cursor-pointer"
        onMouseMove={handleMouseMove}
        onClick={() => hoveredAgent && onAgentClick(hoveredAgent)}
      />
      {hoveredAgent && (
        <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur border border-purple-500/50 rounded-lg p-4 min-w-[200px]">
          <h4 className="text-white font-semibold mb-2">{hoveredAgent.name}</h4>
          <div className="space-y-1 text-sm">
            <p className="text-gray-300">Role: {hoveredAgent.role}</p>
            <p className="text-gray-300">Status: <span className={`font-semibold ${
              hoveredAgent.status === 'active' ? 'text-green-400' :
              hoveredAgent.status === 'healing' ? 'text-yellow-400' : 'text-red-400'
            }`}>{hoveredAgent.status}</span></p>
            <p className="text-gray-300">Last Sync: {hoveredAgent.lastSync}</p>
          </div>
        </div>
      )}
    </div>
  );
}