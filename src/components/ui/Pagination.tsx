interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = buildPageRange(page, totalPages);

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Paginación">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
      >
        ← Anterior
      </button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`ellipsis-${i}`} className="px-1 text-slate-400">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(Number(p))}
            className={[
              "min-w-[36px] rounded-lg border px-3 py-1.5 text-sm transition",
              Number(p) === page
                ? "border-brand bg-brand text-white"
                : "border-slate-200 text-slate-600 hover:bg-slate-50",
            ].join(" ")}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
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
