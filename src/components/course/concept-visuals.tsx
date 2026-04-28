import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';

interface ConceptVisualsProps {
  sectionId: string;
}

const MANIFESTO_CARDS = [
  {
    id: 'v1',
    left: 'Individus et interactions',
    right: 'Processus et outils',
    detail:
      "Les echanges directs entre membres d'equipe reduisent les ambiguities plus vite qu'un processus strict.",
    color: 'border-brand-200 bg-brand-50',
    labelColor: 'text-brand-600',
    textColor: 'text-brand-800',
  },
  {
    id: 'v2',
    left: 'Logiciel fonctionnel',
    right: 'Documentation exhaustive',
    detail:
      'Le progres se mesure d abord sur un logiciel utilisable. La documentation reste utile, mais secondaire.',
    color: 'border-emerald-200 bg-emerald-50',
    labelColor: 'text-emerald-600',
    textColor: 'text-emerald-800',
  },
  {
    id: 'v3',
    left: 'Collaboration client',
    right: 'Negociation contractuelle',
    detail:
      'Le client participe en continu aux arbitrages produit, pas seulement lors de la signature initiale.',
    color: 'border-sky-200 bg-sky-50',
    labelColor: 'text-sky-600',
    textColor: 'text-sky-800',
  },
  {
    id: 'v4',
    left: 'Adaptation au changement',
    right: "Suivi d'un plan",
    detail:
      "Le plan est une hypothese de depart. L'adaptation rapide est un avantage de competitivite.",
    color: 'border-amber-200 bg-amber-50',
    labelColor: 'text-amber-600',
    textColor: 'text-amber-800',
  },
];

const MANIFESTO_SCENARIO = {
  prompt:
    "Scenario: le client change une priorite majeure apres deux iterations. Quelle valeur guide le mieux la decision ?",
  choices: [
    'Suivre strictement le plan initial',
    'Bloquer la demande jusqu a la renegociation contractuelle',
    'Adapter le backlog avec le client pour maximiser la valeur livree',
    'Reporter tout changement a la fin du projet',
  ],
  correct: 'Adapter le backlog avec le client pour maximiser la valeur livree',
};

const ManifestoValues = () => {
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const [choice, setChoice] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          Valeurs du manifeste - cliquer pour la nuance
        </p>
        <button
          type="button"
          onClick={() => {
            setFlippedId(null);
            setChoice(null);
            setSubmitted(false);
          }}
          className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-slate-600 transition-colors"
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {MANIFESTO_CARDS.map((card, index) => (
          <motion.button
            key={card.id}
            type="button"
            onClick={() => setFlippedId(flippedId === card.id ? null : card.id)}
            whileHover={{ y: -2 }}
            className={`rounded-xl border p-4 text-left transition-all ${card.color}`}
          >
            <p className={`text-[9px] font-semibold uppercase tracking-[0.12em] mb-2 ${card.labelColor}`}>
              Valeur {index + 1}
            </p>
            <p className={`text-sm font-semibold ${card.textColor}`}>{card.left}</p>
            <p className={`text-[10px] opacity-50 my-1 ${card.textColor}`}>plus que</p>
            <p className={`text-[11px] line-through opacity-50 ${card.textColor}`}>{card.right}</p>

            <AnimatePresence>
              {flippedId === card.id && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`text-[11px] mt-3 pt-3 border-t border-current border-opacity-20 leading-relaxed ${card.textColor}`}
                >
                  {card.detail}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
        <p className="text-[11px] font-medium text-slate-700 mb-2">{MANIFESTO_SCENARIO.prompt}</p>
        <div className="grid gap-2">
          {MANIFESTO_SCENARIO.choices.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setChoice(item)}
              className={`rounded-md border px-2.5 py-2 text-left text-[11px] transition-all ${
                choice === item ? 'border-brand-300 bg-brand-50 text-brand-700' : 'border-slate-200 bg-white text-slate-600'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            disabled={!choice}
            className="rounded-md bg-slate-900 px-2.5 py-1.5 text-[10px] font-semibold text-white disabled:opacity-40"
          >
            Verifier
          </button>
          {submitted && (
            <p className={`text-[10px] font-semibold ${choice === MANIFESTO_SCENARIO.correct ? 'text-emerald-700' : 'text-rose-600'}`}>
              {choice === MANIFESTO_SCENARIO.correct
                ? 'Correct - adaptation + collaboration client.'
                : 'A revoir - la bonne logique est adaptation guidee par valeur client.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const XP_PRACTICE_CHAIN = [
  'User stories claires',
  'TDD',
  'Pair programming',
  'Integration continue',
  'Refactoring',
  'Livraison frequente',
];

const XpFlowBuilder = () => {
  const [path, setPath] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (item: string) => {
    setSubmitted(false);
    setPath((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]));
  };

  const isValid =
    path.length === XP_PRACTICE_CHAIN.length &&
    XP_PRACTICE_CHAIN.every((item, index) => path[index] === item);

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 space-y-4">
      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">
        Simulation XP - construire une sequence coherente
      </p>

      <div className="grid gap-2 md:grid-cols-2">
        {XP_PRACTICE_CHAIN.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => toggle(item)}
            className={`rounded-lg border px-3 py-2 text-left text-[11px] transition-all ${
              path.includes(item)
                ? 'border-brand-300 bg-brand-50 text-brand-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
        <p className="text-[10px] text-slate-400 mb-1">Ta sequence:</p>
        <p className="text-[11px] text-slate-700 leading-relaxed">
          {path.length ? path.join(' -> ') : 'Aucune etape selectionnee'}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="rounded-md bg-slate-900 px-2.5 py-1.5 text-[10px] font-semibold text-white"
        >
          Valider la sequence
        </button>
        <button
          type="button"
          onClick={() => {
            setPath([]);
            setSubmitted(false);
          }}
          className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-semibold text-slate-600"
        >
          Recommencer
        </button>
      </div>
      {submitted && (
        <p className={`text-[10px] font-semibold ${isValid ? 'text-emerald-700' : 'text-amber-700'}`}>
          {isValid
            ? 'Sequence solide: elle maximise le feedback rapide.'
            : "Sequence partielle ou desordonnee. Astuce: va de la valeur client vers la qualite continue."}
        </p>
      )}
    </div>
  );
};

const TDD_STEPS = [
  {
    id: 'red',
    label: 'Red',
    description: "Ecrire un test qui echoue pour decrire le comportement attendu.",
    code: 'expect(add(2, 3)).toBe(5); // echec initial',
  },
  {
    id: 'green',
    label: 'Green',
    description: 'Coder le minimum pour faire passer le test.',
    code: 'function add(a, b) { return a + b; }',
  },
  {
    id: 'refactor',
    label: 'Refactor',
    description: 'Ameliorer la structure sans changer le comportement externe.',
    code: 'const add = (a, b) => a + b; // meme comportement, code plus propre',
  },
];

const TddCycle = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5">
      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400 mb-4">
        Cycle TDD - animation pas a pas
      </p>
      <div className="grid gap-2 md:grid-cols-3">
        {TDD_STEPS.map((step, index) => (
          <button
            key={step.id}
            type="button"
            onClick={() => setActive(index)}
            className={`rounded-lg border px-3 py-2 text-left transition-all ${
              active === index
                ? 'border-brand-300 bg-brand-50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <p className={`text-[11px] font-semibold ${active === index ? 'text-brand-700' : 'text-slate-700'}`}>
              {step.label}
            </p>
            <p className="text-[10px] text-slate-500 mt-1">{step.description}</p>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={TDD_STEPS[active].id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="mt-3 rounded-lg border border-slate-800 bg-slate-950 p-3"
        >
          <p className="text-[10px] text-slate-400 mb-1">Exemple code</p>
          <code className="block text-[11px] text-emerald-300 font-mono leading-relaxed">{TDD_STEPS[active].code}</code>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const SCRUM_EVENTS = [
  {
    id: 'planning',
    label: 'Sprint planning',
    detail: "Selectionner l'objectif de sprint et les items engages.",
  },
  {
    id: 'daily',
    label: 'Daily scrum',
    detail: "Synchroniser rapidement: blocages, priorites du jour, adaptation micro.",
  },
  {
    id: 'review',
    label: 'Sprint review',
    detail: 'Presenter un increment concret et collecter le feedback des parties prenantes.',
  },
  {
    id: 'retro',
    label: 'Retrospective',
    detail: "Choisir des actions d'amelioration pour le sprint suivant.",
  },
];

const ScrumTimeline = () => {
  const [active, setActive] = useState('planning');
  const event = SCRUM_EVENTS.find((item) => item.id === active) ?? SCRUM_EVENTS[0];

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5">
      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400 mb-4">
        Flux scrum - cliquer chaque evenement
      </p>
      <div className="grid gap-2 md:grid-cols-4">
        {SCRUM_EVENTS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            className={`rounded-lg border px-2.5 py-2 text-[11px] font-semibold transition-all ${
              active === item.id
                ? 'border-brand-300 bg-brand-50 text-brand-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-slate-100 bg-slate-50 p-3">
        <p className="text-[10px] text-slate-400 mb-1">Focus</p>
        <p className="text-[11px] text-slate-700 leading-relaxed">{event.detail}</p>
      </div>
    </div>
  );
};

const resolveVisual = (sectionId: string) => {
  if (sectionId === 'manifesto-values') return <ManifestoValues />;
  if (sectionId === 'xp-practices' || sectionId === 'xp-values') return <XpFlowBuilder />;
  if (sectionId === 'xp-cycle') return <TddCycle />;
  return <ScrumTimeline />;
};

export const ConceptVisuals = ({ sectionId }: ConceptVisualsProps) => {
  const visual = useMemo(() => resolveVisual(sectionId), [sectionId]);

  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400 mb-2">Visuel interactif guide</p>
      {visual}
    </div>
  );
};
