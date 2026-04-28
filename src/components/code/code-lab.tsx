import { CheckCircle2, CircleAlert, FlaskConical, Lightbulb, RotateCcw, Terminal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLearning } from '../../context/learning-context';
import { codeExercises } from '../../data/code-exercises';

interface TestResult {
  passed: boolean;
  label: string;
  details: string;
  isWarning?: boolean;
}

const deepEqual = (left: unknown, right: unknown): boolean => JSON.stringify(left) === JSON.stringify(right);

const getFunction = (sourceCode: string, functionName: string): ((...args: unknown[]) => unknown) | null => {
  try {
    const fn = new Function(`${sourceCode}; return typeof ${functionName} === 'function' ? ${functionName} : null;`)();
    return typeof fn === 'function' ? fn : null;
  } catch {
    return null;
  }
};

const DIFFICULTY_COLORS: Record<string, string> = {
  easy:   'bg-emerald-50 text-emerald-700 border-emerald-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  hard:   'bg-rose-50 text-rose-700 border-rose-200',
};

export const CodeLab = () => {
  const [activeExerciseId, setActiveExerciseId] = useState(codeExercises[0]?.id ?? '');
  const [draftCode, setDraftCode] = useState(codeExercises[0]?.starterCode ?? '');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [analysisMessage, setAnalysisMessage] = useState('Execute les tests pour obtenir un diagnostic pedagogique.');
  const [analysisState, setAnalysisState] = useState<'idle' | 'success' | 'error'>('idle');
  const [showSolution, setShowSolution] = useState(false);

  const { solvedCodeExercises, markCodeExerciseSolved } = useLearning();

  const activeExercise = useMemo(
    () => codeExercises.find((exercise) => exercise.id === activeExerciseId) ?? codeExercises[0],
    [activeExerciseId]
  );

  const selectExercise = (id: string) => {
    const ex = codeExercises.find((e) => e.id === id);
    if (!ex) return;
    setActiveExerciseId(id);
    setDraftCode(ex.starterCode);
    setTestResults([]);
    setAnalysisMessage('Execute les tests pour obtenir un diagnostic pedagogique.');
    setAnalysisState('idle');
    setShowSolution(false);
  };

  const runValidation = () => {
    const functionMatch = activeExercise.starterCode.match(/function\s+([A-Za-z0-9_]+)/);
    const functionName = functionMatch?.[1];

    if (!functionName) {
      setAnalysisMessage('Impossible de detecter le nom de fonction attendu dans le gabarit.');
      setAnalysisState('error');
      return;
    }

    const extractedFunction = getFunction(draftCode, functionName);

    if (!extractedFunction) {
      setAnalysisMessage('Le code ne compile pas. Verifie la syntaxe JavaScript avant de retester.');
      setAnalysisState('error');
      setTestResults([]);
      return;
    }

    const tokenIssues = activeExercise.requiredTokens.filter((token) => !draftCode.includes(token));

    const results: TestResult[] = activeExercise.testCases.map((testCase, index) => {
      try {
        const output = extractedFunction(...testCase.input);
        const passed = deepEqual(output, testCase.expected);
        return {
          passed,
          label: `Test ${index + 1}`,
          details: passed
            ? `OK -- ${JSON.stringify(testCase.input)} -> ${JSON.stringify(testCase.expected)}`
            : `Attendu: ${JSON.stringify(testCase.expected)} / Recu: ${JSON.stringify(output)}`,
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Erreur inconnue';
        return { passed: false, label: `Test ${index + 1}`, details: `Exception: ${message}` };
      }
    });

    if (tokenIssues.length) {
      results.push({
        passed: false,
        isWarning: true,
        label: 'Style attendu',
        details: `Token(s) recommande(s) absent(s): ${tokenIssues.join(', ')}`,
      });
    }

    setTestResults(results);

    const hardFails = results.filter((r) => !r.passed && !r.isWarning).length;
    const solved = hardFails === 0;

    if (solved) {
      setAnalysisMessage("Excellent -- tous les tests passent. Tu peux comparer avec la correction officielle pour voir d'autres approches.");
      setAnalysisState('success');
      markCodeExerciseSolved(activeExercise.id);
    } else {
      setAnalysisMessage("Des tests echouent. Utilise les indices et cible d'abord les cas limites signales dans les erreurs.");
      setAnalysisState('error');
    }
  };

  const passedCount = testResults.filter((r) => r.passed).length;
  const totalTests = testResults.length;

  return (
    <div className="grid gap-4 xl:grid-cols-[220px_1fr] h-full">

      {/* Exercise sidebar */}
      <aside className="rounded-2xl border border-slate-100 bg-white overflow-hidden flex flex-col">
        <div className="px-4 py-3 border-b border-slate-100">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">Exercices</p>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {codeExercises.map((exercise) => {
            const solved = solvedCodeExercises.includes(exercise.id);
            const active = exercise.id === activeExercise.id;
            return (
              <button
                key={exercise.id}
                type="button"
                onClick={() => selectExercise(exercise.id)}
                className={`w-full rounded-xl px-3 py-2.5 text-left transition-all ${
                  active
                    ? 'bg-brand-50 border border-brand-200'
                    : 'border border-transparent hover:border-slate-100 hover:bg-slate-50'
                }`}
              >
                <p className={`text-[9px] font-semibold uppercase tracking-[0.12em] mb-0.5 ${active ? 'text-brand-600' : 'text-slate-400'}`}>
                  {exercise.concept}
                </p>
                <p className={`text-[11px] font-semibold leading-snug ${active ? 'text-brand-800' : 'text-slate-700'}`}>
                  {exercise.title}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className={`rounded-full border px-1.5 py-0.5 text-[8px] font-semibold ${DIFFICULTY_COLORS[(exercise as any).difficulty ?? 'easy']}`}>
                    {(exercise as any).difficulty ?? 'easy'}
                  </span>
                  {solved && (
                    <span className="flex items-center gap-0.5 text-[9px] text-emerald-600 font-medium">
                      <CheckCircle2 className="h-2.5 w-2.5" />
                      Resolu
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main editor + results */}
      <div className="flex flex-col gap-4 min-w-0">

        {/* Header */}
        <div className="rounded-2xl border border-slate-100 bg-white px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-600 mb-1">
                {activeExercise.concept}
              </p>
              <h2 className="font-display text-xl font-bold text-slate-900">{activeExercise.title}</h2>
              <p className="mt-1 text-sm text-slate-500 leading-relaxed">{activeExercise.statement}</p>
            </div>
            {testResults.length > 0 && (
              <div className={`shrink-0 rounded-xl border px-3 py-2 text-center ${
                analysisState === 'success' ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
              }`}>
                <p className={`text-xl font-bold ${analysisState === 'success' ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {passedCount}/{totalTests}
                </p>
                <p className={`text-[9px] font-semibold uppercase tracking-[0.1em] ${analysisState === 'success' ? 'text-emerald-600' : 'text-rose-500'}`}>
                  tests
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Code editor - dark */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </div>
              <span className="ml-2 text-[10px] font-mono text-slate-500">solution.js</span>
            </div>
            <button
              type="button"
              onClick={() => { setDraftCode(activeExercise.starterCode); setShowSolution(false); }}
              className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-300 transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              Reinitialiser
            </button>
          </div>
          <textarea
            className="h-56 w-full resize-none bg-transparent px-5 py-4 font-mono text-[13px] leading-relaxed text-slate-100 outline-none placeholder:text-slate-600"
            onChange={(e) => { setDraftCode(e.target.value); setShowSolution(false); }}
            spellCheck={false}
            value={showSolution ? activeExercise.solutionCode : draftCode}
            placeholder="// Ecris ta solution ici..."
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={runValidation}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
          >
            <Terminal className="h-4 w-4" />
            Executer les tests
          </button>
          <button
            type="button"
            onClick={() => setShowSolution((s) => !s)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <FlaskConical className="h-4 w-4" />
            {showSolution ? 'Masquer la correction' : 'Voir une correction'}
          </button>
        </div>

        {/* Diagnostic */}
        <div className={`rounded-2xl border p-4 ${
          analysisState === 'success'
            ? 'border-emerald-200 bg-emerald-50'
            : analysisState === 'error'
            ? 'border-rose-200 bg-rose-50'
            : 'border-slate-100 bg-slate-50'
        }`}>
          <p className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] mb-2 ${
            analysisState === 'success' ? 'text-emerald-700' : analysisState === 'error' ? 'text-rose-600' : 'text-slate-500'
          }`}>
            <Lightbulb className="h-3.5 w-3.5" />
            Diagnostic pedagogique
          </p>
          <p className={`text-sm leading-relaxed ${
            analysisState === 'success' ? 'text-emerald-800' : analysisState === 'error' ? 'text-rose-700' : 'text-slate-600'
          }`}>
            {analysisMessage}
          </p>
        </div>

        {/* Test results */}
        {testResults.length > 0 && (
          <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden">
            <div className="px-4 py-2.5 border-b border-slate-100">
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">Resultats des tests</p>
            </div>
            <div className="divide-y divide-slate-50">
              {testResults.map((result) => (
                <div key={result.label} className="flex items-start gap-3 px-4 py-3">
                  <span className={`mt-0.5 shrink-0 ${
                    result.passed ? 'text-emerald-500' : result.isWarning ? 'text-amber-500' : 'text-rose-400'
                  }`}>
                    {result.passed
                      ? <CheckCircle2 className="h-4 w-4" />
                      : <CircleAlert className="h-4 w-4" />
                    }
                  </span>
                  <div className="min-w-0">
                    <p className={`text-[11px] font-semibold ${
                      result.passed ? 'text-emerald-700' : result.isWarning ? 'text-amber-700' : 'text-rose-600'
                    }`}>
                      {result.label}
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5 leading-relaxed break-all">{result.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hints */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-700 mb-2">Indices</p>
          <div className="space-y-1">
            {activeExercise.hints.map((hint, i) => (
              <p key={i} className="flex items-start gap-2 text-sm text-amber-800">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-amber-500 shrink-0" />
                {hint}
              </p>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
