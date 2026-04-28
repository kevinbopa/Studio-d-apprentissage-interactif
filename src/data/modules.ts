import type { CourseModule } from '../types/content';

export const courseModules: CourseModule[] = [
  {
    id: 'agile-foundations',
    title: 'Fondements de l’agilité',
    shortDescription:
      'Pourquoi l’agilité existe, ses valeurs clés et comment elle répond aux exigences changeantes.',
    estimatedMinutes: 30,
    sectionIdsForVideos: ['business-context', 'manifesto-values', 'agile-principles'],
    sections: [
      {
        id: 'business-context',
        title: 'Contexte du monde des affaires',
        definition:
          'Le marché logiciel moderne est global, rapide et fortement dépendant du numérique.',
        simplifiedExplanation:
          'Les besoins changent vite. Si on attend trop longtemps, le produit devient déjà obsolète.',
        detailedExplanation:
          'La globalisation et l’omniprésence du logiciel imposent des cycles plus courts. Les exigences deviennent instables, ce qui rend les approches trop rigides plus risquées. Une première version livrée tôt sert souvent à clarifier les besoins réels.',
        concreteExample:
          'Une équipe lance une version minimale en 3 semaines, observe les retours utilisateurs, puis réoriente les priorités.',
        keyTakeaways: [
          'Les exigences sont rarement figées.',
          'Une première version sert à apprendre.',
          'La réactivité devient un avantage compétitif.'
        ],
        commonMistakes: [
          'Attendre une spécification parfaite avant de démarrer.',
          'Confondre vitesse avec absence de qualité.'
        ],
        summary:
          'L’agilité naît d’un besoin d’adaptation continue dans un environnement instable.'
      },
      {
        id: 'manifesto-values',
        title: 'Valeurs du Manifeste Agile',
        definition:
          'Le manifeste propose 4 préférences qui orientent les décisions de développement.',
        simplifiedExplanation:
          'On favorise les personnes, le logiciel utile, la collaboration et l’adaptation.',
        detailedExplanation:
          'Les valeurs ne suppriment pas les éléments de droite, elles priorisent ceux de gauche : individus et interactions, logiciel fonctionnel, collaboration client, adaptation au changement.',
        concreteExample:
          'Une équipe remplace un long document de validation par une démo toutes les deux semaines avec le client.',
        keyTakeaways: [
          'Documentation et plan restent utiles, mais secondaires.',
          'La valeur livrée prime sur la conformité documentaire.',
          'Le client participe activement à la direction du produit.'
        ],
        commonMistakes: [
          'Croire que “agile” veut dire “sans processus”.',
          'Ignorer toute documentation utile.'
        ],
        summary:
          'Le manifeste Agile fournit une boussole de priorisation, pas une recette rigide.'
      },
      {
        id: 'agile-principles',
        title: 'Principes de l’agilité',
        definition:
          '12 principes opérationnalisent les valeurs dans le travail quotidien.',
        simplifiedExplanation:
          'Livrer souvent, collaborer en continu et améliorer la qualité techniquement.',
        detailedExplanation:
          'Les principes couvrent orientation client, collaboration directe, mesure par fonctionnalités livrées, rythme soutenable, simplicité, auto-organisation et amélioration continue.',
        concreteExample:
          'Une équipe tient une revue de sprint, puis ajuste immédiatement le backlog avec le client.',
        keyTakeaways: [
          'Le progrès est mesuré par ce qui fonctionne.',
          'Le rythme soutenable évite l’épuisement.',
          'L’excellence technique soutient l’agilité.'
        ],
        commonMistakes: [
          'Multiplier les livraisons sans boucle de feedback.',
          'Négliger la dette technique.'
        ],
        summary:
          'Les principes transforment l’agilité en pratiques concrètes d’équipe.'
      }
    ]
  },
  {
    id: 'xp-core',
    title: 'Extreme Programming (XP)',
    shortDescription:
      'Approche agile qui pousse les bonnes pratiques au maximum pour augmenter feedback et qualité.',
    estimatedMinutes: 35,
    sectionIdsForVideos: ['xp-values', 'xp-practices', 'xp-cycle'],
    sections: [
      {
        id: 'xp-values',
        title: 'Valeurs XP',
        definition:
          'XP repose sur communication, simplicité, feedback, courage et respect.',
        simplifiedExplanation:
          'XP veut rendre visibles les problèmes tôt et encourager des décisions courageuses.',
        detailedExplanation:
          'Les valeurs XP structurent les comportements d’équipe. Le feedback fréquent permet d’ajuster rapidement; la simplicité évite le surdesign; le respect maintient la cohésion et la qualité de collaboration.',
        concreteExample:
          'Le binôme identifie une complexité inutile et simplifie la solution avant qu’elle ne se propage.',
        keyTakeaways: [
          'XP combine qualité technique et qualité humaine.',
          'Le feedback rapide réduit le coût des erreurs.',
          'La simplicité est une stratégie, pas un compromis.'
        ],
        commonMistakes: [
          'Appliquer XP sans discipline technique.',
          'Garder un client trop distant des décisions.'
        ],
        summary:
          'Les valeurs XP guident les décisions quand les contraintes se contredisent.'
      },
      {
        id: 'xp-practices',
        title: 'Pratiques XP (client, équipe, programmeur)',
        definition:
          'XP propose des pratiques coordonnées sur plusieurs niveaux de responsabilité.',
        simplifiedExplanation:
          'Client présent, livraisons fréquentes, TDD, pair programming, refactoring et intégration continue.',
        detailedExplanation:
          'Côté client: user stories, planning game, tests d’acceptation. Côté équipe: standards, propriété collective, rythme soutenable. Côté programmeur: TDD, pair programming, refactoring et design simple.',
        concreteExample:
          'Chaque fonctionnalité passe par test unitaire, revue en binôme puis intégration continue.',
        keyTakeaways: [
          'Les pratiques forment un système cohérent.',
          'Retirer une pratique clé réduit l’efficacité globale.',
          'La qualité émerge d’un flux continu de vérifications.'
        ],
        commonMistakes: [
          'Faire du pair programming occasionnel sans rotation.',
          'Confondre TDD avec “tester après”.'
        ],
        summary:
          'XP fonctionne mieux quand les pratiques sont combinées plutôt qu’isolées.'
      },
      {
        id: 'xp-cycle',
        title: 'Cycle XP et user stories',
        definition:
          'Le cycle XP itère de la sélection des récits à l’évaluation de livraison.',
        simplifiedExplanation:
          'On choisit des stories, on découpe, on développe/teste, on livre et on apprend.',
        detailedExplanation:
          'Le cycle: sélection des user stories, découpage en tâches, planification, développement + tests, livraison et évaluation. Le format de story “En tant que... je veux... afin de...” cadre la valeur utilisateur.',
        concreteExample:
          'Story: “En tant qu’étudiant, je veux suivre mes scores de quiz afin d’identifier mes faiblesses avant l’examen.”',
        keyTakeaways: [
          'La planification est adaptative.',
          'Le feedback post-livraison influence l’itération suivante.',
          'La story exprime la valeur, pas l’implémentation.'
        ],
        commonMistakes: [
          'Écrire des stories trop techniques.',
          'Ignorer l’étape d’évaluation.'
        ],
        summary:
          'Le cycle XP favorise l’apprentissage continu et la priorisation orientée valeur.'
      }
    ]
  },
  {
    id: 'process-choice',
    title: 'Choisir entre agile et discipliné',
    shortDescription:
      'Comprendre quand privilégier agilité, approche disciplinée ou hybride.',
    estimatedMinutes: 25,
    sectionIdsForVideos: ['agile-vs-disciplined', 'limits', 'large-projects'],
    sections: [
      {
        id: 'agile-vs-disciplined',
        title: 'Agile vs discipliné',
        definition:
          'Deux familles d’approches avec compromis différents sur contrôle, adaptation et documentation.',
        simplifiedExplanation:
          'Agile est souvent meilleur pour l’incertitude; discipliné pour contraintes lourdes et traçabilité.',
        detailedExplanation:
          'Agile favorise adaptation et collaboration rapprochée. Les approches disciplinées privilégient planification détaillée, QA formalisée et documentation importante, utiles dans des environnements réglementés.',
        concreteExample:
          'Un produit médical certifié exigera plus d’artefacts qu’une application interne exploratoire.',
        keyTakeaways: [
          'Formalisme n’est pas synonyme de qualité.',
          'Peu de documentation n’est pas synonyme d’absence de rigueur.',
          'Le contexte décide, pas l’idéologie.'
        ],
        commonMistakes: [
          'Imposer Scrum sur un contexte fortement réglementé sans adaptation.',
          'Choisir cascade uniquement par habitude organisationnelle.'
        ],
        summary:
          'Le choix de méthode doit optimiser valeur, risques et contraintes du contexte.'
      },
      {
        id: 'limits',
        title: 'Limites de l’agilité',
        definition:
          'L’agilité échoue si ses hypothèses de base ne sont pas respectées.',
        simplifiedExplanation:
          'Sans client disponible, équipe cohésive et feedback réel, l’agilité se fragilise.',
        detailedExplanation:
          'Les freins classiques: faible implication client, résistance organisationnelle, parties prenantes multiples, documentation insuffisante et difficultés de coordination.',
        concreteExample:
          'Un backlog évolue sans arbitrage client clair: l’équipe livre vite mais dans la mauvaise direction.',
        keyTakeaways: [
          'L’agilité n’est pas une solution universelle.',
          'Les hypothèses doivent être vérifiées dès le départ.',
          'Une approche hybride est souvent pertinente.'
        ],
        commonMistakes: [
          'Écarter tout cadre de gouvernance.',
          'Sous-estimer la communication inter-équipes.'
        ],
        summary:
          'Identifier les limites permet de sécuriser un déploiement agile réaliste.'
      },
      {
        id: 'large-projects',
        title: 'Agilité et grands projets',
        definition:
          'Le passage à l’échelle augmente les besoins de coordination, conception et alignement.',
        simplifiedExplanation:
          'Plus il y a d’équipes, plus la synchronisation devient critique.',
        detailedExplanation:
          'Les grands projets ajoutent intégration complexe, contraintes réglementaires et durée longue. Les solutions incluent plus de conception anticipée ciblée, communication renforcée et mécanismes de synchronisation inter-équipes.',
        concreteExample:
          'Un programme multi-équipes combine Scrum local et cérémonies transverses d’intégration.',
        keyTakeaways: [
          'Le scaling agile nécessite des pratiques complémentaires.',
          'La cohérence d’architecture doit être explicitement gouvernée.',
          'Les boucles de feedback doivent exister à tous les niveaux.'
        ],
        commonMistakes: [
          'Copier le modèle d’une petite équipe sans adaptation.',
          'Négliger les dépendances techniques entre équipes.'
        ],
        summary:
          'L’agilité à grande échelle exige plus d’orchestration, pas moins de discipline.'
      }
    ]
  },
  {
    id: 'exam-synthesis',
    title: 'Synthèse orientée examen',
    shortDescription:
      'Rappels à fort rendement: pièges fréquents, comparatifs et structure de réponse.',
    estimatedMinutes: 20,
    sectionIdsForVideos: ['exam-strategy'],
    sections: [
      {
        id: 'exam-strategy',
        title: 'Stratégie de réponse',
        definition:
          'Méthode pour répondre clairement aux questions à choix multiples et aux questions de justification.',
        simplifiedExplanation:
          'Définir, comparer, illustrer, conclure.',
        detailedExplanation:
          'Pour les questions longues: annoncer une thèse, articuler 2 à 3 arguments, donner un exemple concret lié au cours, puis conclure avec compromis et contexte. Pour QCM: repérer les formulations absolues et vérifier la cohérence avec principes vus en classe.',
        concreteExample:
          'Question “Agile vs discipliné”: répondre par critères (taille, réglementation, disponibilité client), puis proposer approche hybride.',
        keyTakeaways: [
          'Toujours relier la réponse au contexte.',
          'Un exemple concret renforce une justification.',
          'La nuance est valorisée dans les questions de réflexion.'
        ],
        commonMistakes: [
          'Rester trop théorique sans exemple.',
          'Présenter agile comme meilleure option dans tous les cas.'
        ],
        summary:
          'Une bonne réponse d’examen combine précision conceptuelle, structure et contextualisation.'
      }
    ]
  }
];

