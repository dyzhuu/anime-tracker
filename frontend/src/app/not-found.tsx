import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="w-full h-[100dvh] flex justify-center items-center">
      <Card className="p-32 px-40">
        <CardTitle className="text-4xl">Page Not Found</CardTitle>
        <CardContent className="flex justify-center mt-10 text-lg underline underline-offset-4 text-muted-foreground hover:text-primary">
          <Link href="/">Return Home</Link>
        </CardContent>
      </Card>
    </div>
  );
}
