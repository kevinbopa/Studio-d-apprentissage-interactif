import { RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';

interface StrategicImageMapProps {
  sectionId: string;
}

interface MapNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  description: string;
}

interface MapDefinition {
  title: string;
  objective: string;
  nodes: MapNode[];
  edges: Array<[string, string]>;
  recommendedPath: string[];
}

const SECTION_MAPS: Record<string, MapDefinition> = {
  'manifesto-values': {
    title: 'Carte de lecture du manifeste',
    objective: "Construire un raisonnement de valeur: contexte -> choix agile -> impact client.",
    nodes: [
      {
        id: 'context',
        label: 'Contexte instable',
        x: 70,
        y: 90,
        color: '#0ea5e9',
        description: 'Exigences mouvantes, contraintes business et feedback rapide.',
      },
      {
        id: 'people',
        label: 'Individus',
        x: 170,
        y: 40,
        color: '#8b5cf6',
        description: 'Coordination humaine forte pour decider vite.',
      },
      {
        id: 'software',
        label: 'Logiciel utile',
        x: 290,
        y: 40,
        color: '#10b981',
        description: "Mesure du progres par increment qui fonctionne reellement.",
      },
      {
        id: 'collab',
        label: 'Collaboration client',
        x: 170,
        y: 145,
        color: '#f59e0b',
        description: 'Le client arbitre la valeur en continu.',
      },
      {
        id: 'adapt',
        label: 'Adaptation',
        x: 290,
        y: 145,
        color: '#ef4444',
        description: "Le plan s'ajuste selon les apprentissages terrain.",
      },
    ],
    edges: [
      ['context', 'people'],
      ['context', 'software'],
      ['people', 'collab'],
      ['software', 'adapt'],
      ['collab', 'adapt'],
    ],
    recommendedPath: ['context', 'people', 'collab', 'adapt'],
  },
  'xp-practices': {
    title: 'Carte technique XP',
    objective: 'Relier les pratiques qui assurent feedback rapide et qualite continue.',
    nodes: [
      {
        id: 'story',
        label: 'User stories',
        x: 80,
        y: 90,
        color: '#0ea5e9',
        description: 'Valeur exprimee du point de vue utilisateur.',
      },
      {
        id: 'tdd',
        label: 'TDD',
        x: 180,
        y: 35,
        color: '#10b981',
        description: 'Test avant code pour verrouiller le comportement.',
      },
      {
        id: 'pair',
        label: 'Pair prog',
        x: 180,
        y: 145,
        color: '#8b5cf6',
        description: 'Relecture continue et partage de connaissance.',
      },
      {
        id: 'ci',
        label: 'CI',
        x: 290,
        y: 90,
        color: '#f59e0b',
        description: 'Integrer souvent pour detecter les regressions tot.',
      },
      {
        id: 'delivery',
        label: 'Livraison',
        x: 360,
        y: 90,
        color: '#ef4444',
        description: 'Increment frequent exploitable par le client.',
      },
    ],
    edges: [
      ['story', 'tdd'],
      ['story', 'pair'],
      ['tdd', 'ci'],
      ['pair', 'ci'],
      ['ci', 'delivery'],
    ],
    recommendedPath: ['story', 'tdd', 'ci', 'delivery'],
  },
};

const getFallbackMap = (sectionId: string): MapDefinition => ({
  title: 'Carte de comprehension',
  objective: "Structurer la section en logique: contexte -> pratique -> effet.",
  nodes: [
    {
      id: 'a',
      label: 'Contexte',
      x: 80,
      y: 90,
      color: '#0ea5e9',
      description: `Contexte principal de "${sectionId}".`,
    },
    {
      id: 'b',
      label: 'Pratique',
      x: 200,
      y: 45,
      color: '#8b5cf6',
      description: 'Action concrete a appliquer en equipe.',
    },
    {
      id: 'c',
      label: 'Risque',
      x: 200,
      y: 145,
      color: '#f59e0b',
      description: 'Erreur frequente a eviter.',
    },
    {
      id: 'd',
      label: 'Impact',
      x: 320,
      y: 90,
      color: '#10b981',
      description: 'Resultat attendu sur la valeur livree.',
    },
  ],
  edges: [
    ['a', 'b'],
    ['a', 'c'],
    ['b', 'd'],
    ['c', 'd'],
  ],
  recommendedPath: ['a', 'b', 'd'],
});

export const StrategicImageMap = ({ sectionId }: StrategicImageMapProps) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [path, setPath] = useState<string[]>([]);
  const [pathSubmitted, setPathSubmitted] = useState(false);

  const mapData = useMemo(() => SECTION_MAPS[sectionId] ?? getFallbackMap(sectionId), [sectionId]);
  const selectedNode = mapData.nodes.find((node) => node.id === selectedNodeId) ?? null;

  const appendToPath = (nodeId: string) => {
    setPathSubmitted(false);
    setSelectedNodeId(nodeId);
    setPath((prev) => {
      if (prev.includes(nodeId)) return prev;
      return [...prev, nodeId];
    });
  };

  const pathMatches =
    path.length === mapData.recommendedPath.length &&
    mapData.recommendedPath.every((nodeId, idx) => path[idx] === nodeId);

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">Carte strategique interactive</p>
          <p className="text-sm font-semibold text-slate-800">{mapData.title}</p>
          <p className="text-[11px] text-slate-500 mt-1">{mapData.objective}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setSelectedNodeId(null);
            setPath([]);
            setPathSubmitted(false);
          }}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] text-slate-600"
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-2">
          <svg viewBox="0 0 400 190" className="w-full h-auto">
            <defs>
              <linearGradient id="mapBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#eff6ff" />
                <stop offset="100%" stopColor="#f8fafc" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="400" height="190" rx="14" fill="url(#mapBg)" />

            {mapData.edges.map(([from, to]) => {
              const fromNode = mapData.nodes.find((node) => node.id === from);
              const toNode = mapData.nodes.find((node) => node.id === to);
              if (!fromNode || !toNode) return null;
              const active = path.includes(from) && path.includes(to);
              return (
                <line
                  key={`${from}-${to}`}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={active ? '#2563eb' : '#cbd5e1'}
                  strokeWidth={active ? 2.5 : 1.5}
                  strokeDasharray={active ? '0' : '4 4'}
                />
              );
            })}

            {mapData.nodes.map((node) => {
              const selected = node.id === selectedNodeId;
              const inPath = path.includes(node.id);
              return (
                <g key={node.id} onClick={() => appendToPath(node.id)} style={{ cursor: 'pointer' }}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={selected ? 23 : 20}
                    fill={selected || inPath ? node.color : `${node.color}22`}
                    stroke={node.color}
                    strokeWidth={selected ? 2.5 : 1.5}
                  />
                  <text
                    x={node.x}
                    y={node.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="8.8"
                    fontFamily="Space Grotesk, sans-serif"
                    fontWeight="700"
                    fill={selected || inPath ? '#ffffff' : node.color}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="space-y-3">
          <div className="rounded-lg border border-slate-100 bg-white p-3 min-h-[95px]">
            {selectedNode ? (
              <>
                <p className="text-[10px] font-semibold text-slate-700">{selectedNode.label}</p>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{selectedNode.description}</p>
              </>
            ) : (
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Clique un noeud pour lire son role dans le raisonnement.
              </p>
            )}
          </div>

          <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
            <p className="text-[10px] font-semibold text-slate-600 mb-1">Parcours construit</p>
            <p className="text-[11px] text-slate-700 leading-relaxed">
              {path.length
                ? path
                    .map((id) => mapData.nodes.find((node) => node.id === id)?.label ?? id)
                    .join(' -> ')
                : 'Aucun noeud selectionne'}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPathSubmitted(true)}
                disabled={!path.length}
                className="rounded-md bg-slate-900 px-2.5 py-1 text-[10px] font-semibold text-white disabled:opacity-40"
              >
                Evaluer le parcours
              </button>
              <button
                type="button"
                onClick={() => {
                  setPath([]);
                  setPathSubmitted(false);
                }}
                className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-600"
              >
                Vider
              </button>
            </div>
            {pathSubmitted && (
              <p className={`text-[10px] font-semibold mt-2 ${pathMatches ? 'text-emerald-700' : 'text-amber-700'}`}>
                {pathMatches
                  ? 'Parcours coherent: ton raisonnement suit la logique attendue.'
                  : "Parcours partiel ou desordonne. Essaie d'aller du contexte vers l'impact."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
