import type { CourseEntry } from '../types/content';

export const courseCatalog: CourseEntry[] = [
  {
    id: 'glo2003-agilite-xp',
    code: 'GLO-2003',
    title: "Agilité et Extreme Programming",
    subtitle: "Méthodes agiles, XP et préparation d'examen",
    description:
      "Approches opportunistes vs systématiques, Manifeste Agile, valeurs et pratiques XP, cycle de développement, suppositions et limites de l'agilité, passage à l'échelle.",
    tags: ['Agile', 'XP', 'Scrum', 'TDD', 'Pair Programming', 'User Stories'],
    status: 'active',
    entryPath: '/accueil',
    professor: "Faculté des sciences et de génie — Université Laval",
    semester: 'Hiver 2025',
    moduleCount: 4
  },
  {
    id: 'glo2004-architectures',
    code: 'GLO-2004',
    title: 'Architectures logicielles',
    subtitle: 'Couches, patterns et qualité du code',
    description:
      "Séparation des responsabilités, architectures en couches, patterns de conception, qualité et maintenabilité du code logiciel.",
    tags: ['Architecture', 'Patterns', 'Clean Code', 'Refactoring'],
    status: 'coming-soon',
    entryPath: null,
    semester: 'Été 2025'
  },
  {
    id: 'glo3013-genie-logiciel',
    code: 'GLO-3013',
    title: 'Génie logiciel avancé',
    subtitle: 'Processus, qualité et métriques',
    description:
      "Modèles de processus logiciel, assurance qualité, métriques de projet, gestion de la configuration et revues formelles.",
    tags: ['Processus', 'Qualité', 'Métriques', 'Configuration'],
    status: 'coming-soon',
    entryPath: null,
    semester: 'Automne 2025'
  },
  {
    id: 'ift2007-devops',
    code: 'IFT-2007',
    title: 'DevOps et intégration continue',
    subtitle: 'CI/CD, infrastructure et déploiement',
    description:
      "Les trois voies DevOps, pipelines CI/CD, conteneurisation, infrastructure as code et culture d'amélioration continue.",
    tags: ['DevOps', 'CI/CD', 'Docker', 'Automatisation'],
    status: 'coming-soon',
    entryPath: null,
    semester: 'Hiver 2026'
  }
];
