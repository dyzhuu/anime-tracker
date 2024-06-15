import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function AuthLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Link href="/">
        <Button
          className="absolute left-4 top-3 font-medium px-3"
          variant="ghost"
        >
          Home
        </Button>
      </Link>
      <div className="flex justify-center items-center h-[100dvh]">
        <Card className="border-card shadow-none md:border-border md:shadow-sm h-[100dvh] w-[100dvw] md:h-fit md:min-h-[650px] md:max-w-[480px] p-10 md:p-16 md:py-24 flex justify-center items-center">
          <div className="flex flex-col w-[350px] text-center space-y-8">
            {children}
          </div>
        </Card>
      </div>
    </div>
  );
}
