# Plateforme éducative interactive - GLO-2003

Plateforme web moderne (React + Vite + TypeScript + Tailwind) pour transformer les notes de cours et les questions d'examen en expérience d'apprentissage interactive.

## Fonctionnalités incluses

- Landing page premium avec accès rapide
- Cours modulaire structuré (définitions, explications simplifiées/détaillées, exemples, erreurs fréquentes, résumé)
- Visualisations pédagogiques interactives (timeline, comparaisons, carte conceptuelle)
- Bibliothèque vidéo liée aux concepts
- Quiz interactifs (choix unique/multiples, feedback immédiat, score par chapitre)
- Simulateur d'examen (mode pratique / mode examen, minuterie, score global, répartition par thème)
- Code Lab (validation automatique simulée + architecture prête à brancher un vrai exécuteur)
- Révision intelligente (flashcards, pièges, notions critiques, checklist)
- Graphe de connaissances Graphify-ready (noeuds, arêtes, liens vers questions d'examen)
- Progression persistée en localStorage

## Stack technique

- React 19
- Vite 8
- TypeScript
- Tailwind CSS
- React Router
- Framer Motion

## Lancer le projet

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
npm run preview
```

Mettre à jour Graphify depuis `agilite_xp_source.md`:

```bash
npm run graphify:update
```

## Arborescence

```text
src/
  app/
    app-routes.tsx
    routes.ts
  components/
    code/
    course/
    exam/
    graph/
    home/
    layout/
    quiz/
    revision/
    ui/
    videos/
  context/
    learning-context.tsx
  data/
    modules.ts
    questions.ts
    exams.ts
    code-exercises.ts
    videos.ts
    revision.ts
    knowledge-graph.ts
  pages/
    home-page.tsx
    course-page.tsx
    quiz-page.tsx
    exam-page.tsx
    code-lab-page.tsx
    revision-page.tsx
    graph-page.tsx
```

## Modifier le contenu (édition simple)

- Ajouter/modifier des chapitres: `src/data/modules.ts`
- Ajouter/modifier des quiz: `src/data/questions.ts`
- Ajouter/modifier des questions d'examen: `src/data/exams.ts`
- Ajouter/modifier des exercices de code: `src/data/code-exercises.ts`
- Ajouter/modifier les vidéos: `src/data/videos.ts`
- Ajouter/modifier révision/flashcards/checklist: `src/data/revision.ts`
- Étendre le graphe de connaissances: `src/data/knowledge-graph.ts`
- Brief génération vidéo NotebookLM: `docs/notebookllm-videos-agilite-xp.md`

## Renforcer la correction automatique de code

Version actuelle: validation locale simulée dans `src/components/code/code-lab.tsx`.

Pour passer à une correction robuste:

1. Remplacer `getFunction(...)` par un appel API sécurisé (sandbox serveur).
2. Exécuter des tests unitaires isolés côté backend.
3. Retourner un rapport structuré (tests pass/fail + feedback pédagogique).
4. Conserver le même contrat de données (`testCases`, `requiredTokens`) pour compatibilité.

## Notes Graphify

Le module `src/data/knowledge-graph.ts` expose déjà une structure `nodes + edges` standard.
Il est prêt pour:

- import dans Graphify
- rendu par une librairie de graphes (ex: Cytoscape, D3, Sigma)
- navigation relationnelle avancée (filtrage, centralité, parcours)

Le dossier `graphify-out/` est synchronisable avec le corpus markdown:

- `graphify-out/build_graph.py`: extrait les titres du cours en nœuds/arêtes.
- `graphify-out/sync_outputs.py`: reconstruit `graph.json` + `GRAPH_REPORT.md`.
- Commande unique: `npm run graphify:update`.
