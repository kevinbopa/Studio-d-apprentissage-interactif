import { Link } from 'react-router-dom';
import { BookOpenCheck, Code2, Network, ScrollText } from 'lucide-react';
import { useLearning } from '../context/learning-context';
import { codeExercises } from '../data/code-exercises';
import { courseModules } from '../data/modules';
import { quizQuestions } from '../data/questions';
import { ChapterOverview } from '../components/home/chapter-overview';
import { Hero } from '../components/home/hero';
import { ProgressPill } from '../components/ui/progress-pill';

const quickLinks = [
  { to: '/quiz', title: 'Quiz interactifs', description: 'Feedback immédiat, score par chapitre et reprise rapide.', icon: ScrollText },
  { to: '/examens', title: 'Mode examen', description: 'Simulation pratique/examen avec minuterie et analyse par thème.', icon: BookOpenCheck },
  { to: '/exercices-code', title: 'Code Lab', description: 'Validation automatique, tests passés/échoués, correction guidée.', icon: Code2 },
  { to: '/graphify', title: 'Knowledge Graph', description: 'Navigation relationnelle entre concepts, pratiques et questions.', icon: Network },
];

export const HomePage = () => {
  const { completedSections, solvedCodeExercises, examAttempts, quizScores } = useLearning();

  const totalSections = courseModules.flatMap((m) => m.sections).length;
  const completedChapterQuizzes = Object.values(quizScores).filter((s) => s >= 70).length;
  const chapterTotal = new Set(quizQuestions.map((q) => q.chapterId)).size;

  return (
    <div className="space-y-6 max-w-5xl">
      <Hero />

      {/* Stats */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <ProgressPill label="Sections maîtrisées" value={`${completedSections.length}/${totalSections}`} accent />
        <ProgressPill label="Quiz validés" value={`${completedChapterQuizzes}/${chapterTotal}`} />
        <ProgressPill label="Code exercises" value={`${solvedCodeExercises.length}/${codeExercises.length}`} />
        <ProgressPill label="Tentatives examen" value={`${examAttempts}`} />
      </div>

      <ChapterOverview />

      {/* Quick links */}
      <section>
        <h3 className="font-display text-xl font-bold text-slate-900 mb-4">Outils de préparation</h3>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {quickLinks.map((entry) => (
            <Link
              key={entry.to}
              to={entry.to}
              className="group block rounded-2xl border border-slate-100 bg-white p-5 transition-all duration-200 hover:border-brand-200 hover:shadow-card-hover hover:-translate-y-0.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 mb-4">
                <entry.icon className="h-4 w-4 text-brand-600" />
              </div>
              <h4 className="text-sm font-semibold text-slate-900 mb-1.5">{entry.title}</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed mb-4">{entry.description}</p>
              <span className="text-[11px] font-semibold text-brand-600 group-hover:underline underline-offset-2">
                Ouvrir →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
