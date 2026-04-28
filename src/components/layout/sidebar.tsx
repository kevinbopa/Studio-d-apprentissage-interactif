import {
  BookOpenCheck,
  BrainCircuit,
  Code2,
  Gauge,
  GraduationCap,
  LayoutPanelLeft,
  Network,
  ScrollText,
} from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { appRoutes } from '../../app/routes';

interface SidebarProps {
  progressPercent: number;
}

const icons = [LayoutPanelLeft, BookOpenCheck, Gauge, ScrollText, Code2, GraduationCap, Network];

export const Sidebar = ({ progressPercent }: SidebarProps) => {
  return (
    <aside className="sticky top-0 flex h-screen flex-col border-r border-slate-100 bg-white px-4 py-5">
      {/* Back to catalog */}
      <Link
        to="/"
        className="mb-5 flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-700 transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M7.5 2.5L4.5 6L7.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Catalogue des cours
      </Link>

      {/* Course badge */}
      <div className="mb-5 rounded-xl bg-slate-950 px-4 py-4">
        <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-slate-500 mb-1">GLO-2003</p>
        <h1 className="font-display text-[15px] font-bold text-white leading-snug">Agilité &amp; XP</h1>
        <p className="mt-1 text-[10px] text-slate-400">Hiver 2025</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5">
        {appRoutes.map((route, index) => {
          const Icon = icons[index] ?? BrainCircuit;
          return (
            <NavLink
              key={route.path}
              to={route.path}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-lg px-3 py-2 text-[12px] font-medium transition-all ${
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${isActive ? 'bg-brand-500' : 'bg-slate-200'}`} />
                  <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{route.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Progress */}
      <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-3.5">
        <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-slate-400 mb-1">Progression globale</p>
        <p className="text-2xl font-semibold text-slate-900 mb-2">{progressPercent}%</p>
        <div className="h-1 rounded-full bg-slate-200">
          <div
            className="h-1 rounded-full transition-all duration-500"
            style={{
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, #2a8bff, #fe6018)',
            }}
          />
        </div>
      </div>
    </aside>
  );
};
