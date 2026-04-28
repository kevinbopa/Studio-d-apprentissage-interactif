import type { KnowledgeEdge, KnowledgeNode } from '../types/content';

export const knowledgeNodes: KnowledgeNode[] = [
  {
    id: 'n1',
    label: 'Contexte business',
    group: 'fondation',
    x: 80,
    y: 130,
    description: 'Instabilité des exigences et besoin de réactivité.',
    linkedExamQuestionIds: ['ex1']
  },
  {
    id: 'n2',
    label: 'Manifeste Agile',
    group: 'fondation',
    x: 230,
    y: 70,
    description: '4 valeurs qui guident les arbitrages de méthode.',
    linkedExamQuestionIds: ['ex1', 'ex8']
  },
  {
    id: 'n3',
    label: 'Principes agiles',
    group: 'organisation',
    x: 380,
    y: 130,
    description: 'Livraison fréquente, feedback, rythme soutenable.',
    linkedExamQuestionIds: ['ex1', 'ex2']
  },
  {
    id: 'n4',
    label: 'XP',
    group: 'pratique',
    x: 500,
    y: 250,
    description: 'Pratiques extrêmes pour améliorer feedback et qualité.',
    linkedExamQuestionIds: ['ex3', 'ex4']
  },
  {
    id: 'n5',
    label: 'Qualité technique',
    group: 'qualite',
    x: 360,
    y: 310,
    description: 'TDD, refactoring, CI, standards de code.',
    linkedExamQuestionIds: ['ex2', 'ex7']
  },
  {
    id: 'n6',
    label: 'Architecture en couches',
    group: 'qualite',
    x: 240,
    y: 340,
    description: 'Séparation présentation/service/domaine/persistance.',
    linkedExamQuestionIds: ['ex5']
  },
  {
    id: 'n7',
    label: 'DevOps',
    group: 'organisation',
    x: 620,
    y: 320,
    description: 'Flow, feedback et apprentissage continu.',
    linkedExamQuestionIds: ['ex6']
  },
  {
    id: 'n8',
    label: 'Choix de méthode',
    group: 'organisation',
    x: 530,
    y: 110,
    description: 'Agile, discipliné ou hybride selon le contexte.',
    linkedExamQuestionIds: ['ex1', 'ex8']
  }
];

export const knowledgeEdges: KnowledgeEdge[] = [
  { id: 'e1', from: 'n1', to: 'n2', relation: 'justifie' },
  { id: 'e2', from: 'n2', to: 'n3', relation: 'se décline en' },
  { id: 'e3', from: 'n3', to: 'n4', relation: 'inspire' },
  { id: 'e4', from: 'n4', to: 'n5', relation: 'renforce' },
  { id: 'e5', from: 'n5', to: 'n6', relation: 's’appuie sur' },
  { id: 'e6', from: 'n3', to: 'n8', relation: 'contraint' },
  { id: 'e7', from: 'n8', to: 'n7', relation: 'influence' },
  { id: 'e8', from: 'n5', to: 'n7', relation: 'alimente' },
  { id: 'e9', from: 'n2', to: 'n8', relation: 'cadre' }
];

