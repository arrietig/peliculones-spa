# PELICULONES

SPA desarrollada con **React 18 + TypeScript + Vite** para listar películas, ver su detalle, gestionar comentarios con autenticación JWT y calificar con estrellas. Consume [dummyjson.com](https://dummyjson.com) para auth y CRUD de comentarios.

## Instrucciones para correr

```bash
npm install
npm run dev      # Servidor de desarrollo en http://localhost:5173
npm run build    # Compilación de producción (tsc + vite build)
npm run preview  # Sirve el build de producción en http://localhost:4173
```

## Credenciales de prueba

| Campo      | Valor        |
|------------|--------------|
| Usuario    | `rrxttqx100`          |
| Contraseña | `Unamorquenuncamorira` |

---

## Decisiones técnicas

### Framework y bundler
- **Vite + React 18 + TypeScript**: Vite usa ESM nativos en dev (sin bundling previo), lo que hace el HMR prácticamente instantáneo. `create-react-app` está en modo mantenimiento desde 2023. TypeScript en modo estricto actúa como documentación viva de los contratos internos.

### Estilos
- **Tailwind CSS v3** utility-first con tema personalizado: paleta `brand` púrpura, sombras `glow`, fuentes `Righteous` (display) y `Poppins` (body). Se evitó una librería de componentes para control total del diseño. Glassmorphism implementado como utilidades custom en `@layer utilities`.

### Routing
- **react-router-dom v6** con `createBrowserRouter`. El estado de paginación, búsqueda y filtro de género vive en la URL (`?page=1&limit=10&genre=terror&q=`) — el usuario puede compartir o guardar una búsqueda específica.

### Manejo de estado
- **TanStack Query v5** para *server state*: caché, estados de carga/error, `placeholderData` (mantiene datos anteriores mientras carga la página siguiente) y deduplicación de requests.
- **Context API** para *client state* (auth): el estado de autenticación es simple (usuario + token). Redux o Zustand serían sobreingeniería para este caso.

### Autenticación
- Token JWT guardado en `localStorage`, restaurado al montar la app validándolo contra `GET /auth/me`. Si venció, logout limpio. El flag `isLoading: true` durante la restauración evita el flash de redirect a login.
- Inyección del token centralizada en `api.ts` (`auth: true`), único punto de control para todos los requests autenticados.

### HTTP Client
- `fetch` nativo sin axios. El wrapper `api.ts` centraliza: errores tipados con clase `ApiError` (incluye `status`), token automático, base URL configurable.

### CRUD de comentarios y estado local
El backend de dummyjson **no persiste** los cambios. Estrategia implementada en `useCommentsCrud`:
1. Comentarios parten en **0** por diseño — el primer comentarista es quien use la app.
2. Al crear: **optimistic UI** con `tempId` negativo (`-Date.now()`) para evitar colisiones con IDs reales. Se inserta en UI antes de que el servidor responda; en caso de error se revierte.
3. Al editar/borrar: reflejo inmediato en estado local.
4. Todos los cambios se persisten en `localStorage` por `postId` (sobreviven recargas).
5. Las mutaciones (POST/PUT/DELETE) llaman al API de dummyjson, cumpliendo el requisito de uso real del backend.

---

## Feature libre: Calificación de películas (1–5 estrellas)

### Motivación
Las métricas del API (likes/dislikes) son colectivas y no modificables por el usuario. El sistema de estrellas permite expresar una **valoración personal** de forma intuitiva, diferenciando la experiencia individual de la métrica agregada.

### Implementación
- Componente `StarRating` reutilizable: acepta `value`, `onChange` (opcional, para modo readonly) y `size`.
- Hook `useRating(postId)`: lee/escribe en `localStorage` via `ratingsStorage`.
- Visible en cada card del listado (readonly si no está autenticado, interactivo si lo está) y en la página de detalle.
- Persiste entre sesiones sin necesidad de backend.

---

## Estructura del proyecto

```
src/
├── components/
│   ├── comments/   # CommentSection, CommentItem, CommentForm
│   ├── layout/     # Layout, Navbar
│   ├── posts/      # PostCard
│   └── ui/         # StarRating, Pagination
├── context/        # AuthContext (login, logout, restauración de sesión)
├── data/           # movies.ts (33 películas con posters TMDB y trailers YouTube)
├── hooks/          # useAuth, useMovies, useCommentsCrud, useDebounce, useRating
├── lib/            # api.ts, queryClient.ts, storage.ts
├── pages/          # PostsPage, PostDetailPage, LoginPage
└── router/         # ProtectedRoute
```
