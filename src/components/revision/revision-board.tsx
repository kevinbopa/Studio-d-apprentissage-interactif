import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import {
  confusionPairs,
  criticalNotions,
  examTraps,
  revisionCards,
  revisionChecklist,
} from '../../data/revision';

export const RevisionBoard = () => {
  const [revealedCards, setRevealedCards] = useState<Record<string, boolean>>({});
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) =>
    setRevealedCards((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleCheck = (id: string) =>
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalItems = revisionChecklist.length;

  return (
    <div className="space-y-4 max-w-5xl">

      {/* Header */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 mb-1">Révision intelligente</p>
            <h2 className="font-display text-2xl font-bold text-slate-900">Flashcards &amp; Checklist</h2>
            <p className="mt-1 text-sm text-slate-500">Retourne les cartes, coche tes acquis, identifie tes angles morts.</p>
          </div>
          <div className="shrink-0 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-center">
            <p className="text-2xl font-bold text-slate-900">{checkedCount}/{totalItems}</p>
            <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-400 mt-0.5">checklist</p>
          </div>
        </div>
      </div>

      {/* Flashcards + Checklist */}
      <div className="grid gap-4 xl:grid-cols-[1fr_240px]">

        {/* Flashcards */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400 mb-4">Cartes mémoire — cliquer pour révéler</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {revisionCards.map((card) => {
              const revealed = revealedCards[card.id] ?? false;
              return (
                <motion.button
                  key={card.id}
                  type="button"
                  onClick={() => toggleCard(card.id)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    revealed
                      ? 'border-brand-200 bg-brand-50'
                      : 'border-slate-100 bg-slate-50 hover:border-slate-200'
                  }`}
                >
                  <p className={`text-[9px] font-semibold uppercase tracking-[0.12em] mb-2 ${revealed ? 'text-brand-600' : 'text-slate-400'}`}>
                    {card.category}
                  </p>
                  <p className={`text-sm font-semibold leading-snug ${revealed ? 'text-brand-900' : 'text-slate-800'}`}>
                    {card.front}
                  </p>

                  <AnimatePresence>
                    {revealed ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 pt-3 border-t border-brand-200 text-[12px] text-brand-800 leading-relaxed">
                          {card.back}
                        </p>
                      </motion.div>
                    ) : (
                      <p className="mt-2 text-[10px] text-slate-400 opacity-60">Cliquer pour révéler →</p>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Checklist */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400 mb-1">Checklist pré-examen</p>

          {/* Progress bar */}
          <div className="h-1 rounded-full bg-slate-100 mb-4">
            <motion.div
              className="h-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
              animate={{ width: `${(checkedCount / totalItems) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className="space-y-1">
            {revisionChecklist.map((item) => {
              const checked = checkedItems[item.id] ?? false;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleCheck(item.id)}
                  className={`w-full flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition-all ${
                    checked ? 'bg-emerald-50' : 'hover:bg-slate-50'
                  }`}
                >
                  <span className={`mt-0.5 h-3.5 w-3.5 shrink-0 rounded border transition-all ${
                    checked
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'bg-white border-slate-300'
                  }`}>
                    {checked && (
                      <svg viewBox="0 0 10 10" fill="none" className="h-full w-full">
                        <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className={`text-[11px] leading-snug font-medium transition-colors ${checked ? 'text-emerald-700 line-through opacity-60' : 'text-slate-600'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom row: 3 semantic cards */}
      <div className="grid gap-4 lg:grid-cols-3">

        {/* Critical notions — green */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-700 mb-3">Notions critiques</p>
          <div className="space-y-2">
            {criticalNotions.map((notion, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                <p className="text-[12px] text-emerald-800 leading-snug">{notion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Exam traps — red */}
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-rose-600 mb-3">Pièges fréquents</p>
          <div className="space-y-2">
            {examTraps.map((trap, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
                <p className="text-[12px] text-rose-800 leading-snug">{trap}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Confusion pairs — amber */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-700 mb-3">Concepts confondus</p>
          <div className="space-y-2.5">
            {confusionPairs.map((pair) => (
              <div key={`${pair.a}-${pair.b}`} className="rounded-xl border border-amber-200 bg-white/70 p-3">
                <p className="text-[11px] font-semibold text-amber-900 mb-1">
                  <span className="text-amber-700">{pair.a}</span>
                  <span className="mx-1.5 text-amber-400">vs</span>
                  <span className="text-amber-700">{pair.b}</span>
                </p>
                <p className="text-[11px] text-amber-800 leading-relaxed">{pair.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
