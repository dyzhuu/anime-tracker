import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import AuthProvider from './context/AuthProvider';
import QueryProvider from './context/QueryProvider';
import ThemeProvider from './context/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MSAnime',
  description: 'Fullstack anime tracking website for NZMSA23',
  manifest: "/manifest.json",
  themeColor: "#ffffff"
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
          <AuthProvider>
            <ThemeProvider>
              <main>{children}</main>
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
