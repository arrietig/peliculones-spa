import type { Reactions } from "@/types";

function ThumbUpIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}

function ThumbDownIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

interface ReactionBarProps {
  reactions: Reactions;
  views: number;
}

export function ReactionBar({ reactions, views }: ReactionBarProps) {
  const total = reactions.likes + reactions.dislikes;
  const approvalPct = total > 0 ? Math.round((reactions.likes / total) * 100) : 0;

  return (
    <div className="glass rounded-2xl p-5">
      <h3 className="mb-4 font-display text-xs font-bold uppercase tracking-widest text-slate-500">
        Críticas del público
      </h3>
      <div className="mb-5 grid grid-cols-3 gap-4 text-center">
        <div className="glass rounded-xl p-3">
          <p className="text-2xl font-bold text-emerald-400">{reactions.likes.toLocaleString()}</p>
          <div className="mt-1 flex items-center justify-center gap-1 text-emerald-400/60">
            <ThumbUpIcon />
            <span className="text-xs">Likes</span>
          </div>
        </div>
        <div className="glass rounded-xl p-3">
          <p className="text-2xl font-bold text-rose-400">{reactions.dislikes.toLocaleString()}</p>
          <div className="mt-1 flex items-center justify-center gap-1 text-rose-400/60">
            <ThumbDownIcon />
            <span className="text-xs">Dislikes</span>
          </div>
        </div>
        <div className="glass rounded-xl p-3">
          <p className="text-2xl font-bold text-brand">{views.toLocaleString()}</p>
          <div className="mt-1 flex items-center justify-center gap-1 text-brand/60">
            <EyeIcon />
            <span className="text-xs">Vistas</span>
          </div>
        </div>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
          <span>Score de aprobación</span>
          <span className={`font-bold ${approvalPct >= 70 ? "text-emerald-400" : approvalPct >= 40 ? "text-amber-400" : "text-rose-400"}`}>
            {approvalPct}%
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/5 border border-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700"
            style={{ width: `${approvalPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
