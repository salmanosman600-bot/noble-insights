import { env } from '@/config/env';

// Single place that calls `fetch`. Feature services use this; raw `fetch` is
// not allowed elsewhere.

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public payload?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestOptions extends RequestInit {
  /** Override the base URL for cross-origin services. */
  baseUrl?: string;
  params?: Record<string, string | number | undefined | null>;
}

const buildUrl = (path: string, baseUrl: string, params?: RequestOptions['params']) => {
  const base = path.startsWith('http') ? path : `${baseUrl}${path}`;
  if (!params) return base;

  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, String(value));
    }
  }
  const qs = search.toString();
  return qs ? `${base}?${qs}` : base;
};

const request = async <T>(
  path: string,
  { baseUrl = env.NEXT_PUBLIC_QURANENC_API_URL, params, headers, ...init }: RequestOptions = {},
): Promise<T> => {
  const res = await fetch(buildUrl(path, baseUrl, params), {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
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
  get: <T>(path: string, opts?: RequestOptions) =>
    request<T>(path, { ...opts, method: 'GET' }),
  post: <T>(path: string, body?: unknown, opts?: RequestOptions) =>
    request<T>(path, {
      ...opts,
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),
  delete: <T>(path: string, opts?: RequestOptions) =>
    request<T>(path, { ...opts, method: 'DELETE' }),
};
