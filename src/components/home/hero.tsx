import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => (
  <section className="rounded-2xl border border-slate-100 bg-white p-7 shadow-card">
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-center">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-700 mb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
          Studio premium d'apprentissage
        </div>

        <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 leading-tight md:text-4xl mb-4">
          Maîtrise Agilité + XP<br />
          <span className="text-brand-600">conçue pour l'examen</span>
        </h2>

        <p className="text-sm text-slate-500 leading-relaxed max-w-lg mb-6">
          Parcours interactif structuré : cours progressif, quiz avec feedback immédiat,
          simulation d'examen, exercices de code autocorrigés et graphe de connaissances.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
            to="/cours"
          >
            Démarrer le parcours
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            to="/examens"
          >
            Simuler un examen
          </Link>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="rounded-2xl bg-slate-950 p-6 text-white"
      >
        <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-slate-500 mb-4">Flow pédagogique</p>
        <ol className="space-y-3">
          {[
            'Explorer les notions du simple au complexe',
            'Valider immédiatement avec quiz et feedback',
            'S\'entraîner en mode examen chronométré',
            'Corriger les faiblesses via révision intelligente',
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${i < 2 ? 'bg-brand-500 text-white' : 'bg-white/10 text-slate-500'}`}>
                {i + 1}
              </span>
              <span className="text-[12px] text-slate-300 leading-snug">{step}</span>
            </li>
          ))}
        </ol>
      </motion.div>
    </div>
  </section>
);
