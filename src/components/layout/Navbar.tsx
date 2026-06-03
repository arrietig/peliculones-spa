import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

function LogOutIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-black/20 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          to="/"
          className="flex items-center transition-opacity duration-200 hover:opacity-80"
          aria-label="PELICULONES - Inicio"
        >
          <img
            src="/logo.png"
            alt="PELICULONES"
            className="h-14 w-auto sm:h-16"
          />
        </Link>

        <nav className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-medium text-white">
                  {user.firstName} {user.lastName}
                </span>
                <span className="text-xs text-muted">@{user.username}</span>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/20 border border-brand/40 text-sm font-semibold text-brand">
                {user.firstName[0]}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 cursor-pointer btn-ghost px-3 py-1.5 text-sm"
              >
                <LogOutIcon />
                <span className="hidden sm:block">Salir</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn-primary px-4 py-1.5 text-sm rounded-lg"
            >
              Iniciar sesión
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
