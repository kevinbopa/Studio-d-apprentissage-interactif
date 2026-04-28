import { BookOpen, CheckCircle2, PlayCircle, Search, Sparkles, Zap } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLearning } from '../../context/learning-context';
import { courseModules } from '../../data/modules';
import { VideoGallery } from '../videos/video-gallery';
import { ConceptVisuals } from './concept-visuals';
import { StrategicImageMap } from './strategic-image-map';

type ViewMode = 'lecture' | 'interactif' | 'videos';

const GUIDE_STEPS = [
  {
    id: 'comprendre',
    title: '1. Comprendre',
    description: 'Lire definition et version simplifiee avant le detail.',
  },
  {
    id: 'visualiser',
    title: '2. Visualiser',
    description: 'Explorer les cartes interactives pour connecter les notions.',
  },
  {
    id: 'valider',
    title: '3. Verifier',
    description: 'Faire le mini test de section pour valider la comprehension.',
  },
  {
    id: 'consolider',
    title: '4. Consolider',
    description: 'Retenir les points cles et les erreurs frequentes.',
  },
];

export const ModuleViewer = () => {
  const [activeModuleId, setActiveModuleId] = useState(courseModules[0]?.id ?? '');
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('lecture');
  const [activeGuideStep, setActiveGuideStep] = useState(0);
  const [quickChoice, setQuickChoice] = useState<string | null>(null);
  const [quickSubmitted, setQuickSubmitted] = useState(false);
  const { completedSections, markSectionDone } = useLearning();

  const activeModule = useMemo(
    () => courseModules.find((m) => m.id === activeModuleId) ?? courseModules[0],
    [activeModuleId]
  );

  const filteredSections = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return activeModule.sections;
    return activeModule.sections.filter((s) =>
      [s.title, s.definition, s.simplifiedExplanation, s.detailedExplanation, ...s.keyTakeaways, ...s.commonMistakes]
        .join(' ')
        .toLowerCase()
        .includes(term)
    );
  }, [activeModule, search]);

  const activeSection = filteredSections[activeSectionIndex] ?? filteredSections[0];

  const quickCheck = useMemo(() => {
    if (!activeSection) return null;
    const correct = activeSection.keyTakeaways[0];
    if (!correct) return null;

    const choices = [
      correct,
      ...activeSection.commonMistakes.slice(0, 2),
      'Appliquer exactement la meme methode dans tous les contextes.',
    ].slice(0, 4);

    return {
      prompt: `Quel enonce represente le mieux l'idee centrale de la section "${activeSection.title}" ?`,
      correct,
      choices,
    };
  }, [activeSection]);

  const handleModuleChange = (id: string) => {
    setActiveModuleId(id);
    setActiveSectionIndex(0);
    setSearch('');
    setActiveGuideStep(0);
    setQuickChoice(null);
    setQuickSubmitted(false);
  };

  const handleSectionChange = (index: number) => {
    setActiveSectionIndex(index);
    setActiveGuideStep(0);
    setQuickChoice(null);
    setQuickSubmitted(false);
  };

  const isDone = activeSection ? completedSections.includes(activeSection.id) : false;
  const moduleDoneCount = activeModule.sections.filter((s) => completedSections.includes(s.id)).length;
  const moduleProgress = activeModule.sections.length
    ? (moduleDoneCount / activeModule.sections.length) * 100
    : 0;

  const isQuickCorrect = quickCheck && quickChoice === quickCheck.correct;

  return (
    <div className="flex gap-0 h-[calc(100vh-130px)] min-h-[600px]">
      <aside className="w-56 shrink-0 flex flex-col border-r border-slate-100 bg-white rounded-l-2xl overflow-hidden">
        <div className="p-3 border-b border-slate-100">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400 mb-2">Modules</p>
          <div className="space-y-1">
            {courseModules.map((module) => (
              <button
                key={module.id}
                onClick={() => handleModuleChange(module.id)}
                type="button"
                className={`w-full rounded-xl border px-3 py-2.5 text-left transition-all ${
                  module.id === activeModuleId
                    ? 'border-brand-200 bg-brand-50'
                    : 'border-transparent hover:border-slate-100 hover:bg-slate-50'
                }`}
              >
                <p
                  className={`text-[9px] font-semibold uppercase tracking-[0.12em] mb-0.5 ${
                    module.id === activeModuleId ? 'text-brand-600' : 'text-slate-400'
                  }`}
                >
                  {module.id}
                </p>
                <p
                  className={`text-[11px] font-semibold leading-snug ${
                    module.id === activeModuleId ? 'text-brand-800' : 'text-slate-700'
                  }`}
                >
                  {module.title}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400 mb-2">Sections</p>
          <div className="space-y-0.5">
            {filteredSections.map((section, index) => {
              const done = completedSections.includes(section.id);
              const current = index === activeSectionIndex;
              return (
                <button
                  key={section.id}
                  onClick={() => handleSectionChange(index)}
                  type="button"
                  className={`w-full flex items-center gap-2 rounded-lg px-2.5 py-2 text-left transition-all ${
                    current ? 'bg-brand-50' : 'hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full shrink-0 ${
                      done ? 'bg-emerald-500' : current ? 'bg-brand-500' : 'bg-slate-200'
                    }`}
                  />
                  <span
                    className={`text-[11px] font-medium leading-snug ${
                      current ? 'text-brand-700' : done ? 'text-slate-600' : 'text-slate-500'
                    }`}
                  >
                    {section.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-[9px] text-slate-400 mb-1.5">
            <span>Progression module</span>
            <span>
              {moduleDoneCount}/{activeModule.sections.length}
            </span>
          </div>
          <div className="h-1 rounded-full bg-slate-100">
            <div
              className="h-1 rounded-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all duration-500"
              style={{ width: `${moduleProgress}%` }}
            />
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col bg-white rounded-r-2xl border border-l-0 border-slate-100 overflow-hidden min-w-0">
        <div className="flex items-center justify-between gap-4 px-6 py-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-1 rounded-lg border border-slate-100 bg-slate-50 p-1">
            {([
              { id: 'lecture' as ViewMode, label: 'Lecture', icon: BookOpen },
              { id: 'interactif' as ViewMode, label: 'Interactif', icon: Zap },
              { id: 'videos' as ViewMode, label: 'Videos', icon: PlayCircle },
            ]).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setViewMode(id)}
                type="button"
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] font-medium transition-all ${
                  viewMode === id
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-100'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Icon className="h-3 w-3" />
                {label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 w-52">
            <Search className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <input
              className="flex-1 bg-transparent text-[11px] text-slate-700 placeholder:text-slate-400 outline-none"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une notion..."
              value={search}
            />
          </div>

          {activeSection && (
            <button
              onClick={() => markSectionDone(activeSection.id)}
              type="button"
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-medium transition-all shrink-0 ${
                isDone
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-700'
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              {isDone ? 'Maitrisee' : 'Marquer comprise'}
            </button>
          )}
        </div>

        {viewMode !== 'videos' && filteredSections.length > 1 && (
          <div className="flex items-center gap-2 px-6 py-2 border-b border-slate-50 bg-slate-50/60 shrink-0">
            {filteredSections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => handleSectionChange(i)}
                type="button"
                className={`rounded-full transition-all ${
                  i === activeSectionIndex
                    ? 'h-2 w-6 bg-brand-500'
                    : completedSections.includes(s.id)
                    ? 'h-2 w-2 bg-emerald-400'
                    : 'h-2 w-2 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
            <span className="ml-2 text-[10px] text-slate-400">
              {activeSectionIndex + 1} / {filteredSections.length}
            </span>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {viewMode === 'videos' ? (
            <div className="p-6">
              <VideoGallery conceptIds={activeModule.sectionIdsForVideos} />
            </div>
          ) : activeSection ? (
            <div className="p-6 space-y-4 max-w-4xl">
              <div className="border-l-2 border-brand-500 pl-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-600 mb-1">
                  {activeModule.id} - Section {activeSectionIndex + 1}
                </p>
                <h2 className="font-display text-2xl font-bold text-slate-900 leading-tight">{activeSection.title}</h2>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
                  Parcours guide - interaction rapide
                </p>
                <div className="grid gap-2 md:grid-cols-4">
                  {GUIDE_STEPS.map((step, index) => (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => setActiveGuideStep(index)}
                      className={`rounded-lg border px-3 py-2 text-left transition-all ${
                        activeGuideStep === index
                          ? 'border-brand-300 bg-brand-50'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <p
                        className={`text-[10px] font-semibold ${
                          activeGuideStep === index ? 'text-brand-700' : 'text-slate-700'
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">{step.description}</p>
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-[11px] text-slate-600 leading-relaxed">
                  <Sparkles className="h-3 w-3 inline-block mr-1 text-brand-500" />
                  Focus actuel: {GUIDE_STEPS[activeGuideStep]?.description}
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-brand-200 bg-brand-50 p-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-600 mb-2">Definition</p>
                  <p className="text-sm text-brand-800 leading-relaxed">{activeSection.definition}</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400 mb-2">
                    Version simplifiee
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">{activeSection.simplifiedExplanation}</p>
                </div>
              </div>

              <details className="rounded-xl border border-slate-100 bg-white p-5 group" open={activeGuideStep <= 1}>
                <summary className="cursor-pointer list-none">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400 mb-2">
                    Explication detaillee
                  </p>
                  <p className="text-xs text-slate-400 group-open:hidden">Ouvrir</p>
                </summary>
                <p className="text-sm text-slate-700 leading-[1.8]">{activeSection.detailedExplanation}</p>
              </details>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-600 mb-2">Exemple concret</p>
                <p className="text-sm text-emerald-800 leading-relaxed">{activeSection.concreteExample}</p>
              </div>

              {viewMode === 'interactif' && (
                <div className="space-y-4">
                  <ConceptVisuals sectionId={activeSection.id} />
                  <StrategicImageMap sectionId={activeSection.id} />
                </div>
              )}

              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-slate-100 p-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400 mb-3">Points cles</p>
                  <ul className="space-y-2">
                    {activeSection.keyTakeaways.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-rose-100 bg-rose-50 p-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-rose-500 mb-3">
                    Erreurs frequentes
                  </p>
                  <ul className="space-y-2">
                    {activeSection.commonMistakes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-rose-700">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {quickCheck && (
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400 mb-2">Mini verification</p>
                  <p className="text-sm text-slate-700 mb-3">{quickCheck.prompt}</p>
                  <div className="grid gap-2">
                    {quickCheck.choices.map((choice) => (
                      <button
                        key={choice}
                        type="button"
                        onClick={() => setQuickChoice(choice)}
                        className={`rounded-lg border px-3 py-2 text-left text-sm transition-all ${
                          quickChoice === choice
                            ? 'border-brand-300 bg-brand-50 text-brand-700'
                            : 'border-slate-200 hover:border-slate-300 text-slate-600'
                        }`}
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQuickSubmitted(true)}
                      disabled={!quickChoice}
                      className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white disabled:opacity-40"
                    >
                      Verifier ma reponse
                    </button>
                    {quickSubmitted && (
                      <p className={`text-xs font-medium ${isQuickCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {isQuickCorrect
                          ? 'Bonne reponse. Tu peux passer a la section suivante.'
                          : `A revoir: l'idee attendue est "${quickCheck.correct}".`}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="rounded-xl bg-slate-950 p-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-2">Resume de section</p>
                <p className="text-sm text-slate-200 leading-relaxed">{activeSection.summary}</p>
              </div>

              <div className="flex items-center justify-between pt-2 pb-4">
                <button
                  type="button"
                  disabled={activeSectionIndex === 0}
                  onClick={() => handleSectionChange(Math.max(0, activeSectionIndex - 1))}
                  className="text-[12px] font-medium text-slate-500 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  {'<-'} Section precedente
                </button>
                <button
                  type="button"
                  disabled={activeSectionIndex >= filteredSections.length - 1}
                  onClick={() => handleSectionChange(Math.min(filteredSections.length - 1, activeSectionIndex + 1))}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-950 px-4 py-2 text-[12px] font-medium text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Section suivante {'->'}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 text-sm">
              Aucune section trouvee pour cette recherche.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
