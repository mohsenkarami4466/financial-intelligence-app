import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function QueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

/**
 * استخراج data از پاسخ سرویس؛ در صورت خطا throw می‌کند
 * @template T
 * @param {Promise<{ data: T | null, error: string | null }>} promise
 * @returns {Promise<T>}
 */
export async function unwrapService(promise) {
  const { data, error } = await promise;
  if (error) throw new Error(error);
  return data;
}
