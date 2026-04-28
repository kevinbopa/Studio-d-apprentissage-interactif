import { Link } from 'react-router-dom';
import { courseModules } from '../../data/modules';

export const ChapterOverview = () => (
  <section>
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-display text-xl font-bold text-slate-900">Chapitres</h3>
      <span className="text-[11px] text-slate-400">{courseModules.length} modules</span>
    </div>

    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {courseModules.map((module, index) => (
        <Link
          key={module.id}
          to="/cours"
          className={`group block rounded-2xl border p-5 transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 ${
            index === 0
              ? 'border-brand-200 bg-brand-50'
              : 'border-slate-100 bg-white hover:border-slate-200'
          }`}
        >
          <p className={`text-[9px] font-semibold uppercase tracking-[0.16em] mb-2 ${index === 0 ? 'text-brand-600' : 'text-slate-400'}`}>
            {module.id}
          </p>
          <h4 className={`text-sm font-semibold leading-snug mb-2 ${index === 0 ? 'text-brand-900' : 'text-slate-900'}`}>
            {module.title}
          </h4>
          <p className={`text-[11px] leading-relaxed mb-4 ${index === 0 ? 'text-brand-700' : 'text-slate-500'}`}>
            {module.shortDescription}
          </p>
          <div className={`flex items-center justify-between text-[10px] pt-3 border-t ${index === 0 ? 'border-brand-200 text-brand-600' : 'border-slate-100 text-slate-400'}`}>
            <span>{module.sections.length} sections</span>
            <span>{module.estimatedMinutes} min</span>
          </div>
        </Link>
      ))}
    </div>
  </section>
);
