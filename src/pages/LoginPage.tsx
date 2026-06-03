import { type FormEvent, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ApiError } from "@/lib/api";

function FilmIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
      <rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18" />
      <line x1="7" x2="7" y1="2" y2="22" />
      <line x1="17" x2="17" y1="2" y2="22" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <line x1="2" x2="7" y1="7" y2="7" />
      <line x1="2" x2="7" y1="17" y2="17" />
      <line x1="17" x2="22" y1="17" y2="17" />
      <line x1="17" x2="22" y1="7" y2="7" />
    </svg>
  );
}

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) return <Navigate to="/" replace />;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login({ username: username.trim(), password });
      navigate("/", { replace: true });
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Error de conexión. Intenta de nuevo.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  function fillDemo() {
    setUsername("emilys");
    setPassword("emilyspass");
    setError(null);
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="glass rounded-3xl p-8 shadow-glow">
          <div className="mb-6 flex flex-col items-center gap-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/20 border border-brand/30 text-brand">
              <FilmIcon />
            </div>
            <h1 className="font-display text-2xl font-bold text-white">PELICULONES</h1>
            <p className="text-sm text-slate-400">Accede para comentar y valorar</p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400">
                Usuario
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                placeholder="emilys"
                className="input-glass w-full rounded-xl px-3 py-2.5 text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="input-glass w-full rounded-xl px-3 py-2.5 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full rounded-xl py-2.5 text-sm cursor-pointer"
            >
              {isSubmitting ? "Ingresando..." : "Ingresar"}
            </button>
          </form>

          <div className="mt-6 rounded-xl border border-white/5 bg-white/3 p-4">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">
              Credenciales de prueba
            </p>
            <div className="mb-3 space-y-1 font-mono text-xs text-slate-400">
              <p>
                <span className="text-slate-600">usuario:</span>{" "}
                <span className="text-brand-light">emilys</span>
              </p>
              <p>
                <span className="text-slate-600">contraseña:</span>{" "}
                <span className="text-brand-light">emilyspass</span>
              </p>
            </div>
            <button
              type="button"
              onClick={fillDemo}
              className="btn-ghost cursor-pointer w-full py-1.5 text-xs font-medium rounded-lg"
            >
              Completar automáticamente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
