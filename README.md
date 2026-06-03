# Movies SPA

SPA desarrollada con **React 18 + TypeScript + Vite** que consume la API pública de [dummyjson.com](https://dummyjson.com) para listar "películas" (posts), ver su detalle, gestionar comentarios con autenticación, y calificar con estrellas.

## Instrucciones para correr

```bash
npm install
npm run dev      # Inicia el servidor de desarrollo en http://localhost:5173
npm run build    # Compila para producción (tsc + vite build)
npm run preview  # Sirve el build de producción en http://localhost:4173
```

## Credenciales de prueba

| Campo     | Valor        |
|-----------|--------------|
| Usuario   | `emilys`     |
| Contraseña| `emilyspass` |

La pantalla de login incluye un botón "Completar automáticamente" para agilizar la demo.

---

## Decisiones técnicas

### Framework y bundler
- **Vite + React 18 + TypeScript**: Vite ofrece un dev server extremadamente rápido (esbuild para transformaciones, Rollup para build). `create-react-app` está deprecado. TypeScript agrega tipado estático que reduce bugs en runtime y actúa como documentación viva de los contratos con la API.

### Estilos
- **Tailwind CSS v3**: utility-first. El build de producción purgará todas las clases no utilizadas, resultando en un CSS mínimo. Se evitó una librería de componentes para mantener control total del diseño.

### Routing
- **react-router-dom v6** con `createBrowserRouter`: API moderna que soporta data loaders. Las rutas de detalle y listado usan `useSearchParams` para mantener el estado de paginación en la URL (el usuario puede copiar/pegar el link y conservar la página actual).

### Manejo de estado
- **TanStack Query v5** para *server state*: maneja cache, estados de carga/error, refetch y `placeholderData` (datos previos mientras carga la siguiente página) de forma declarativa.
- **Context API** para *client state* (auth): el estado de autenticación es simple (un usuario + token). Redux o Zustand serían sobreingeniería para este caso.

### Autenticación
- El token se guarda en `localStorage` y se restaura al iniciar la app validándolo contra `/auth/me`. Si el token expiró, se hace logout limpio. Mientras se valida, se muestra un spinner para evitar un flash de redirect.
- La inyección del token en cada request autenticado ocurre en el wrapper `api.ts`, garantizando un único punto de control.

### HTTP Client
- `fetch` nativo (sin axios): suficiente para este caso y evita una dependencia extra. El wrapper `api.ts` centraliza: errores tipados (`ApiError`), token automático, base URL.

### CRUD de comentarios y estado local
- El backend de dummyjson **no persiste** los cambios. La estrategia implementada:
  1. Se obtienen los comentarios del servidor.
  2. Se aplica encima un "patch local" desde `localStorage`: comentarios creados (IDs negativos para evitar colisiones), ediciones y eliminaciones.
  3. Al crear un comentario se hace **optimistic UI**: se inserta inmediatamente en la UI antes de que el servidor responda, mejorando la percepción de velocidad.
- Los comentarios locales se persisten en `localStorage` por `postId`, sobreviviendo recargas.

---

## Feature libre: Calificación de películas (1-5 estrellas)

### Motivación
El objetivo de la app es que el usuario pueda opinar sobre "películas". Las reactions del API (likes/dislikes) son métricas de la comunidad, pero no personales. El sistema de estrellas permite al usuario expresar **su propia valoración** de forma intuitiva.

### Implementación
- Componente `StarRating` reutilizable (acepta `readonly` y `onChange`).
- Hook `useRating(postId)` que lee/escribe en `localStorage` con `ratingsStorage`.
- Visible en la tarjeta del listado (solo lectura si no autenticado, interactivo si está logueado) y en la página de detalle.
- Persiste entre sesiones gracias a `localStorage`.

### Utilidad
- Diferencia la experiencia: el usuario ve su calificación personal junto a las métricas colectivas.
- Es un feature natural para una app de "películas" y demuestra manejo de estado persistido del lado del cliente.

---

## Estructura del proyecto

```
src/
├── components/
│   ├── comments/   # CommentSection, CommentItem, CommentForm
│   ├── layout/     # Layout, Navbar
│   ├── posts/      # PostCard, ReactionBar
│   └── ui/         # StarRating, Pagination
├── context/        # AuthContext
├── hooks/          # useAuth, usePosts, usePost, useCommentsCrud, useDebounce, useRating
├── lib/            # api.ts, queryClient.ts, storage.ts
├── pages/          # PostsPage, PostDetailPage, LoginPage
├── router/         # ProtectedRoute
└── types/          # index.ts (interfaces de la API)
```
