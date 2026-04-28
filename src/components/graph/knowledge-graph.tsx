import { useMemo, useState } from 'react';
import { examQuestions } from '../../data/exams';
import { knowledgeEdges, knowledgeNodes } from '../../data/knowledge-graph';

const GROUP_COLORS: Record<string, { fill: string; stroke: string; bg: string; text: string; label: string }> = {
  fondation:    { fill: '#2a8bff', stroke: '#1a6fd4', bg: '#eff6ff', text: '#1e40af', label: 'Fondation' },
  pratique:     { fill: '#8b5cf6', stroke: '#7c3aed', bg: '#f5f3ff', text: '#6d28d9', label: 'Pratique' },
  qualite:      { fill: '#10b981', stroke: '#059669', bg: '#ecfdf5', text: '#065f46', label: 'Qualité' },
  organisation: { fill: '#f59e0b', stroke: '#d97706', bg: '#fffbeb', text: '#92400e', label: 'Organisation' },
};

export const KnowledgeGraph = () => {
  const [selectedNodeId, setSelectedNodeId] = useState(knowledgeNodes[0]?.id ?? '');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const selectedNode = useMemo(
    () => knowledgeNodes.find((node) => node.id === selectedNodeId) ?? knowledgeNodes[0],
    [selectedNodeId]
  );

  const linkedQuestions = useMemo(
    () => examQuestions.filter((question) => selectedNode.linkedExamQuestionIds.includes(question.id)),
    [selectedNode]
  );

  // Edges connected to hovered/selected node
  const activeNodeId = hoveredNodeId ?? selectedNodeId;
  const connectedIds = new Set(
    knowledgeEdges
      .filter((e) => e.from === activeNodeId || e.to === activeNodeId)
      .flatMap((e) => [e.from, e.to])
  );

  const selectedColor = GROUP_COLORS[selectedNode.group] ?? GROUP_COLORS.fondation;

  return (
    <div className="space-y-4 max-w-5xl">

      {/* Header */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 mb-1">Carte des connaissances</p>
            <h2 className="font-display text-2xl font-bold text-slate-900">Knowledge Graph</h2>
            <p className="mt-1 text-sm text-slate-500">Clique un nœud pour explorer ses liens avec l'examen.</p>
          </div>
          {/* Legend */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(GROUP_COLORS).map(([key, c]) => (
              <span key={key} className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em]"
                style={{ borderColor: `${c.fill}44`, backgroundColor: c.bg, color: c.text }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.fill }} />
                {c.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_260px]">

        {/* SVG Graph */}
        <div className="rounded-2xl border border-slate-100 bg-white p-4 overflow-hidden">
          <svg viewBox="0 0 760 460" className="w-full rounded-xl bg-slate-50">
            {/* Edges */}
            {knowledgeEdges.map((edge) => {
              const from = knowledgeNodes.find((n) => n.id === edge.from);
              const to = knowledgeNodes.find((n) => n.id === edge.to);
              if (!from || !to) return null;
              const isActive = connectedIds.has(edge.from) && connectedIds.has(edge.to);
              return (
                <g key={edge.id}>
                  <line
                    x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    stroke={isActive ? '#2a8bff' : '#e2e8f0'}
                    strokeWidth={isActive ? 1.5 : 1}
                    strokeDasharray={isActive ? '6 4' : '4 6'}
                    strokeOpacity={isActive ? 0.8 : 1}
                  />
                  <text
                    x={(from.x + to.x) / 2}
                    y={(from.y + to.y) / 2 - 7}
                    textAnchor="middle"
                    fontSize="9"
                    fontFamily="Space Grotesk, sans-serif"
                    fill={isActive ? '#2a8bff' : '#94a3b8'}
                    opacity={isActive ? 1 : 0.7}
                  >
                    {edge.relation}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {knowledgeNodes.map((node) => {
              const c = GROUP_COLORS[node.group] ?? GROUP_COLORS.fondation;
              const isSelected = node.id === selectedNodeId;
              const isHovered = node.id === hoveredNodeId;
              const isConnected = connectedIds.has(node.id);
              const r = isSelected ? 20 : isHovered ? 17 : 14;

              return (
                <g
                  key={node.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedNodeId(node.id)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                >
                  {/* Glow ring for selected */}
                  {isSelected && (
                    <circle cx={node.x} cy={node.y} r={r + 6}
                      fill="none" stroke={c.fill} strokeWidth="1" opacity="0.3" />
                  )}
                  <circle
                    cx={node.x} cy={node.y} r={r}
                    fill={isSelected ? c.fill : isConnected ? `${c.fill}33` : '#f1f5f9'}
                    stroke={isSelected ? c.stroke : isConnected ? c.fill : '#e2e8f0'}
                    strokeWidth={isSelected ? 2 : 1}
                  />
                  {node.label.split(' ').map((word, i, arr) => (
                    <text
                      key={i}
                      x={node.x}
                      y={node.y + (i - (arr.length - 1) / 2) * 11}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="8"
                      fontFamily="Space Grotesk, sans-serif"
                      fontWeight="700"
                      fill={isSelected ? '#fff' : isConnected ? c.fill : '#94a3b8'}
                    >
                      {word}
                    </text>
                  ))}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Detail panel */}
        <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden flex flex-col">
          {/* Node info */}
          <div className="p-5 border-b border-slate-100"
            style={{ backgroundColor: selectedColor.bg }}>
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] mb-1" style={{ color: selectedColor.fill }}>
              {selectedColor.label}
            </p>
            <h3 className="font-display text-lg font-bold text-slate-900 leading-snug">
              {selectedNode.label}
            </h3>
            <p className="mt-1.5 text-[12px] text-slate-600 leading-relaxed">
              {selectedNode.description}
            </p>
          </div>

          {/* Linked exam questions */}
          <div className="flex-1 overflow-y-auto p-4">
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400 mb-3">
              Questions d'examen liées ({linkedQuestions.length})
            </p>
            {linkedQuestions.length > 0 ? (
              <div className="space-y-2">
                {linkedQuestions.map((question) => (
                  <div key={question.id} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-400 mb-1">
                      {question.theme}
                    </p>
                    <p className="text-[11px] text-slate-700 leading-relaxed line-clamp-3">
                      {question.prompt}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 italic">Aucune question liée.</p>
            )}
          </div>

          <div className="px-4 pb-4">
            <p className="text-[9px] text-slate-400 font-mono">src/data/knowledge-graph.ts</p>
          </div>
        </div>
      </div>
    </div>
  );
};
