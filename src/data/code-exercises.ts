import type { CodeExercise } from '../types/content';

export const codeExercises: CodeExercise[] = [
  {
    id: 'c1',
    title: 'Prioriser les user stories',
    concept: 'Planning game / valeur métier',
    statement:
      'Écris une fonction `sortStoriesByPriority` qui trie une liste de stories par priorité décroissante (5 -> 1).',
    starterCode: `function sortStoriesByPriority(stories) {
  // stories: [{ title: string, priority: number }]
  // TODO
}
`,
    solutionCode: `function sortStoriesByPriority(stories) {
  return [...stories].sort((a, b) => b.priority - a.priority);
}`,
    hints: [
      'Évite de muter le tableau original.',
      'Regarde la fonction sort avec un comparateur.',
      'La priorité la plus haute doit arriver en premier.'
    ],
    testCases: [
      {
        input: [[{ title: 'A', priority: 1 }, { title: 'B', priority: 3 }]],
        expected: [{ title: 'B', priority: 3 }, { title: 'A', priority: 1 }]
      },
      {
        input: [[{ title: 'X', priority: 2 }, { title: 'Y', priority: 5 }, { title: 'Z', priority: 2 }]],
        expected: [{ title: 'Y', priority: 5 }, { title: 'X', priority: 2 }, { title: 'Z', priority: 2 }]
      }
    ],
    requiredTokens: ['sort']
  },
  {
    id: 'c2',
    title: 'Cycle XP - validation de story',
    concept: 'TDD et critères d’acceptation',
    statement:
      'Écris une fonction `isStoryDone` qui retourne `true` uniquement si la story est codée ET testée ET validée par le client.',
    starterCode: `function isStoryDone(story) {
  // story: { implemented: boolean, tested: boolean, accepted: boolean }
  // TODO
}
`,
    solutionCode: `function isStoryDone(story) {
  return Boolean(story.implemented && story.tested && story.accepted);
}`,
    hints: [
      'Pense à une condition logique ET.',
      'Les trois critères doivent être vrais.',
      'Utilise un retour booléen explicite.'
    ],
    testCases: [
      {
        input: [{ implemented: true, tested: true, accepted: true }],
        expected: true
      },
      {
        input: [{ implemented: true, tested: false, accepted: true }],
        expected: false
      }
    ],
    requiredTokens: ['&&']
  },
  {
    id: 'c3',
    title: 'Détection de risque organisationnel',
    concept: 'Limites de l’agilité',
    statement:
      'Écris une fonction `detectAgileRisk` qui retourne "client_absent" si `clientAvailability < 3`, sinon "ok".',
    starterCode: `function detectAgileRisk(context) {
  // context: { clientAvailability: number }
  // TODO
}
`,
    solutionCode: `function detectAgileRisk(context) {
  if (context.clientAvailability < 3) {
    return 'client_absent';
  }
  return 'ok';
}`,
    hints: [
      'Utilise une condition simple.',
      'Le seuil est strictement inférieur à 3.',
      'Retourne exactement les chaînes demandées.'
    ],
    testCases: [
      {
        input: [{ clientAvailability: 2 }],
        expected: 'client_absent'
      },
      {
        input: [{ clientAvailability: 4 }],
        expected: 'ok'
      }
    ],
    requiredTokens: ['return']
  }
];

