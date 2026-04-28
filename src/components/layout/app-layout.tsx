import { RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { appRoutes } from '../../app/routes';
import { useLearning } from '../../context/learning-context';
import { codeExercises } from '../../data/code-exercises';
import { courseModules } from '../../data/modules';
import { quizQuestions } from '../../data/questions';
import { Breadcrumbs } from './breadcrumbs';
import { Sidebar } from './sidebar';

export const AppLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { completedSections, quizScores, solvedCodeExercises, examAttempts, lastExamScore, resetProgress } =
    useLearning();

  const globalProgress = useMemo(() => {
    const totalSections = courseModules.flatMap((m) => m.sections).length;
    const chapterIds = [...new Set(quizQuestions.map((q) => q.chapterId))];
    const completedQuizCount = chapterIds.filter((id) => (quizScores[id] ?? 0) >= 70).length;
    const totalUnits = totalSections + chapterIds.length + codeExercises.length + 1;
    const doneUnits =
      completedSections.length + completedQuizCount + solvedCodeExercises.length + (examAttempts > 0 ? 1 : 0);
    return Math.round((doneUnits / totalUnits) * 100);
  }, [completedSections.length, examAttempts, quizScores, solvedCodeExercises.length]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-[1440px]">
        {/* Desktop sidebar */}
        <div className="hidden w-64 shrink-0 lg:block">
          <Sidebar progressPercent={globalProgress} />
        </div>

        {/* Main content */}
        <div className="flex min-h-screen flex-1 flex-col min-w-0">
          {/* Topbar */}
          <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur-sm">
            <div className="flex items-center justify-between px-6 py-3 gap-4">
              <div className="flex items-center gap-3">
                {/* Mobile menu toggle */}
                <button
                  className="rounded-lg border border-slate-200 p-1.5 text-slate-500 lg:hidden hover:bg-slate-50"
                  onClick={() => setMobileMenuOpen((v) => !v)}
                  type="button"
                  aria-label="Menu"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <Breadcrumbs />
              </div>

              <div className="flex items-center gap-3">
                {lastExamScore > 0 && (
                  <div className="hidden rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 text-right sm:block">
                    <p className="text-[9px] uppercase tracking-[0.15em] text-slate-400">Dernier examen</p>
                    <p className="text-base font-semibold text-slate-900 leading-tight">{lastExamScore}%</p>
                  </div>
                )}
                <button
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-[12px] text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors"
                  onClick={resetProgress}
                  type="button"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Réinitialiser
                </button>
              </div>
            </div>

            {/* Mobile nav */}
            {mobileMenuOpen && (
              <div className="flex flex-col gap-0.5 border-t border-slate-100 bg-white p-2 lg:hidden">
                {appRoutes.map((route) => (
                  <NavLink
                    key={route.path}
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-2 text-[12px] font-medium transition-colors ${
                        isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'
                      }`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                    to={route.path}
                  >
                    {route.label}
                  </NavLink>
                ))}
              </div>
            )}
          </header>

          {/* Page content */}
          <main className="flex-1 p-6">
            <Outlet />
          </main>

          {/* Footer */}
          <footer className="border-t border-slate-100 bg-white px-6 py-4">
            <p className="text-[11px] text-slate-400">
              GLO-2003 — Agilité et Extreme Programming · Université Laval
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};
