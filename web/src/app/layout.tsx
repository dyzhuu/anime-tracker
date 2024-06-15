import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import AuthProvider from './context/AuthProvider';
import QueryProvider from './context/QueryProvider';
import ThemeProvider from './context/ThemeProvider';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AniTrack',
  description: 'Track and discover anime.',
  manifest: '/manifest.json',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'hsl(0 0% 99%)' },
    { media: '(prefers-color-scheme: dark)', color: 'hsl(255 9% 8%)' }
  ]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider>
            <AuthProvider>
              <main>{children}</main>
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
