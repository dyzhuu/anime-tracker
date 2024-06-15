import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="w-full h-[100dvh] flex justify-center items-center -md:bg-card">
      <Card className="md:p-32 md:px-40 -md:border-hidden -md:shadow-none">
        <CardTitle className="text-4xl text-center">Page Not Found</CardTitle>
        <CardContent className="flex justify-center mt-10">
          <Button asChild className="p-5">
            <Link href="/" className="text-lg text-center">
              Return Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
