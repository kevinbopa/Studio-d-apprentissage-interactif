import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
      <h2 className="font-display text-4xl text-slate-900">Page introuvable</h2>
      <p className="mt-2 text-slate-600">Le contenu demandé n’existe pas dans cette plateforme.</p>
      <Link className="mt-4 inline-block rounded-xl bg-slate-900 px-4 py-2 text-white" to="/">
        Retour à l’accueil
      </Link>
    </section>
  );
};
