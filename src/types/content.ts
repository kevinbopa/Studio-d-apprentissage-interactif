export type Difficulty = 'facile' | 'moyen' | 'avance';

export interface CourseSection {
  id: string;
  title: string;
  definition: string;
  simplifiedExplanation: string;
  detailedExplanation: string;
  concreteExample: string;
  keyTakeaways: string[];
  commonMistakes: string[];
  summary: string;
}

export interface CourseModule {
  id: string;
  title: string;
  shortDescription: string;
  estimatedMinutes: number;
  sectionIdsForVideos: string[];
  sections: CourseSection[];
}

export interface VideoResource {
  id: string;
  title: string;
  conceptId: string;
  description: string;
  duration: string;
  url: string;
}

export interface Choice {
  id: string;
  label: string;
  explanation: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  chapterId: string;
  type: 'single' | 'multiple';
  difficulty: Difficulty;
  prompt: string;
  choices: Choice[];
  globalExplanation: string;
  tags: string[];
}

export interface ExamQuestion {
  id: string;
  theme: string;
  prompt: string;
  rubric: string[];
  expectedElements: string[];
  points: number;
}

export interface CodeTestCase {
  input: unknown[];
  expected: unknown;
}

export interface CodeExercise {
  id: string;
  title: string;
  concept: string;
  statement: string;
  starterCode: string;
  solutionCode: string;
  hints: string[];
  testCases: CodeTestCase[];
  requiredTokens: string[];
}

export interface RevisionCard {
  id: string;
  front: string;
  back: string;
  category: string;
}

export interface RevisionChecklistItem {
  id: string;
  label: string;
}

export interface KnowledgeNode {
  id: string;
  label: string;
  group: 'fondation' | 'pratique' | 'qualite' | 'organisation';
  x: number;
  y: number;
  description: string;
  linkedExamQuestionIds: string[];
}

export interface KnowledgeEdge {
  id: string;
  from: string;
  to: string;
  relation: string;
}

export type CourseStatus = 'active' | 'coming-soon';

export interface CourseEntry {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  status: CourseStatus;
  entryPath: string | null;
  professor?: string;
  semester?: string;
  moduleCount?: number;
}
