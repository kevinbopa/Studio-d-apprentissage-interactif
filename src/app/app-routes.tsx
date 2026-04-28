import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../components/layout/app-layout';
import { CatalogPage } from '../pages/catalog-page';
import { CoursePage } from '../pages/course-page';
import { CodeLabPage } from '../pages/code-lab-page';
import { ExamPage } from '../pages/exam-page';
import { GraphPage } from '../pages/graph-page';
import { HomePage } from '../pages/home-page';
import { NotFoundPage } from '../pages/not-found-page';
import { QuizPage } from '../pages/quiz-page';
import { RevisionPage } from '../pages/revision-page';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<CatalogPage />} path="/" />

      <Route element={<AppLayout />}>
        <Route element={<HomePage />} path="/accueil" />
        <Route element={<CoursePage />} path="/cours" />
        <Route element={<QuizPage />} path="/quiz" />
        <Route element={<ExamPage />} path="/examens" />
        <Route element={<CodeLabPage />} path="/exercices-code" />
        <Route element={<RevisionPage />} path="/revision" />
        <Route element={<GraphPage />} path="/graphify" />
        <Route element={<Navigate to="/accueil" replace />} path="/home" />
        <Route element={<NotFoundPage />} path="*" />
      </Route>
    </Routes>
  );
};
