import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLearning } from '../../context/learning-context';
import { quizQuestions } from '../../data/questions';
import { calculateQuizScore } from '../../utils/scoring';

const chapterNames: Record<string, string> = {
  'agile-foundations': 'Fondements agiles',
  'xp-core': 'XP Core',
  'process-choice': 'Choix de méthode',
  'exam-synthesis': 'Synthèse examen',
};

export const QuizEngine = () => {
  const [chapter, setChapter] = useState<string>('agile-foundations');
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [validated, setValidated] = useState<Record<string, boolean>>({});
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const { quizScores, setQuizScore } = useLearning();

  const questions = useMemo(() => quizQuestions.filter((q) => q.chapterId === chapter), [chapter]);

  const onToggle = (qId: string, cId: string, type: 'single' | 'multiple') => {
    setAnswers((prev) => {
      const cur = prev[qId] ?? [];
      if (type === 'single') return { ...prev, [qId]: [cId] };
      const next = cur.includes(cId) ? cur.filter((x) => x !== cId) : [...cur, cId];
      return { ...prev, [qId]: next };
    });
  };

  const computeScore = () => {
    const score = calculateQuizScore(questions, answers);
    setFinalScore(score);
    setQuizScore(chapter, score);
  };

  const reset = () => { setAnswers({}); setValidated({}); setFinalScore(null); };

  const handleChapterChange = (val: string) => { setChapter(val); reset(); };

  return (
    <div className="space-y-4 max-w-3xl">
      {/* Header */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 mb-1">Mode quiz</p>
            <h2 className="font-display text-2xl font-bold text-slate-900">QCM avec feedback immédiat</h2>
            <p className="mt-1 text-sm text-slate-500">
              Meilleur score : <span className="font-semibold text-slate-800">{quizScores[chapter] ?? 0}%</span>
            </p>
          </div>

          {/* Chapter tabs */}
          <div className="flex items-center gap-1 rounded-xl border border-slate-100 bg-slate-50 p-1 flex-wrap">
            {Object.entries(chapterNames).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => handleChapterChange(id)}
                className={`rounded-lg px-3 py-1.5 text-[11px] font-medium transition-all ${
                  chapter === id
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-100'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions */}
      {questions.map((q, index) => {
        const selected = answers[q.id] ?? [];
        const isValidated = validated[q.id];
        const expected = q.choices.filter((c) => c.isCorrect).map((c) => c.id);
        const isCorrect =
          selected.length === expected.length && selected.every((id) => expected.includes(id));

        return (
          <article key={q.id} className="rounded-2xl border border-slate-100 bg-white p-6">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Question {index + 1}
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-500">
                  {q.type === 'single' ? 'Choix unique' : 'Choix multiples'}
                </span>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${
                q.difficulty === 'avance' ? 'bg-rose-50 text-rose-600' :
                q.difficulty === 'moyen' ? 'bg-amber-50 text-amber-600' :
                'bg-emerald-50 text-emerald-600'
              }`}>
                {q.difficulty}
              </span>
            </div>

            <p className="text-[15px] font-semibold text-slate-900 leading-snug mb-4">{q.prompt}</p>

            <div className="space-y-2 mb-4">
              {q.choices.map((choice) => {
                const active = selected.includes(choice.id);
                const showResult = isValidated;
                const isRight = choice.isCorrect;
                const isWrong = active && !choice.isCorrect && showResult;

                return (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() => !isValidated && onToggle(q.id, choice.id, q.type)}
                    disabled={isValidated}
                    className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                      showResult && isRight
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                        : isWrong
                        ? 'border-rose-300 bg-rose-50 text-rose-700'
                        : active
                        ? 'border-brand-300 bg-brand-50 text-brand-800'
                        : 'border-slate-100 bg-white text-slate-700 hover:border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {showResult && isRight && <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />}
                      {isWrong && <XCircle className="h-4 w-4 text-rose-400 shrink-0" />}
                      {choice.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2">
              {!isValidated && (
                <button
                  type="button"
                  onClick={() => setValidated((v) => ({ ...v, [q.id]: true }))}
                  disabled={!selected.length}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-all"
                >
                  Vérifier ma réponse
                </button>
              )}
            </div>

            {/* Feedback */}
            {isValidated && (
              <div className={`mt-4 rounded-xl border p-4 text-sm ${
                isCorrect
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                  : 'border-rose-200 bg-rose-50 text-rose-800'
              }`}>
                <p className="font-semibold mb-1">{isCorrect ? 'Bonne réponse.' : 'Réponse incorrecte.'}</p>
                <p className="text-[12px] leading-relaxed opacity-90">{q.globalExplanation}</p>
              </div>
            )}
          </article>
        );
      })}

      {/* Score */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <button
            type="button"
            onClick={computeScore}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
          >
            <CheckCircle2 className="h-4 w-4" />
            Calculer le score
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Recommencer
          </button>
        </div>

        {finalScore !== null && (
          <div className="rounded-xl border border-brand-200 bg-brand-50 p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-600 mb-1">Score du chapitre</p>
            <p className="text-4xl font-bold text-brand-700 mb-2">{finalScore}%</p>
            <p className="text-sm text-brand-700">
              {finalScore >= 70
                ? 'Très bon niveau. Passe au mode examen pour te tester.'
                : 'Consolide ce chapitre via le cours et la révision intelligente.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
