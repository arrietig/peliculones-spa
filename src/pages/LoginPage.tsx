import { type FormEvent, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ApiError } from "@/lib/api";

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

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="glass rounded-3xl p-8 shadow-glow">
          <div className="mb-6 flex flex-col items-center gap-2">
            <img src="/logo.png" alt="PELICULONES" className="h-24 w-auto sm:h-28" />
            <p className="text-sm text-slate-400">Accedé para comentar y valorar</p>
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
            <div className="space-y-1 font-mono text-xs text-slate-400">
              <p>
                <span className="text-slate-600">usuario:</span>{" "}
                <span className="text-brand-light">emilys</span>
              </p>
              <p>
                <span className="text-slate-600">contraseña:</span>{" "}
                <span className="text-brand-light">emilyspass</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
