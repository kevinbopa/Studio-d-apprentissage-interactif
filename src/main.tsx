import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { BackgroundOrbs } from './components/layout/background-orbs';
import { LearningProvider } from './context/learning-context';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LearningProvider>
        <BackgroundOrbs />
        <App />
      </LearningProvider>
    </BrowserRouter>
  </StrictMode>
);
