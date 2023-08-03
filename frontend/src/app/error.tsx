'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Icons } from '@/lib/icons';
import Link from 'next/link';

export default function Error() {
  return (
    <div className="w-full h-[100dvh] flex justify-center items-center -md:bg-card">
      <Card className="md:p-32 md:px-40 -md:border-hidden -md:shadow-none">
        <CardTitle className="text-4xl text-center px-2">
          Something went wrong <span className="pl-2">{':('}</span>
        </CardTitle>
        <CardContent className="flex flex-col justify-center items-center gap-5 mt-5">
          <p className="text-lg font-medium">Please try again later...</p>
          <Button asChild variant={'destructive'} className="p-5 mt-5">
            <Link href="/" className="text-lg text-center">
              Return home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
