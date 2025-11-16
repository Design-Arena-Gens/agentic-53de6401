'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';

interface WorkflowNode extends Node {
  data: {
    label: string;
    type: string;
    config?: any;
  };
}

const nodeTypes = [
  { id: 'trigger', label: 'YouTube Trigger', color: '#ef4444', description: 'Monitor channel for new videos' },
  { id: 'analyze', label: 'AI Video Analysis', color: '#3b82f6', description: 'Analyze video content with AI' },
  { id: 'generate', label: 'Generate Content', color: '#8b5cf6', description: 'Create descriptions, tags, titles' },
  { id: 'schedule', label: 'Schedule Post', color: '#10b981', description: 'Schedule video publication' },
  { id: 'optimize', label: 'SEO Optimizer', color: '#f59e0b', description: 'Optimize for search rankings' },
  { id: 'thumbnail', label: 'Thumbnail Generator', color: '#ec4899', description: 'AI-generated thumbnails' },
  { id: 'comment', label: 'Auto-Responder', color: '#06b6d4', description: 'Auto-reply to comments' },
  { id: 'analytics', label: 'Analytics Report', color: '#6366f1', description: 'Generate performance reports' },
];

const initialNodes: WorkflowNode[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'YouTube Channel Monitor', type: 'trigger' },
    position: { x: 250, y: 50 },
    style: { background: '#ef4444', color: 'white', border: '2px solid #dc2626', borderRadius: '8px', padding: '10px' },
  },
];

const initialEdges: Edge[] = [];

export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  const nodeIdCounter = useRef(2);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = (type: typeof nodeTypes[0]) => {
    const newNode: WorkflowNode = {
      id: `${nodeIdCounter.current++}`,
      type: 'default',
      data: { label: type.label, type: type.id },
      position: { x: Math.random() * 400 + 100, y: Math.random() * 400 + 150 },
      style: {
        background: type.color,
        color: 'white',
        border: '2px solid rgba(0,0,0,0.2)',
        borderRadius: '8px',
        padding: '10px',
        minWidth: '150px',
        textAlign: 'center'
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node as WorkflowNode);
  }, []);

  const executeWorkflow = async () => {
    setIsExecuting(true);
    setExecutionLog([]);

    const logs: string[] = [];
    logs.push('🚀 Starting YouTube Automation Workflow...');
    setExecutionLog([...logs]);

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate workflow execution
    const sortedNodes = [...nodes].sort((a, b) => {
      const aY = a.position.y;
      const bY = b.position.y;
      return aY - bY;
    });

    for (const node of sortedNodes) {
      await new Promise(resolve => setTimeout(resolve, 800));

      switch (node.data.type) {
        case 'trigger':
          logs.push(`📺 [${node.data.label}] Monitoring channel... Found 1 new video`);
          break;
        case 'analyze':
          logs.push(`🤖 [${node.data.label}] Analyzing video content with AI...`);
          logs.push(`   ✓ Detected topic: Tech Tutorial`);
          logs.push(`   ✓ Duration: 12:34`);
          logs.push(`   ✓ Sentiment: Positive`);
          break;
        case 'generate':
          logs.push(`✍️ [${node.data.label}] Generating optimized metadata...`);
          logs.push(`   ✓ Title: "10 Essential Tips for...""`);
          logs.push(`   ✓ Description generated (250 words)`);
          logs.push(`   ✓ Tags: 15 relevant tags added`);
          break;
        case 'optimize':
          logs.push(`🎯 [${node.data.label}] Running SEO optimization...`);
          logs.push(`   ✓ Keyword density optimized`);
          logs.push(`   ✓ Hashtags: #tech #tutorial #howto`);
          break;
        case 'thumbnail':
          logs.push(`🎨 [${node.data.label}] Creating custom thumbnail...`);
          logs.push(`   ✓ AI-generated thumbnail saved`);
          break;
        case 'schedule':
          logs.push(`📅 [${node.data.label}] Scheduling video...`);
          logs.push(`   ✓ Scheduled for optimal time: 2 PM EST`);
          break;
        case 'comment':
          logs.push(`💬 [${node.data.label}] Setting up auto-responder...`);
          logs.push(`   ✓ Monitoring comments every 5 minutes`);
          break;
        case 'analytics':
          logs.push(`📊 [${node.data.label}] Generating analytics report...`);
          logs.push(`   ✓ Report sent to email`);
          break;
        default:
          logs.push(`⚙️ [${node.data.label}] Processing...`);
      }

      setExecutionLog([...logs]);
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    logs.push('✅ Workflow completed successfully!');
    setExecutionLog([...logs]);
    setIsExecuting(false);
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 overflow-y-auto">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white mb-1">YouTube AI Agent</h1>
          <p className="text-xs text-gray-400">n8n-style Automation</p>
        </div>

        <div className="p-4">
          <h2 className="text-sm font-semibold text-gray-300 mb-3">Available Nodes</h2>
          <div className="space-y-2">
            {nodeTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => addNode(type)}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors group"
                style={{ background: `${type.color}15` }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: type.color }}
                  />
                  <span className="text-sm font-medium text-white">{type.label}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1 ml-5">{type.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={executeWorkflow}
            disabled={isExecuting || nodes.length === 0}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isExecuting ? (
              <>
                <span className="animate-spin">⚙️</span>
                Executing...
              </>
            ) : (
              <>
                ▶️ Execute Workflow
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col">
        <div className="h-2/3 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            fitView
            className="bg-gray-900"
          >
            <Controls className="bg-gray-800 border-gray-700" />
            <MiniMap className="bg-gray-800" nodeColor={(node) => {
              return node.style?.background as string || '#6366f1';
            }} />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} color="#374151" />
          </ReactFlow>

          <div className="absolute top-4 left-4 bg-gray-800 rounded-lg p-3 border border-gray-700 shadow-lg">
            <h3 className="text-sm font-semibold text-white mb-1">Quick Start</h3>
            <p className="text-xs text-gray-400">
              1. Click nodes from the sidebar to add them<br/>
              2. Connect nodes by dragging from one to another<br/>
              3. Click "Execute Workflow" to run automation
            </p>
          </div>
        </div>

        {/* Execution Log */}
        <div className="h-1/3 bg-gray-950 border-t border-gray-700 overflow-hidden flex flex-col">
          <div className="p-3 border-b border-gray-700">
            <h3 className="text-sm font-semibold text-white">Execution Log</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 font-mono text-xs">
            {executionLog.length === 0 ? (
              <p className="text-gray-500">No executions yet. Click "Execute Workflow" to start.</p>
            ) : (
              <div className="space-y-1">
                {executionLog.map((log, idx) => (
                  <div key={idx} className="text-green-400">
                    {log}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Node Details Panel */}
      {selectedNode && (
        <div className="w-80 bg-gray-800 border-l border-gray-700 overflow-y-auto">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-lg font-bold text-white">{selectedNode.data.label}</h2>
            <p className="text-xs text-gray-400 mt-1">Node ID: {selectedNode.id}</p>
          </div>

          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Node Type
              </label>
              <input
                type="text"
                value={selectedNode.data.type}
                disabled
                className="w-full bg-gray-700 text-gray-300 px-3 py-2 rounded border border-gray-600 text-sm"
              />
            </div>

            {selectedNode.data.type === 'trigger' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Channel ID
                  </label>
                  <input
                    type="text"
                    placeholder="UC..."
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Check Interval (minutes)
                  </label>
                  <input
                    type="number"
                    defaultValue={15}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 text-sm"
                  />
                </div>
              </>
            )}

            {selectedNode.data.type === 'generate' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    AI Model
                  </label>
                  <select className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 text-sm">
                    <option>GPT-4</option>
                    <option>Claude</option>
                    <option>Gemini</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tone
                  </label>
                  <select className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 text-sm">
                    <option>Professional</option>
                    <option>Casual</option>
                    <option>Engaging</option>
                  </select>
                </div>
              </>
            )}

            <div className="pt-4 border-t border-gray-700">
              <button
                onClick={() => setSelectedNode(null)}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
