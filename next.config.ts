import type { NextConfig } from 'next';

// When NEXT_EXPORT=1 (set by GitHub Actions), produce a fully static `out/`
// directory suitable for GitHub Pages. Local dev and `next start` are unaffected.
const isExport = process.env.NEXT_EXPORT === '1';

// GitHub Pages serves from https://username.github.io/<repo-name>/.
// The Actions workflow sets NEXT_PUBLIC_BASE_PATH=/<repo-name>.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  ...(isExport && {
    output: 'export',
    basePath,
    // next/image optimisation is server-only; disable it for static builds.
    // The project doesn't use <Image> components so this has no visual impact.
  }),

  images: {
    formats: ['image/avif', 'image/webp'],
    ...(isExport && { unoptimized: true }),
  },

  // Security headers are set here for server deployments (Vercel, etc.).
  // They are intentionally omitted for static GitHub Pages builds because
  // GitHub Pages does not support custom HTTP response headers.
  ...(!isExport && {
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'X-Frame-Options', value: 'DENY' },
            { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
            { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          ],
        },
      ];
    },
  }),
};

export default nextConfig;
