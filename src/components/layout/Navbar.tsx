import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-brand hover:opacity-80"
        >
          🎬 Movies SPA
        </Link>

        <nav className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <img
                src={`https://dummyjson.com/icon/${user.username}/32`}
                alt={user.username}
                className="h-8 w-8 rounded-full border border-slate-200"
                onError={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.display = "none")
                }
              />
              <span className="hidden text-sm font-medium text-slate-700 sm:block">
                {user.firstName} {user.lastName}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-50"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-md bg-brand px-4 py-1.5 text-sm font-medium text-white transition hover:bg-brand-dark"
            >
              Iniciar sesión
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
