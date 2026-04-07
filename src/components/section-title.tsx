export const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-3">
    <div className="text-[15px] font-semibold text-slate-900">{title}</div>
    {subtitle ? <div className="mt-0.5 text-xs text-slate-500">{subtitle}</div> : null}
  </div>
)
