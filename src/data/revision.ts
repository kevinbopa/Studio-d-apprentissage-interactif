import type { RevisionCard, RevisionChecklistItem } from '../types/content';

export const revisionCards: RevisionCard[] = [
  {
    id: 'r1',
    front: 'Manifeste Agile: valeur #1',
    back: 'Individus et interactions > processus et outils.',
    category: 'Agile'
  },
  {
    id: 'r2',
    front: 'Manifeste Agile: valeur #2',
    back: 'Logiciel fonctionnel > documentation exhaustive.',
    category: 'Agile'
  },
  {
    id: 'r3',
    front: 'Manifeste Agile: valeur #3',
    back: 'Collaboration client > négociation contractuelle.',
    category: 'Agile'
  },
  {
    id: 'r4',
    front: 'Manifeste Agile: valeur #4',
    back: 'Adaptation au changement > suivi d\'un plan.',
    category: 'Agile'
  },
  {
    id: 'r5',
    front: '5 valeurs XP',
    back: 'Communication, simplicité, feedback, courage, respect.',
    category: 'XP'
  },
  {
    id: 'r6',
    front: 'Suppositions de l\'agilité (5)',
    back: 'Exigences instables, petite équipe (<15), client disponible, non pré-critique, culture supportant l\'auto-organisation.',
    category: 'Agile'
  },
  {
    id: 'r7',
    front: 'TDD en une phrase',
    back: 'Écrire un test, le faire échouer, écrire le code minimal pour passer, puis refactorer.',
    category: 'XP'
  },
  {
    id: 'r8',
    front: 'Récit utilisateur — 3 aspects (CCC)',
    back: 'Carte (description courte), Conversation (clarification), Confirmation (tests d\'acceptation).',
    category: 'XP'
  },
  {
    id: 'r9',
    front: 'Quand privilégier une approche disciplinée?',
    back: 'Projet réglementé, forte traçabilité, exigences pré-critiques, équipe dispersée ou très grande.',
    category: 'Choix de méthode'
  },
  {
    id: 'r10',
    front: 'Piège examen: "Agile = pas de documentation"',
    back: 'Faux: la documentation utile est conservée, mais elle n\'est pas excessive ni prioritaire.',
    category: 'Pièges'
  }
];

export const criticalNotions = [
  'Hypothèses agiles: exigences instables, petite équipe, client disponible, non pré-critique.',
  'XP pratiques: planning game, small releases, récits utilisateurs, TDD, pair programming, refactoring, intégration continue, propriété collective.',
  'Le refactoring améliore la structure interne sans modifier le comportement observable.',
  'Agile vs discipliné: le contexte décide — réglementation, taille, disponibilité client, criticité.'
];

export const examTraps = [
  'Réponse absolue sans contexte ("toujours", "jamais", "agile est toujours meilleur").',
  'Définition correcte mais sans exemple concret ni lien avec le cours.',
  'Confondre refactoring et ajout de fonctionnalité.',
  'Croire que les droits du client incluent les décisions techniques (appartiennent aux développeurs en XP).',
  'Confondre "suppositions agiles" et "limites de l\'agilité": les suppositions sont les conditions de succès, les limites sont les obstacles réels.'
];

export const confusionPairs = [
  {
    a: 'Documentation',
    b: 'Communication',
    explanation: 'Un document aide à transmettre de l\'information, mais ne remplace pas une boucle d\'échange active.'
  },
  {
    a: 'Approche disciplinée',
    b: 'Approche systématique',
    explanation: 'Les deux termes sont souvent synonymes dans le cours: planification, traçabilité, documentation formelle.'
  },
  {
    a: 'Refactoring',
    b: 'Ajout de fonctionnalité',
    explanation: 'Le refactoring ne change pas le comportement observable — il restructure uniquement le code interne.'
  },
  {
    a: 'Droits du client XP',
    b: 'Droits du développeur XP',
    explanation: 'Le client contrôle les priorités métier; le développeur contrôle les pratiques techniques et les estimations.'
  }
];

export const revisionChecklist: RevisionChecklistItem[] = [
  { id: 'c1', label: 'Je sais comparer agile, discipliné et hybride avec un exemple concret.' },
  { id: 'c2', label: 'Je peux énoncer les 4 valeurs du Manifeste Agile et leur nuance.' },
  { id: 'c3', label: 'Je peux expliquer le cycle XP et les pratiques clés (TDD, pair, CI, refactoring).' },
  { id: 'c4', label: 'Je peux nommer les 5 suppositions de l\'agilité et leurs conséquences.' },
  { id: 'c5', label: 'Je peux décrire les droits du client et du développeur en XP.' },
  { id: 'c6', label: 'Je peux structurer une réponse longue en 4 étapes: thèse, arguments, exemple, conclusion.' }
];
