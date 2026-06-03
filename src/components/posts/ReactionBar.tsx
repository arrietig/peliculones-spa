import type { Reactions } from "@/types";

interface ReactionBarProps {
  reactions: Reactions;
  views: number;
}

export function ReactionBar({ reactions, views }: ReactionBarProps) {
  const total = reactions.likes + reactions.dislikes;
  const approvalPct = total > 0 ? Math.round((reactions.likes / total) * 100) : 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Críticas del público
      </h3>
      <div className="mb-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-emerald-500">{reactions.likes.toLocaleString()}</p>
          <p className="text-xs text-slate-400">👍 Likes</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-rose-400">{reactions.dislikes.toLocaleString()}</p>
          <p className="text-xs text-slate-400">👎 Dislikes</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-brand">{views.toLocaleString()}</p>
          <p className="text-xs text-slate-400">👁️ Vistas</p>
        </div>
      </div>
      <div>
        <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
          <span>Score de aprobación</span>
          <span className="font-semibold">{approvalPct}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-rose-100">
          <div
            className="h-full rounded-full bg-emerald-400 transition-all"
            style={{ width: `${approvalPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
