# Architecture Reference

A reference for the feature-based architecture this project will adopt as it grows. Code blocks below are illustrative — they show the *pattern*, not running files. Copy them when scaffolding a new feature; keep them updated as patterns evolve.

Currently Noor uses a flatter `src/pages/*` + `src/components/*` shape inherited from its Lovable origin. The structure below is the **target** — see [Migration](#migration) for how to get there incrementally.

---

## Architectural principles

1. **Feature-based, not type-based.** `features/<name>/` owns its UI, hooks, services, and types. You move a feature by moving one folder.
2. **Server-first.** Pages and lists default to Server Components. `'use client'` only when interactivity demands it.
3. **Three-layer data flow.** UI → Hook → Service. Components never call `fetch` directly; hooks own caching/invalidation; services own the network/DB call.
4. **Strict server/client split.** Anything in `src/server/` is `import 'server-only'`. Server Components import server services directly to skip the network hop.
5. **Thin pages.** A `page.tsx` exports `metadata` and renders a feature component. No JSX trees, no business logic.

---

## Folder structure

```
src/
├── app/                       # Routes only — thin server components
│   ├── (public)/
│   │   ├── layout.tsx
│   │   └── login/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   └── users/
│   │       ├── page.tsx
│   │       ├── loading.tsx
│   │       └── [id]/
│   │           ├── page.tsx
│   │           └── not-found.tsx
│   ├── api/
│   │   ├── auth/route.ts      # POST = login, DELETE = logout
│   │   └── users/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   ├── layout.tsx
│   └── globals.css
│
├── features/                  # One folder per feature
│   ├── auth/
│   │   ├── components/        # UI only
│   │   ├── hooks/             # Business logic
│   │   ├── services/          # API calls
│   │   ├── store/             # Zustand
│   │   ├── schemas.ts         # Zod (shared with route handler)
│   │   ├── types.ts
│   │   └── utils.ts
│   └── users/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── types.ts
│       └── utils.ts
│
├── shared/                    # Cross-feature reusables
│   ├── components/
│   │   ├── ui/                # shadcn primitives only
│   │   └── providers.tsx
│   ├── hooks/
│   ├── lib/                   # api-client, query-client, cn
│   ├── utils/
│   └── constants/
│       └── query-keys.ts
│
├── server/                    # Server-only — never crosses to client
│   ├── db/
│   ├── services/              # *.server.ts
│   └── utils/
│
├── config/
│   ├── env.ts                 # Zod-validated at boot
│   └── routes.ts              # All path constants
│
└── types/
```

---

## Strict rules

1. **No business logic in `src/app/`.** Route files import and render; delegate everything else.
2. **No raw `fetch`.** Always use `src/shared/lib/api-client.ts`.
3. **No `server-only` imports in client components.** Refuse if asked.
4. **No hardcoded route strings.** Always reference `src/config/routes.ts`.
5. **No inline TanStack Query keys.** Always use `src/shared/constants/query-keys.ts`.
6. **No duplicated Zod schemas.** One schema per data shape, shared across form and route handler.
7. **Server Components fetch directly** — never via HTTP from inside a Server Component.
8. **Client components needing server-fetched data** use `initialData` seeding.
9. **New features go in `src/features/<feature>/`** — never colocated inside `src/app/`.
10. **`src/shared/components/ui/`** contains only primitives — no feature logic.

### Intentional deviations

- Styles in `src/app/globals.css`, **not** a separate `src/styles/` folder.
- Auth uses POST (login) + DELETE (logout) on `/api/auth`, **not** separate `/login` / `/logout` paths.

Don't "fix" these.

---

## Layer reference

### Config layer — `src/config/`

`env.ts` — validate environment variables at boot:

```ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:3000/api'),
  SESSION_SECRET: z.string().min(16).optional(),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

export const env = parsed.data;
```

`routes.ts` — every path string lives here:

```ts
export const routes = {
  home: '/',
  login: '/login',
  dashboard: {
    users: '/users',
    user: (id: string) => `/users/${id}`,
  },
  api: {
    auth: '/api/auth',
    users: '/api/users',
    user: (id: string) => `/api/users/${id}`,
  },
} as const;
```

### Shared layer — `src/shared/`

`lib/api-client.ts` — the only place `fetch` is allowed:

```ts
import { env } from '@/config/env';

export class ApiError extends Error {
  constructor(public status: number, message: string, public payload?: unknown) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | undefined | null>;
}

const buildUrl = (path: string, params?: RequestOptions['params']) => {
  const base = path.startsWith('http') ? path : `${env.NEXT_PUBLIC_API_URL}${path}`;
  if (!params) return base;
  const search = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== '') search.set(k, String(v));
  }
  const qs = search.toString();
  return qs ? `${base}?${qs}` : base;
};

const request = async <T>(path: string, { params, headers, ...init }: RequestOptions = {}): Promise<T> => {
  const res = await fetch(buildUrl(path, params), {
    ...init,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...headers },
    cache: init.cache ?? 'no-store',
  });
  const text = await res.text();
  const data = text ? (JSON.parse(text) as unknown) : null;
  if (!res.ok) {
    const message =
      data && typeof data === 'object' && 'message' in data && typeof data.message === 'string'
        ? data.message
        : res.statusText;
    throw new ApiError(res.status, message, data);
  }
  return data as T;
};

export const apiClient = {
  get: <T>(path: string, opts?: RequestOptions) => request<T>(path, { ...opts, method: 'GET' }),
  post: <T>(path: string, body?: unknown, opts?: RequestOptions) =>
    request<T>(path, { ...opts, method: 'POST', body: body !== undefined ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string, opts?: RequestOptions) => request<T>(path, { ...opts, method: 'DELETE' }),
  // put, patch — same shape
};
```

`lib/query-client.ts` — SSR-safe TanStack Query client:

```ts
import { QueryClient, isServer } from '@tanstack/react-query';
import { ApiError } from './api-client';

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          if (error instanceof ApiError && error.status >= 400 && error.status < 500) return false;
          return failureCount < 2;
        },
      },
      mutations: { retry: 0 },
    },
  });

let browserQueryClient: QueryClient | undefined;

export const getQueryClient = () => {
  if (isServer) return makeQueryClient();      // fresh client per request
  browserQueryClient ??= makeQueryClient();    // singleton in the browser
  return browserQueryClient;
};
```

`constants/query-keys.ts` — every query key, never inline:

```ts
export const QUERY_KEYS = {
  users: {
    all: ['users'] as const,
    list: (filter?: Record<string, unknown>) => ['users', 'list', filter ?? {}] as const,
    detail: (id: string) => ['users', 'detail', id] as const,
  },
  auth: { me: ['auth', 'me'] as const },
} as const;
```

### Server layer — `src/server/`

Every file starts with `'server-only'`. Server Components import these directly; route handlers wrap them. Same module, two callers, no duplication.

`server/services/users.server.ts`:

```ts
import 'server-only';
import { mockDb } from '@/server/db/mock-db';
import type { User, UserListFilter } from '@/features/users/types';

export const usersServerService = {
  list: async (filter?: UserListFilter): Promise<User[]> => {
    const all = await mockDb.users.findMany();
    if (!filter) return all;
    const search = filter.search?.trim().toLowerCase();
    return all.filter((u) => {
      if (filter.role && u.role !== filter.role) return false;
      if (search && !u.name.toLowerCase().includes(search) && !u.email.toLowerCase().includes(search)) {
        return false;
      }
      return true;
    });
  },
  byId: (id: string) => mockDb.users.findById(id),
};
```

`server/utils/session.ts` — httpOnly cookie management:

```ts
import 'server-only';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'session';

export const setSessionCookie = async (token: string, expiresAt: string) => {
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(expiresAt),
    path: '/',
  });
};

export const clearSessionCookie = async () => (await cookies()).delete(COOKIE_NAME);
export const getSessionToken = async () => (await cookies()).get(COOKIE_NAME)?.value ?? null;
```

### App layer — `src/app/`

Pages do exactly three things:

1. Export `metadata` (or `generateMetadata`).
2. `await` data from a server service (Server Components only).
3. Render a feature component.

Anything else belongs in a feature.

---

## Feature walkthroughs

### Users — query flow (Server Component → Client reactive search)

**Server Component** at `app/(dashboard)/users/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { usersServerService } from '@/server/services/users.server';
import { UsersSearch } from '@/features/users/components/users-search';

export const metadata: Metadata = { title: 'Users' };

export default async function UsersPage() {
  const users = await usersServerService.list();   // direct call — no HTTP
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Users ({users.length})</h1>
      <UsersSearch initialData={users} />
    </div>
  );
}
```

**Dynamic Server Component** at `app/(dashboard)/users/[id]/page.tsx`:

```tsx
import { notFound } from 'next/navigation';
import { usersServerService } from '@/server/services/users.server';
import { UserDetail } from '@/features/users/components/user-detail';

interface PageProps { params: Promise<{ id: string }> }

export default async function UserDetailPage({ params }: PageProps) {
  const { id } = await params;
  const user = await usersServerService.byId(id);
  if (!user) notFound();
  return <UserDetail user={user} />;
}
```

**Client wrapper** at `features/users/components/users-search.tsx` — adds reactive search on top of SSR'd data:

```tsx
'use client';

import { useState } from 'react';
import { Input } from '@/shared/components/ui/input';
import { useDebouncedValue } from '@/shared/hooks/use-debounced-value';
import { useUsers } from '../hooks/use-users';
import { UserList } from './user-list';
import type { User } from '../types';

export function UsersSearch({ initialData }: { initialData: User[] }) {
  const [search, setSearch] = useState('');
  const debounced = useDebouncedValue(search);

  const { data } = useUsers(
    { search: debounced || undefined },
    { initialData: debounced ? undefined : initialData },   // seed only when no search → no loading flash
  );

  return (
    <div className="space-y-4">
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…" />
      <UserList users={data ?? initialData} />
    </div>
  );
}
```

**Hook** at `features/users/hooks/use-users.ts`:

```ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { usersService } from '../services/users.service';
import { QUERY_KEYS } from '@/shared/constants/query-keys';
import type { User, UserListFilter } from '../types';

export const useUsers = (
  filter?: UserListFilter,
  options?: { initialData?: User[] },
) =>
  useQuery({
    queryKey: QUERY_KEYS.users.list(filter),
    queryFn: () => usersService.list(filter),
    initialData: options?.initialData,
    staleTime: options?.initialData ? 30 * 1000 : 0,
  });
```

**Service** at `features/users/services/users.service.ts` — client-side only:

```ts
import { apiClient } from '@/shared/lib/api-client';
import { routes } from '@/config/routes';
import type { User, UserListFilter } from '../types';

export const usersService = {
  list: (filter?: UserListFilter) =>
    apiClient.get<User[]>(routes.api.users, {
      params: { search: filter?.search, role: filter?.role },
    }),
  byId: (id: string) => apiClient.get<User>(routes.api.user(id)),
};
```

**Route handler** at `app/api/users/route.ts` — thin HTTP boundary, calls the same server service the page calls:

```ts
import { NextResponse } from 'next/server';
import { usersServerService } from '@/server/services/users.server';
import type { UserRole } from '@/features/users/types';

const isUserRole = (v: string | null): v is UserRole => v === 'admin' || v === 'member';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') ?? undefined;
  const roleParam = searchParams.get('role');
  const role = isUserRole(roleParam) ? roleParam : undefined;
  const users = await usersServerService.list({ search, role });
  return NextResponse.json(users);
}
```

### Auth — mutation flow with shared schema and Zustand

**Shared Zod schema** at `features/auth/schemas.ts` — used by *both* form and route handler:

```ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type LoginValues = z.infer<typeof loginSchema>;
```

**Form component** at `features/auth/components/login-form.tsx` — UI only:

```tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useLogin } from '../hooks/use-login';
import { loginSchema, type LoginValues } from '../schemas';

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });
  const { mutate, isPending, error } = useLogin();

  return (
    <form onSubmit={handleSubmit((values) => mutate(values))} noValidate className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register('password')} />
        {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
      </div>
      {error && <p role="alert" className="text-sm text-destructive">{error.message}</p>}
      <Button type="submit" disabled={isPending}>{isPending ? 'Signing in…' : 'Sign in'}</Button>
    </form>
  );
}
```

**Hook** at `features/auth/hooks/use-login.ts` — owns the side effects:

```ts
'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../store/auth.store';
import { routes } from '@/config/routes';
import type { LoginInput } from '../types';

export const useLogin = () => {
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: (input: LoginInput) => authService.login(input),
    onSuccess: (session) => {
      setSession(session);
      router.push(routes.dashboard.users);
      router.refresh();   // re-run Server Components that depend on the cookie
    },
  });
};
```

**Zustand store** at `features/auth/store/auth.store.ts` — global session, persisted to localStorage:

```ts
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AuthSession } from '../types';

interface AuthState {
  session: AuthSession | null;
  setSession: (session: AuthSession | null) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),
      clear: () => set({ session: null }),
    }),
    { name: 'auth-session', storage: createJSONStorage(() => localStorage) },
  ),
);

export const useCurrentUser = () => useAuthStore((s) => s.session?.user ?? null);
export const useIsAuthenticated = () => useAuthStore((s) => s.session !== null);
```

The Zustand store hydrates UI on a hard refresh; the *real* source of truth for auth is the httpOnly cookie set by the server. They must agree.

**Route handler** at `app/api/auth/route.ts` — POST = login, DELETE = logout, validated with the *same* `loginSchema`:

```ts
import { NextResponse } from 'next/server';
import { authServerService } from '@/server/services/auth.server';
import { setSessionCookie, clearSessionCookie } from '@/server/utils/session';
import { loginSchema } from '@/features/auth/schemas';

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as unknown;
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid input', errors: parsed.error.flatten() }, { status: 400 });
  }
  try {
    const session = await authServerService.login(parsed.data);
    await setSessionCookie(session.token, session.expiresAt);
    return NextResponse.json(session);
  } catch (err) {
    const status = (err as { status?: number }).status ?? 500;
    return NextResponse.json({ message: (err as Error).message }, { status });
  }
}

export async function DELETE() {
  await clearSessionCookie();
  return new NextResponse(null, { status: 204 });
}
```

---

## Server vs Client checklist

Default to **Server**. Reach for `'use client'` only when you need:

- `useState` / `useReducer` / `useRef`
- Event handlers (`onClick`, `onChange`)
- Browser APIs (`localStorage`, `IntersectionObserver`)
- TanStack Query / Zustand subscriptions

Server Components nested as `children` of Client Components are fine — pass them through.

---

## State management

| State | Where it lives |
|-------|----------------|
| Server data (lists, details, mutations) | TanStack Query |
| Form state | `react-hook-form` + Zod |
| Cross-page session | Zustand store |
| One-component UI state | `useState` |

Zustand is reserved for state that is genuinely global. Lifting everything into a store hides dependencies and makes refactoring painful.

---

## Migration

A big-bang restructure usually fails. Migrate in slices, one feature at a time, while the old structure keeps working.

### Step 0 — Scaffold without disrupting routes

Create `src/features/`, `src/shared/`, `src/server/`, `src/config/` next to the existing `src/components/` and `src/pages/`. Add path aliases in `tsconfig.json`. Nothing breaks because nothing imports from them yet.

### Step 1 — Extract shared primitives first

Move `src/lib/utils.ts` → `src/shared/lib/cn.ts`. Move `src/components/ui/*` → `src/shared/components/ui/*`. Add re-exports at the old paths so existing imports keep working:

```ts
// src/lib/utils.ts (compat shim — delete after migration)
export { cn } from '@/shared/lib/cn';
```

This unblocks new feature work without forcing a rewrite of every existing page.

### Step 2 — Pick one cohesive feature and lift it

For Noor, the natural first slice is **Quran reading** (`src/pages/QuranReader.tsx` + `src/data/surahs.ts` + `src/data/verses.ts`). Create `src/features/quran/`:

```
features/quran/
├── components/
│   └── quran-reader.tsx           # was src/pages/QuranReader.tsx
├── data/
│   ├── surahs.ts
│   └── verses.ts
├── hooks/
│   └── use-bookmarked-verses.ts   # extract from QuranReader's useState
├── types.ts
└── utils.ts
```

Update `src/app/quran/page.tsx`:

```tsx
import { QuranReader } from '@/features/quran/components/quran-reader';
export default function QuranPage() { return <QuranReader />; }
```

Delete `src/pages/QuranReader.tsx`. Repeat per feature, one PR each: Surahs, Translations, Tafsir, Audio, Topics, Articles, Search, Dashboard.

### Step 3 — Introduce the data layer when you add a backend

While data is hardcoded TS, the `data/` folder inside the feature is fine. The day you wire up a real API:

1. Add `src/server/db/quran.ts`.
2. Add `src/server/services/quran.server.ts`.
3. Add `src/features/quran/services/quran.service.ts`.
4. Add `src/features/quran/hooks/use-surahs.ts`.
5. Update Server Components to `await quranServerService.list()`-style calls.

### Step 4 — Route groups last

Once features are migrated, wrap routes in groups: `app/(public)/quran/`, `app/(reader)/quran/[surah]/`. URLs don't change because route groups are invisible.

### Step 5 — Delete the compat shims

After every page imports from `@/features/*` and `@/shared/*`, delete `src/pages/`, the legacy folders, and the re-export shims. One clean PR.

### What to avoid

- **Don't** move files and rewrite them in the same PR — split into "move with shim" and "refactor in place".
- **Don't** introduce new patterns (Zustand, TanStack Query, server services) until at least one feature has been moved into the new shape.
- **Don't** migrate the dashboard until at least two other features are done.
- **Don't** rename routes during migration — preserve URLs.
