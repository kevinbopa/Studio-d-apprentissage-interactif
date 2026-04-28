# Plan de génération vidéo NotebookLM - GLO-2003 (Agilité & XP)

Ce document classe les vidéos selon la table des matières du site et fournit un brief complet pour générer chaque capsule dans NotebookLM.

Statut de couverture:
- `agile-foundations`: complet (3/3)
- `xp-core`: complet (3/3)
- `process-choice`: complet (3/3)
- `exam-synthesis`: complet (1/1)

Aucune vidéo manquante par rapport à la structure actuelle des modules.

## 1. Module `agile-foundations` - Fondements de l’agilité

### Vidéo 1 - Pourquoi l’agilité est devenue dominante
- `conceptId`: `business-context`
- Durée cible: 8 à 10 min
- Objectif pédagogique:
  - Expliquer pourquoi le contexte économique et technologique a poussé vers des approches adaptatives.
- À mettre en valeur:
  - Globalisation, volatilité des exigences, time-to-market, feedback rapide.
  - Pourquoi une première version imparfaite peut être plus utile qu’un long cycle fermé.
- Structure recommandée:
  - Intro problème (1 min), causes de volatilité (3 min), exemple réel d’équipe (3 min), synthèse (1 min).
- Prompt NotebookLM:
  - "Crée une capsule pédagogique en français (niveau universitaire) sur le contexte qui a mené à l’agilité en développement logiciel. Base-toi sur: globalisation, omniprésence du logiciel, instabilité des exigences, besoin de première version rapide pour apprendre. Donne un exemple concret d’équipe, 3 erreurs fréquentes, puis une synthèse claire. Ton: clair, professionnel, dynamique. Ajoute transitions naturelles et phrases de conclusion."

### Vidéo 2 - Manifeste Agile: interprétation pratique des 4 valeurs
- `conceptId`: `manifesto-values`
- Durée cible: 10 à 12 min
- Objectif pédagogique:
  - Interpréter correctement les 4 valeurs sans caricature.
- À mettre en valeur:
  - Gauche > droite (priorisation, pas suppression).
  - Cas pratiques: individus vs processus, logiciel fonctionnel vs documentation exhaustive, collaboration client vs contrat, adaptation vs plan.
- Structure recommandée:
  - Rappel historique (1 min), 4 valeurs avec mini-cas (8 min), pièges d’interprétation (2 min), conclusion (1 min).
- Prompt NotebookLM:
  - "Génère une capsule en français qui explique les 4 valeurs du Manifeste Agile avec un style concret. Pour chaque valeur, donne: ce qu’elle veut dire, ce qu’elle ne veut pas dire, un exemple d’équipe, une erreur fréquente. Termine avec un tableau mental 'prioriser sans exclure'. Niveau: cours universitaire génie logiciel."

### Vidéo 3 - Les 12 principes agiles en action
- `conceptId`: `agile-principles`
- Durée cible: 11 à 13 min
- Objectif pédagogique:
  - Transformer les principes en actions quotidiennes observables.
- À mettre en valeur:
  - Orientation client, livraisons fréquentes, collaboration, rythme soutenable, excellence technique, simplicité, auto-organisation, amélioration continue.
- Structure recommandée:
  - Regroupement par thèmes (client, exécution, équipe, organisation) avec exemples.
- Prompt NotebookLM:
  - "Crée une vidéo pédagogique en français sur les principes de l’agilité. Regroupe les principes en 4 blocs: orientation client, collaboration, exécution, organisation. Pour chaque bloc: 2 pratiques concrètes, 1 anti-pattern, 1 indicateur observable. Conclus avec un mini-plan d’action d’équipe sur 2 semaines."

## 2. Module `xp-core` - Extreme Programming (XP)

### Vidéo 4 - Valeurs XP: communication, simplicité, feedback, courage, respect
- `conceptId`: `xp-values`
- Durée cible: 9 à 11 min
- Objectif pédagogique:
  - Comprendre comment les valeurs XP orientent les comportements sous contraintes.
- À mettre en valeur:
  - Arbitrages quotidiens, prise de décision collective, courage technique.
- Structure recommandée:
  - Une valeur = un scénario (5 scénarios courts), puis synthèse des interactions entre valeurs.
- Prompt NotebookLM:
  - "Produis une capsule en français sur les 5 valeurs de XP. Pour chaque valeur (communication, simplicité, feedback, courage, respect), donne un micro-scénario d’équipe, la décision prise, et l’impact qualité. Mets l’accent sur les compromis réels et pas seulement la théorie."

### Vidéo 5 - XP en profondeur: TDD, pair programming, refactoring
- `conceptId`: `xp-practices`
- Durée cible: 14 à 16 min
- Objectif pédagogique:
  - Montrer que les pratiques XP fonctionnent en système.
- À mettre en valeur:
  - Flux "test -> code -> refactor", revue continue en binôme, CI pour sécurité d’intégration.
- Structure recommandée:
  - Démonstration d’une mini-feature du début à la fin.
- Prompt NotebookLM:
  - "Génère une capsule technique en français qui explique l’enchaînement XP: TDD, pair programming, refactoring et intégration continue. Utilise une mini-feature fictive et montre l’ordre des étapes, les bénéfices, et ce qui se dégrade si une pratique est retirée. Ajoute une section 'erreurs de mise en oeuvre' et 'version minimale viable pour démarrer'."

### Vidéo 6 - Cycle XP et user stories: de la sélection à l’évaluation
- `conceptId`: `xp-cycle`
- Durée cible: 10 à 12 min
- Objectif pédagogique:
  - Expliquer la boucle d’itération XP et la rédaction efficace des stories.
- À mettre en valeur:
  - Sélection stories, découpage tâches, planification, dev+tests, livraison, évaluation.
  - Format: "En tant que... je veux... afin de..."
- Structure recommandée:
  - Une itération complète simulée sur 1 story principale + 2 stories secondaires.
- Prompt NotebookLM:
  - "Crée une vidéo en français qui simule une itération XP complète: choix des user stories, découpage en tâches, planification, développement avec tests, livraison, évaluation. Inclure 3 exemples de user stories bien formulées et 3 exemples mal formulés avec correction."

## 3. Module `process-choice` - Choisir entre agile et discipliné

### Vidéo 7 - Agile vs discipliné: cadre de décision
- `conceptId`: `agile-vs-disciplined`
- Durée cible: 9 à 11 min
- Objectif pédagogique:
  - Donner un cadre de décision contextuel non idéologique.
- À mettre en valeur:
  - Taille projet, réglementation, criticité, disponibilité client, distribution d’équipe.
- Structure recommandée:
  - Matrice de décision + 2 études de cas contrastées.
- Prompt NotebookLM:
  - "Prépare une capsule en français pour comparer approches agiles et disciplinées. Propose une matrice de décision par critères (taille, réglementation, risque, client, équipe distribuée) et applique-la à deux cas: startup produit web et système réglementé. Termine par une recommandation hybride argumentée."

### Vidéo 8 - Limites de l’agilité: quand le modèle se fragilise
- `conceptId`: `limits`
- Durée cible: 8 à 10 min
- Objectif pédagogique:
  - Identifier les conditions d’échec d’une adoption agile.
- À mettre en valeur:
  - Client absent, faible cohésion, gouvernance mal alignée, manque de documentation utile.
- Structure recommandée:
  - Symptômes -> causes -> contre-mesures.
- Prompt NotebookLM:
  - "Génère une capsule en français sur les limites de l’agilité. Pour chaque limite majeure, donne: symptôme observable, cause probable, conséquence projet, et action corrective pragmatique. Garde un ton nuancé et orienté résolution."

### Vidéo 9 - Agilité à grande échelle: coordination multi-équipes
- `conceptId`: `large-projects`
- Durée cible: 10 à 12 min
- Objectif pédagogique:
  - Expliquer les défis de scaling et les mécanismes de coordination.
- À mettre en valeur:
  - Dépendances inter-équipes, intégration, cohérence d’architecture, synchronisation des cadences.
- Structure recommandée:
  - Problèmes fréquents, patterns de coordination, exemple de programme multi-équipes.
- Prompt NotebookLM:
  - "Crée une vidéo en français sur l’agilité à grande échelle. Montre les défis (dépendances, intégration, architecture, réglementation) et les solutions (plus de conception ciblée, rituels de synchronisation, ownership clair). Inclure un exemple d’organisation multi-équipes et 5 règles pratiques pour éviter le chaos."

## 4. Module `exam-synthesis` - Synthèse orientée examen

### Vidéo 10 - Réussir les questions longues d’examen
- `conceptId`: `exam-strategy`
- Durée cible: 7 à 9 min
- Objectif pédagogique:
  - Donner une méthode de réponse performante pour questions de justification.
- À mettre en valeur:
  - Structure: définir, comparer, argumenter, illustrer, conclure.
  - Critères implicites de correction: clarté, précision, contextualisation.
- Structure recommandée:
  - Avant/Après d’une réponse faible et d’une réponse forte.
- Prompt NotebookLM:
  - "Génère une capsule en français sur la méthode pour réussir les questions longues en génie logiciel. Montre une structure de réponse en 5 étapes (définition, position, arguments, exemple, conclusion nuancée). Donne 2 exemples de questions typiques Agile/XP et une réponse modèle pour chacune."

## Utilisation rapide

Pour accélérer dans NotebookLM:
- Copier un prompt à la fois.
- Ajouter les contraintes de format:
  - "format vidéo pédagogique"
  - "langage clair, niveau universitaire"
  - "avec exemples concrets et erreurs fréquentes"
  - "conclusion en 3 points clés"
