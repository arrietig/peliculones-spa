interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = buildPageRange(page, totalPages);

  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="Paginación">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-400 transition-all duration-200 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
      >
        ← Anterior
      </button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`ellipsis-${i}`} className="px-1 text-slate-600">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(Number(p))}
            className={[
              "min-w-[36px] rounded-xl border px-3 py-1.5 text-sm transition-all duration-200 cursor-pointer",
              Number(p) === page
                ? "border-brand bg-brand text-white shadow-glow-sm"
                : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white",
            ].join(" ")}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-400 transition-all duration-200 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
      >
        Siguiente →
      </button>
    </nav>
  );
}

function buildPageRange(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "…", total];
  if (current >= total - 3) return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "…", current - 1, current, current + 1, "…", total];
}
