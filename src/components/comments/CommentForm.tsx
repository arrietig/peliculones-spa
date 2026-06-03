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
        className="input-glass mb-2 w-full resize-none rounded-2xl p-4 text-sm"
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || body.trim().length === 0}
          className="btn-primary cursor-pointer rounded-xl px-6 py-2 text-sm"
        >
          {isSubmitting ? "Publicando..." : "Publicar comentario"}
        </button>
      </div>
    </form>
  );
}
