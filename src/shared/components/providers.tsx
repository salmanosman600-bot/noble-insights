'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { getQueryClient } from '@/shared/lib/query-client';

// Mounted once at the root. The QueryClient comes from `getQueryClient()`,
// which returns a per-request client on the server and a singleton in the
// browser — the SSR-safe pattern.

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
}
