import type { QuizQuestion } from '../types/content';

export const calculateQuizScore = (
  questions: QuizQuestion[],
  answers: Record<string, string[]>
): number => {
  if (!questions.length) {
    return 0;
  }

  let correct = 0;

  questions.forEach((question) => {
    const selected = answers[question.id] ?? [];
    const expected = question.choices.filter((choice) => choice.isCorrect).map((choice) => choice.id);

    const sameSize = selected.length === expected.length;
    const sameValues = selected.every((id) => expected.includes(id));

    if (sameSize && sameValues) {
      correct += 1;
    }
  });

  return Math.round((correct / questions.length) * 100);
};

export const prettyPercent = (value: number): string => `${Math.max(0, Math.min(100, value))}%`;

