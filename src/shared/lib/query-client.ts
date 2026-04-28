import { QueryClient, isServer } from '@tanstack/react-query';
import { ApiError } from './api-client';

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
            return false;
          }
          return failureCount < 2;
        },
      },
      mutations: { retry: 0 },
    },
  });

let browserQueryClient: QueryClient | undefined;

export const getQueryClient = () => {
  if (isServer) return makeQueryClient();
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
};
