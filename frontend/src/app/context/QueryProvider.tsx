'use client';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
    }
  }
});


export default function QueryProvider({ children }: { children: React.ReactNode }) {
  
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}