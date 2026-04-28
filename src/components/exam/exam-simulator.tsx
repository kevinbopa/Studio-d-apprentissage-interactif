import { AlarmClock, PlayCircle, RotateCcw, Send, TrendingUp } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLearning } from '../../context/learning-context';
import { examQuestions } from '../../data/exams';

const EXAM_DURATION = 45 * 60;

const normalize = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();

const containsKeyword = (resp: string, expected: string) => {
  const r = normalize(resp);
  const keywords = normalize(expected).split(' ').filter((t) => t.length >= 5);
  if (!keywords.length) return false;
  return keywords.filter((k) => r.includes(k)).length >= Math.ceil(keywords.length * 0.35);
};

const fmt = (s: number) =>
  `${Math.floor(s / 60).toString().padStart(2, '0')}:${Math.floor(s % 60).toString().padStart(2, '0')}`;

export const ExamSimulator = () => {
  const [mode, setMode] = useState<'practice' | 'exam'>('practice');
  const [started, setStarted] = useState(false);
  const [remaining, setRemaining] = useState(EXAM_DURATION);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [themeScores, setThemeScores] = useState<Record<string, number>>({});
  const { registerExamAttempt } = useLearning();

  const totalPoints = useMemo(() => examQuestions.reduce((t, q) => t + q.points, 0), []);

  const resetAll = useCallback(() => {
    setStarted(false); setRemaining(EXAM_DURATION); setResponses({});
    setSubmitted(false); setFinalScore(0); setThemeScores({});
  }, []);

  const submitExam = useCallback(() => {
    let achieved = 0;
    const byTheme: Record<string, { scored: number; total: number }> = {};
    examQuestions.forEach((q) => {
      const resp = responses[q.id] ?? '';
      const matches = q.expectedElements.filter((e) => containsKeyword(resp, e)).length;
      const scored = q.points * Math.min(1, matches / q.expectedElements.length);
      achieved += scored;
      byTheme[q.theme] ??= { scored: 0, total: 0 };
      byTheme[q.theme].scored += scored;
      byTheme[q.theme].total += q.points;
    });
    const globalPct = Math.round((achieved / totalPoints) * 100);
    const themePct = Object.fromEntries(
      Object.entries(byTheme).map(([t, v]) => [t, Math.round((v.scored / v.total) * 100)])
    );
    setFinalScore(globalPct);
    setThemeScores(themePct);
    setSubmitted(true);
    setStarted(false);
    registerExamAttempt(globalPct, Object.fromEntries(Object.entries(themePct).map(([t, s]) => [t, 100 - s])));
  }, [registerExamAttempt, responses, totalPoints]);

  useEffect(() => {
    if (mode !== 'exam' || !started || submitted) return;
    const id = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) { window.clearInterval(id); window.setTimeout(() => submitExam(), 0); return 0; }
        return r - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [mode, started, submitExam, submitted]);

  const weakest = Object.entries(themeScores).sort((a, b) => a[1] - b[1]).slice(0, 3);
  const answered = Object.values(responses).filter((r) => r.trim().length > 0).length;

  return (
    <div className="space-y-4 max-w-3xl">
      {/* Header */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 mb-1">Simulation examen</p>
            <h2 className="font-display text-2xl font-bold text-slate-900">Mode pratique &amp; mode examen</h2>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Timer */}
            {mode === 'exam' && started && (
              <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-semibold ${
                remaining < 300 ? 'bg-rose-50 border border-rose-200 text-rose-700' : 'bg-amber-50 border border-amber-200 text-amber-800'
              }`}>
                <AlarmClock className="h-3.5 w-3.5" />
                {fmt(remaining)}
              </div>
            )}

            {/* Mode toggle */}
            <div className="flex items-center gap-1 rounded-xl border border-slate-100 bg-slate-50 p-1">
              {(['practice', 'exam'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => { setMode(m); resetAll(); }}
                  className={`rounded-lg px-3 py-1.5 text-[11px] font-medium transition-all ${
                    mode === m ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {m === 'practice' ? 'Pratique' : 'Examen'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 mt-5">
          {!started && !submitted && (
            <button
              type="button"
              onClick={() => setStarted(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
            >
              <PlayCircle className="h-4 w-4" />
              Commencer
            </button>
          )}
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Réinitialiser
          </button>
          {started && !submitted && (
            <span className="self-center text-[11px] text-slate-400">{answered}/{examQuestions.length} réponses</span>
          )}
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {examQuestions.map((q, index) => (
          <article key={q.id} className="rounded-2xl border border-slate-100 bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Question {index + 1} — {q.theme}
                </span>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                {q.points} pts
              </span>
            </div>

            <p className="text-[15px] font-semibold text-slate-900 leading-snug mb-4">{q.prompt}</p>

            <textarea
              className={`min-h-[100px] w-full rounded-xl border px-4 py-3 text-sm text-slate-800 outline-none transition-all resize-none ${
                !started || submitted
                  ? 'bg-slate-50 border-slate-100 cursor-not-allowed text-slate-500'
                  : 'border-slate-200 bg-white focus:border-brand-300 focus:ring-2 focus:ring-brand-100'
              }`}
              disabled={!started || submitted}
              onChange={(e) => setResponses((p) => ({ ...p, [q.id]: e.target.value }))}
              placeholder={started && !submitted ? 'Structure recommandée : thèse → arguments → exemple → conclusion' : '—'}
              value={responses[q.id] ?? ''}
            />

            {/* Practice rubric */}
            {mode === 'practice' && started && !submitted && (
              <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500 mb-2">Rubrique attendue</p>
                <ul className="space-y-1">
                  {q.rubric.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-[11px] text-slate-600">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-300 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Submit */}
      {started && !submitted && (
        <button
          type="button"
          onClick={submitExam}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
        >
          <Send className="h-4 w-4" />
          Soumettre l'examen
        </button>
      )}

      {/* Results */}
      {submitted && (
        <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-600 mb-2">Résultat global</p>
          <p className="text-5xl font-bold text-brand-700 mb-1">{finalScore}%</p>
          <p className="text-sm text-brand-600 mb-6">
            {finalScore >= 70 ? 'Excellent niveau. Prêt pour l\'examen final.' : 'Cible les thèmes faibles avant ta prochaine tentative.'}
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/70 bg-white p-4">
              <p className="inline-flex items-center gap-2 text-[11px] font-semibold text-slate-700 mb-3">
                <TrendingUp className="h-4 w-4" /> Répartition par thème
              </p>
              <div className="space-y-3">
                {Object.entries(themeScores).map(([theme, score]) => (
                  <div key={theme}>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-600">{theme}</span>
                      <span className="font-semibold text-slate-900">{score}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100">
                      <div
                        className="h-1.5 rounded-full transition-all"
                        style={{
                          width: `${score}%`,
                          background: score >= 70 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#f43f5e',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/70 bg-white p-4">
              <p className="text-[11px] font-semibold text-slate-700 mb-3">Faiblesses prioritaires</p>
              <div className="space-y-2">
                {weakest.map(([theme, score]) => (
                  <div key={theme} className="flex items-center gap-2 text-[11px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
                    <span className="text-slate-600 flex-1">{theme}</span>
                    <span className="font-semibold text-rose-600">{score}%</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-4 leading-relaxed">
                Utilise la section <strong>Révision</strong> pour cibler ces thèmes.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
