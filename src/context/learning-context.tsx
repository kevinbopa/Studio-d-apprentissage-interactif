/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type QuizScoreMap = Record<string, number>;
type ExamThemeWeakness = Record<string, number>;

interface LearningState {
  completedSections: string[];
  quizScores: QuizScoreMap;
  examAttempts: number;
  lastExamScore: number;
  themeWeakness: ExamThemeWeakness;
  solvedCodeExercises: string[];
}

interface LearningContextValue extends LearningState {
  markSectionDone: (sectionId: string) => void;
  setQuizScore: (chapterId: string, score: number) => void;
  registerExamAttempt: (score: number, themeWeakness: ExamThemeWeakness) => void;
  markCodeExerciseSolved: (exerciseId: string) => void;
  resetProgress: () => void;
}

const STORAGE_KEY = 'glo2003-learning-progress-v1';

const defaultState: LearningState = {
  completedSections: [],
  quizScores: {},
  examAttempts: 0,
  lastExamScore: 0,
  themeWeakness: {},
  solvedCodeExercises: []
};

const LearningContext = createContext<LearningContextValue | undefined>(undefined);

const loadInitialState = (): LearningState => {
  if (typeof window === 'undefined') {
    return defaultState;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return defaultState;
  }

  try {
    const parsed = JSON.parse(raw) as LearningState;
    return { ...defaultState, ...parsed };
  } catch {
    return defaultState;
  }
};

export const LearningProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<LearningState>(loadInitialState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<LearningContextValue>(
    () => ({
      ...state,
      markSectionDone: (sectionId: string) => {
        setState((previous) => {
          if (previous.completedSections.includes(sectionId)) {
            return previous;
          }

          return {
            ...previous,
            completedSections: [...previous.completedSections, sectionId]
          };
        });
      },
      setQuizScore: (chapterId: string, score: number) => {
        setState((previous) => ({
          ...previous,
          quizScores: {
            ...previous.quizScores,
            [chapterId]: Math.max(previous.quizScores[chapterId] ?? 0, score)
          }
        }));
      },
      registerExamAttempt: (score: number, themeWeakness: ExamThemeWeakness) => {
        setState((previous) => ({
          ...previous,
          examAttempts: previous.examAttempts + 1,
          lastExamScore: score,
          themeWeakness
        }));
      },
      markCodeExerciseSolved: (exerciseId: string) => {
        setState((previous) => {
          if (previous.solvedCodeExercises.includes(exerciseId)) {
            return previous;
          }

          return {
            ...previous,
            solvedCodeExercises: [...previous.solvedCodeExercises, exerciseId]
          };
        });
      },
      resetProgress: () => setState(defaultState)
    }),
    [state]
  );

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
};

export const useLearning = () => {
  const context = useContext(LearningContext);

  if (!context) {
    throw new Error('useLearning must be used inside LearningProvider');
  }

  return context;
};
