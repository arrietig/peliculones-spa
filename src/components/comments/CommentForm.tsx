import { type FormEvent, useState } from "react";

interface CommentFormProps {
  onSubmit: (body: string) => Promise<void>;
  isSubmitting: boolean;
}

export function CommentForm({ onSubmit, isSubmitting }: CommentFormProps) {
  const [body, setBody] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = body.trim();
    if (!trimmed) return;
    await onSubmit(trimmed);
    setBody("");
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        placeholder="Escribe tu comentario..."
        required
        className="mb-2 w-full resize-none rounded-xl border border-slate-300 p-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || body.trim().length === 0}
          className="rounded-lg bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60"
        >
          {isSubmitting ? "Publicando..." : "Publicar comentario"}
        </button>
      </div>
    </form>
  );
}
