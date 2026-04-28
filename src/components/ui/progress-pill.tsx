interface ProgressPillProps {
  label: string;
  value: string;
  accent?: boolean;
}

export const ProgressPill = ({ label, value, accent }: ProgressPillProps) => (
  <div className={`rounded-xl border px-4 py-3 ${accent ? 'border-brand-200 bg-brand-50' : 'border-slate-100 bg-white'}`}>
    <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-slate-400 mb-1">{label}</p>
    <p className={`text-xl font-semibold ${accent ? 'text-brand-700' : 'text-slate-900'}`}>{value}</p>
  </div>
);
