import { ArrowRight, BookOpen, GraduationCap, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { CourseEntry } from '../types/content';
import { courseCatalog } from '../data/catalog';

const CourseCard = ({ course }: { course: CourseEntry }) => {
  const isActive = course.status === 'active';

  const inner = (
    <div
      className={`group flex h-full flex-col rounded-2xl border bg-white p-6 transition-all duration-200 ${
        isActive
          ? 'border-slate-200 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer'
          : 'border-slate-100 opacity-50 cursor-default select-none'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${isActive ? 'bg-brand-50' : 'bg-slate-100'}`}>
          {isActive ? <BookOpen className="h-5 w-5 text-brand-600" /> : <Lock className="h-5 w-5 text-slate-400" />}
        </div>
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-400'}`}>
          {isActive ? 'Disponible' : 'Bientôt'}
        </span>
      </div>

      <div className="flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-600 mb-1">{course.code}</p>
        <h3 className="font-display text-lg font-bold leading-snug text-slate-900 mb-1">{course.title}</h3>
        <p className="text-[11px] text-slate-400 mb-3">{course.subtitle}</p>
        <p className="text-sm leading-relaxed text-slate-600">{course.description}</p>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-4">
        {course.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-md bg-slate-50 border border-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">{tag}</span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="text-[11px] text-slate-400">
          {course.semester && <p>{course.semester}</p>}
          {course.moduleCount && <p>{course.moduleCount} modules</p>}
        </div>
        {isActive && (
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2 transition-all">
            Étudier <ArrowRight className="h-4 w-4" />
          </span>
        )}
      </div>
    </div>
  );

  if (isActive && course.entryPath) {
    return <Link to={course.entryPath} className="block h-full">{inner}</Link>;
  }
  return <div className="h-full">{inner}</div>;
};

export const CatalogPage = () => (
  <div className="min-h-screen bg-white">
    <div className="border-b border-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-[11px] font-medium text-brand-700 mb-6">
          <GraduationCap className="h-3.5 w-3.5" />
          Université Laval — Génie logiciel
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
          Studio d'apprentissage interactif
        </h1>
        <p className="mx-auto max-w-xl text-base text-slate-500 leading-relaxed">
          Cours interactifs, quiz avec feedback immédiat, simulations d'examen, exercices de code et graphe de connaissances.
        </p>
      </div>
    </div>

    <div className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-6">Catalogue de cours</p>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {courseCatalog.map((course) => <CourseCard key={course.id} course={course} />)}
      </div>
    </div>

    <div className="border-t border-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-6 text-center text-[11px] text-slate-400">
        Plateforme éducative interactive — Université Laval
      </div>
    </div>
  </div>
);
