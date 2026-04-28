import type { ExamQuestion } from '../types/content';

export const examQuestions: ExamQuestion[] = [
  {
    id: 'ex1',
    theme: "Approches de développement",
    prompt:
      "Expliquez pourquoi plusieurs projets privilégient une approche opportuniste. Distinguez-la d'une approche systématique et donnez un contexte où la systématique est préférable.",
    rubric: ['Distinction claire', 'Justification contextuelle', 'Exemple concret', 'Conclusion nuancée'],
    expectedElements: [
      "Exigences instables et besoin d'itération rapide → opportuniste",
      "Approche systématique: planification/traçabilité plus fortes",
      "Contexte réglementé, critique ou multi-équipes pour la systématique",
      "Mention d'une approche hybride possible"
    ],
    points: 4
  },
  {
    id: 'ex2',
    theme: 'Manifeste Agile',
    prompt:
      "Énoncez les quatre valeurs du Manifeste Agile. Pour chacune, donnez le contre-exemple que le manifeste ne rejette pas, et expliquez la nuance.",
    rubric: ['4 valeurs correctes', 'Le contre pour chacune', 'Nuance expliquée', 'Exemple concret'],
    expectedElements: [
      "Individus et interactions > processus et outils",
      "Logiciel fonctionnel > documentation exhaustive",
      "Collaboration client > négociation contractuelle",
      "Adaptation au changement > suivi d'un plan",
      "La nuance: les éléments de droite ont de la valeur, on préfère ceux de gauche"
    ],
    points: 4
  },
  {
    id: 'ex3',
    theme: 'XP',
    prompt:
      "Décrivez la programmation en paire, un avantage et un inconvénient.",
    rubric: ['Définition correcte', 'Avantage pertinent', 'Inconvénient réaliste'],
    expectedElements: [
      "Deux rôles (driver/navigator) ou collaboration continue en temps réel",
      "Avantage: revue continue, partage de connaissance, moins d'ego",
      "Inconvénient: coût de coordination, besoin de compatibilité des binômes"
    ],
    points: 3
  },
  {
    id: 'ex4',
    theme: "Récits utilisateurs",
    prompt:
      "Présentez les trois aspects d'un récit utilisateur et un avantage de cette méthode.",
    rubric: ["Les 3 aspects (CCC)", 'Explication concise', 'Avantage clairement relié à la pratique'],
    expectedElements: [
      "Carte: description courte de la fonctionnalité",
      "Conversation: clarification collaborative entre client et équipe",
      "Confirmation: critères d'acceptation vérifiables (tests)",
      "Avantage: alignement client-équipe ou priorisation orientée valeur"
    ],
    points: 4
  },
  {
    id: 'ex5',
    theme: 'Manifeste Agile — Principes',
    prompt:
      "Nommez et expliquez trois des douze principes du Manifeste Agile qui influencent directement les pratiques d'équipe au quotidien.",
    rubric: ['3 principes nommés', 'Explication correcte de chacun', 'Lien avec pratique concrète'],
    expectedElements: [
      "Livraison fréquente de logiciel fonctionnel (toutes les 2 semaines à 2 mois)",
      "Collaboration client tout au long du projet",
      "Rythme soutenable — développeurs, clients et utilisateurs indéfiniment",
      "Excellence technique et bon design favorisent l'agilité",
      "La simplicité — maximiser le travail non fait",
      "L'équipe se réorganise régulièrement pour s'améliorer"
    ],
    points: 4
  },
  {
    id: 'ex6',
    theme: "Suppositions de l'agilité",
    prompt:
      "Quelles sont les principales suppositions sur lesquelles repose une approche agile? Que se passe-t-il si l'une d'elles n'est pas respectée?",
    rubric: ['Au moins 3 suppositions', 'Formulation correcte', 'Conséquence identifiée', 'Lien avec choix de méthode'],
    expectedElements: [
      "Exigences instables ou non entièrement connues",
      "Petite équipe (typiquement moins de 15 personnes)",
      "Client disponible et engagé",
      "Exigences non pré-critiques (pas de sécurité humaine critique)",
      "Culture organisationnelle supportant l'auto-organisation",
      "Si une supposition est fausse → considérer approche hybride ou systématique"
    ],
    points: 4
  },
  {
    id: 'ex7',
    theme: 'XP — Jeu de planification',
    prompt:
      "Décrivez le jeu de planification (planning game) en XP: son déroulement, les rôles respectifs du client et des développeurs, et un avantage de cette pratique.",
    rubric: ['Déroulement expliqué', 'Rôle client', 'Rôle développeur', 'Avantage pertinent'],
    expectedElements: [
      "Client écrit les user stories et fixe les priorités (valeur métier)",
      "Développeurs estiment l'effort pour chaque story",
      "Planification collaborative: on sélectionne les stories selon effort/valeur",
      "Avantage: visibilité partagée, décisions éclairées, ajustement continu des priorités"
    ],
    points: 4
  },
  {
    id: 'ex8',
    theme: 'Agilité et grands projets',
    prompt:
      "Quels défis supplémentaires l'agilité rencontre-t-elle sur de grands projets? Proposez deux solutions pour y faire face.",
    rubric: ['Défi 1 identifié', 'Défi 2 identifié', 'Solution 1', 'Solution 2'],
    expectedElements: [
      "Coordination entre équipes multiples (dépendances techniques)",
      "Cohérence architecturale difficile à maintenir",
      "Documentation et traçabilité insuffisantes pour les parties prenantes externes",
      "Solution: plus de conception initiale ciblée (upfront design)",
      "Solution: mécanismes de synchronisation inter-équipes",
      "Solution: approche hybride combinant agilité locale et gouvernance globale"
    ],
    points: 4
  }
];
