import { Link, useLocation } from 'react-router-dom';
import { appRoutes } from '../../app/routes';

const routeMap = Object.fromEntries(appRoutes.map((r) => [r.path, r.label]));

export const Breadcrumbs = () => {
  const location = useLocation();
  const crumbs = location.pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center gap-1.5 text-[11px] text-slate-400" aria-label="Fil d'Ariane">
      <Link className="hover:text-slate-700 transition-colors" to="/">Catalogue</Link>
      {crumbs.map((crumb, index) => {
        const path = `/${crumbs.slice(0, index + 1).join('/')}`;
        const isLast = index === crumbs.length - 1;
        const label = routeMap[path] ?? crumb;
        return (
          <span key={path} className="flex items-center gap-1.5">
            <span className="text-slate-200">/</span>
            {isLast ? (
              <span className="font-medium text-slate-700">{label}</span>
            ) : (
              <Link className="hover:text-slate-700 transition-colors" to={path}>{label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};
