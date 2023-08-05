import { Button } from '../src/components/ui/button';
import { Card, CardContent, CardTitle } from '../src//components/ui/card';
import { ThemeProvider } from 'next-themes';
import Link from 'next/link';
import './styles.css';

export default function Offline() {
  return (
    <ThemeProvider>
      <div className="w-full h-[100dvh] -md:bg-card flex justify-center items-center">
        <Card className="p-3 md:p-24 md:px-40 -md:border-hidden -md:shadow-none">
          <CardTitle className="text-4xl text-center">
            Server offline <span className="pl-2">{':('}</span>
          </CardTitle>
          <CardContent className="flex flex-col justify-center items-center gap-5 mt-5">
            <p className="text-lg font-medium text-center">
              Please try again later...
            </p>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}
