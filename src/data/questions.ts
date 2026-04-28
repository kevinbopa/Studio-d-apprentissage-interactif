import type { QuizQuestion } from '../types/content';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    chapterId: 'agile-foundations',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelle proposition reflète le mieux le principe central de l’agilité?',
    choices: [
      {
        id: 'a',
        label: 'Répondre au changement plutôt que suivre un plan figé',
        explanation: 'Exact: c’est une valeur explicite du manifeste agile.',
        isCorrect: true
      },
      {
        id: 'b',
        label: 'Maximiser la documentation exhaustive avant le code',
        explanation: 'Inexact: la documentation n’est pas rejetée, mais elle n’est pas prioritaire.',
        isCorrect: false
      },
      {
        id: 'c',
        label: 'Éviter les livraisons fréquentes pour réduire le risque',
        explanation: 'Inexact: l’agilité encourage les livraisons fréquentes.',
        isCorrect: false
      },
      {
        id: 'd',
        label: 'Planifier tout le projet en détail dès le début',
        explanation: 'Inexact pour un contexte agile dynamique.',
        isCorrect: false
      }
    ],
    globalExplanation:
      'L’agilité optimise la capacité d’adaptation continue à partir du feedback réel.',
    tags: ['manifeste', 'valeurs']
  },
  {
    id: 'q2',
    chapterId: 'agile-foundations',
    type: 'multiple',
    difficulty: 'moyen',
    prompt:
      'Sélectionne les affirmations cohérentes avec les principes agiles (plusieurs réponses).',
    choices: [
      {
        id: 'a',
        label: 'La collaboration client-équipe est continue.',
        explanation: 'Oui, c’est un principe de base.',
        isCorrect: true
      },
      {
        id: 'b',
        label: 'Le rythme de travail soutenable est important.',
        explanation: 'Oui, explicitement mentionné.',
        isCorrect: true
      },
      {
        id: 'c',
        label: 'La qualité est garantie uniquement par la documentation.',
        explanation: 'Non, la qualité provient aussi de pratiques techniques.',
        isCorrect: false
      },
      {
        id: 'd',
        label: 'La simplicité est considérée comme essentielle.',
        explanation: 'Oui, principe agile majeur.',
        isCorrect: true
      }
    ],
    globalExplanation:
      'Les principes agiles combinent collaboration, excellence technique, simplicité et amélioration continue.',
    tags: ['principes', 'collaboration', 'qualite']
  },
  {
    id: 'q3',
    chapterId: 'xp-core',
    type: 'single',
    difficulty: 'facile',
    prompt: 'Quelle valeur ci-dessous n’appartient PAS aux valeurs XP classiques?',
    choices: [
      {
        id: 'a',
        label: 'Excellence',
        explanation:
          'Correct: XP insiste sur excellence technique, mais la valeur officielle est plutôt feedback.',
        isCorrect: true
      },
      {
        id: 'b',
        label: 'Communication',
        explanation: 'Communication fait partie des valeurs XP.',
        isCorrect: false
      },
      {
        id: 'c',
        label: 'Simplicité',
        explanation: 'Simplicité est une valeur XP.',
        isCorrect: false
      },
      {
        id: 'd',
        label: 'Respect',
        explanation: 'Respect est une valeur XP.',
        isCorrect: false
      }
    ],
    globalExplanation:
      'Les valeurs XP courantes: communication, simplicité, feedback, courage et respect.',
    tags: ['xp', 'valeurs']
  },
  {
    id: 'q4',
    chapterId: 'xp-core',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quelle pratique XP vise explicitement à améliorer le code sans modifier son comportement externe?',
    choices: [
      {
        id: 'a',
        label: 'Refactoring (réusinage)',
        explanation: 'Exact: on améliore la structure interne sans changer le comportement observable.',
        isCorrect: true
      },
      {
        id: 'b',
        label: 'Planning game',
        explanation: 'Planning game traite surtout priorisation et planification.',
        isCorrect: false
      },
      {
        id: 'c',
        label: 'Pair programming',
        explanation: 'Pair programming améliore la qualité, mais ce n’est pas la définition du refactoring.',
        isCorrect: false
      },
      {
        id: 'd',
        label: 'Test d’acceptation',
        explanation: 'Les tests valident la valeur, pas directement la structure du code.',
        isCorrect: false
      }
    ],
    globalExplanation:
      'Le refactoring limite la dette technique et maintient la capacité d’évolution.',
    tags: ['xp', 'qualite-technique']
  },
  {
    id: 'q5',
    chapterId: 'process-choice',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Dans quel contexte une approche plus disciplinée est généralement préférable?',
    choices: [
      {
        id: 'a',
        label: 'Petit projet exploratoire avec client disponible au quotidien',
        explanation: 'Ce contexte favorise plutôt une approche agile.',
        isCorrect: false
      },
      {
        id: 'b',
        label: 'Projet réglementé avec obligations fortes de traçabilité',
        explanation: 'Correct: les exigences réglementaires justifient plus de formalisme.',
        isCorrect: true
      },
      {
        id: 'c',
        label: 'Prototype interne de 2 semaines',
        explanation: 'Souvent mieux en mode agile léger.',
        isCorrect: false
      },
      {
        id: 'd',
        label: 'Backlog très instable et hypothèses non validées',
        explanation: 'Ce contexte pousse vers expérimentation agile.',
        isCorrect: false
      }
    ],
    globalExplanation:
      'Le contexte prime: réglementation, taille et criticité influencent le choix de méthode.',
    tags: ['choix-methode', 'reglementation']
  },
  {
    id: 'q6',
    chapterId: 'exam-synthesis',
    type: 'multiple',
    difficulty: 'avance',
    prompt:
      'Pour une question longue “Agile vs Discipliné”, quels éléments renforcent une bonne réponse? (plusieurs réponses)',
    choices: [
      {
        id: 'a',
        label: 'Comparer les hypothèses de chaque approche',
        explanation: 'Oui: c’est attendu dans les questions de justification.',
        isCorrect: true
      },
      {
        id: 'b',
        label: 'Donner un contexte concret où l’approche disciplinée est préférable',
        explanation: 'Oui: la contextualisation est essentielle.',
        isCorrect: true
      },
      {
        id: 'c',
        label: 'Affirmer que l’agile est toujours supérieur',
        explanation: 'Non: réponse trop absolue.',
        isCorrect: false
      },
      {
        id: 'd',
        label: 'Conclure sur une stratégie hybride quand pertinent',
        explanation: 'Oui: cela montre une compréhension nuancée.',
        isCorrect: true
      }
    ],
    globalExplanation:
      'Les meilleures réponses d’examen montrent nuance, contexte et capacité de compromis.',
    tags: ['strategie-examen', 'justification']
  },
  {
    id: 'q7',
    chapterId: 'process-choice',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'Quel défi revient souvent quand on applique l’agilité sur un grand programme multi-équipes?',
    choices: [
      {
        id: 'a',
        label: 'Trop de flexibilité locale et perte de cohérence globale',
        explanation: 'Correct: coordination et alignement deviennent centraux.',
        isCorrect: true
      },
      {
        id: 'b',
        label: 'Absence totale de dépendances techniques',
        explanation: 'Inexact: les dépendances augmentent en général.',
        isCorrect: false
      },
      {
        id: 'c',
        label: 'Impossibilité de faire toute revue de code',
        explanation: 'Inexact: possible, mais il faut organiser les flux.',
        isCorrect: false
      },
      {
        id: 'd',
        label: 'Suppression de toutes les cérémonies',
        explanation: 'Inexact: en pratique on adapte les cérémonies, on ne les supprime pas toutes.',
        isCorrect: false
      }
    ],
    globalExplanation:
      'Le passage à l’échelle nécessite des mécanismes explicites de synchronisation.',
    tags: ['scaling', 'coordination']
  },
  {
    id: 'q8',
    chapterId: 'xp-core',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'En pair programming, quel est un avantage fréquemment attendu?',
    choices: [
      {
        id: 'a',
        label: 'Revue continue et détection plus tôt des erreurs',
        explanation: 'Correct: c’est un bénéfice classique de la pratique.',
        isCorrect: true
      },
      {
        id: 'b',
        label: 'Suppression complète des tests',
        explanation: 'Faux: tests restent indispensables.',
        isCorrect: false
      },
      {
        id: 'c',
        label: 'Aucune rotation de connaissances',
        explanation: 'Faux: la pratique favorise justement la diffusion des connaissances.',
        isCorrect: false
      },
      {
        id: 'd',
        label: 'Élimination de toute dette technique automatiquement',
        explanation: 'Faux: la dette technique doit aussi être traitée activement.',
        isCorrect: false
      }
    ],
    globalExplanation:
      'Le pair programming favorise qualité et apprentissage collectif, avec un coût de coordination à gérer.',
    tags: ['xp', 'pair-programming']
  },
  {
    id: 'q9',
    chapterId: 'xp-core',
    type: 'multiple',
    difficulty: 'moyen',
    prompt:
      "Parmi les éléments suivants, lesquels font partie des droits du client en XP? (plusieurs réponses)",
    choices: [
      {
        id: 'a',
        label: "Savoir ce qui peut être accompli et à quel coût",
        explanation: "Oui: le client a le droit d’obtenir une estimation transparente.",
        isCorrect: true
      },
      {
        id: 'b',
        label: "Changer d’avis et modifier les priorités entre les itérations",
        explanation: "Oui: l’adaptabilité du plan est un droit central du client en XP.",
        isCorrect: true
      },
      {
        id: 'c',
        label: "Imposer les pratiques techniques aux développeurs",
        explanation: "Non: les choix techniques relèvent des droits des développeurs.",
        isCorrect: false
      },
      {
        id: 'd',
        label: "Être informé des changements de planning en temps voulu",
        explanation: "Oui: la transparence sur le planning est garantie au client.",
        isCorrect: true
      }
    ],
    globalExplanation:
      "En XP, le client contrôle les priorités métier tandis que l’équipe contrôle les décisions techniques.",
    tags: ['xp', 'droits-client', 'planning']
  },
  {
    id: 'q10',
    chapterId: 'agile-foundations',
    type: 'single',
    difficulty: 'moyen',
    prompt:
      'La phrase "documentation ≠ communication" veut surtout rappeler que :',
    choices: [
      {
        id: 'a',
        label: 'La documentation est inutile en tout temps.',
        explanation: 'Faux: elle reste utile dans plusieurs contextes.',
        isCorrect: false
      },
      {
        id: 'b',
        label: 'Les échanges directs sont essentiels et non remplaçables.',
        explanation: 'Correct: un document ne remplace pas une boucle de discussion.',
        isCorrect: true
      },
      {
        id: 'c',
        label: 'Il faut supprimer toute trace écrite.',
        explanation: 'Faux: il faut conserver les artefacts utiles.',
        isCorrect: false
      },
      {
        id: 'd',
        label: 'La qualité dépend seulement des outils.',
        explanation: 'Faux: la collaboration humaine reste centrale.',
        isCorrect: false
      }
    ],
    globalExplanation:
      'Le message est de rééquilibrer les pratiques vers la collaboration active.',
    tags: ['communication', 'valeurs']
  }
];

