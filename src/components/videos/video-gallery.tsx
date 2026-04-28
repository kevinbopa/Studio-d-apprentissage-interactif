import { ExternalLink, PlayCircle } from 'lucide-react';
import { useState } from 'react';
import { videoResources } from '../../data/videos';

interface VideoGalleryProps {
  conceptIds?: string[];
}

const CONCEPT_COLORS: Record<string, string> = {
  'agile-foundations': '#2a8bff',
  'xp-practices':     '#8b5cf6',
  'xp-cycle':         '#10b981',
  'agile-principles': '#f59e0b',
  'business-context': '#ef4444',
  'xp-values':        '#06b6d4',
};

export const VideoGallery = ({ conceptIds }: VideoGalleryProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const videos = conceptIds?.length
    ? videoResources.filter((video) => conceptIds.includes(video.conceptId))
    : videoResources;

  if (!videos.length) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-slate-400">
        <PlayCircle className="h-10 w-10 mb-3 opacity-30" />
        <p className="text-sm">Aucune vidéo disponible pour ce module.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 mb-1">Médiathèque</p>
          <h2 className="font-display text-2xl font-bold text-slate-900">Vidéos pédagogiques</h2>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-500">
          {videos.length} vidéo{videos.length > 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {videos.map((video) => {
          const accent = CONCEPT_COLORS[video.conceptId] ?? '#2a8bff';
          const isHovered = hoveredId === video.id;

          return (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setHoveredId(video.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group block rounded-2xl border border-slate-100 bg-white overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              {/* Thumbnail placeholder — dark gradient */}
              <div
                className="relative h-32 overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${accent}22 0%, ${accent}44 100%)` }}
              >
                {/* Geometric accent */}
                <div
                  className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20"
                  style={{ backgroundColor: accent }}
                />
                <div
                  className="absolute -left-4 -bottom-4 h-16 w-16 rounded-full opacity-10"
                  style={{ backgroundColor: accent }}
                />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    isHovered ? 'scale-110' : 'scale-100'
                  }`} style={{ borderColor: accent, backgroundColor: `${accent}22` }}>
                    <PlayCircle className="h-6 w-6" style={{ color: accent }} />
                  </div>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-2 right-2">
                  <span className="rounded-full bg-slate-950/70 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                    {video.duration}
                  </span>
                </div>

                {/* Concept tag */}
                <div className="absolute top-2 left-2">
                  <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] backdrop-blur-sm"
                    style={{ backgroundColor: `${accent}33`, color: accent }}>
                    {video.conceptId.replace(/-/g, ' ')}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h4 className="text-[13px] font-semibold text-slate-900 leading-snug mb-1 group-hover:text-brand-700 transition-colors">
                  {video.title}
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">{video.description}</p>

                <div className="flex items-center justify-end mt-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium transition-colors"
                    style={{ color: isHovered ? accent : '#94a3b8' }}>
                    Ouvrir
                    <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <p className="text-[10px] text-slate-400 text-center pt-2">
        Ajoute des vidéos via <span className="font-mono">src/data/videos.ts</span>
      </p>
    </div>
  );
};
