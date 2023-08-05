import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Icons } from '@/lib/icons';

export default function Loading() {
  return (
    <div className="flex justify-center md:p-10">
      <Card className="w-full py-5 -md:border-none -md:shadow-none -md:bg-background">
        <CardContent className="p-2 h-full animate-pulse">
          <div className="flex justify-center h-full">
            <Icons.spinner className="animate-spin w-[50px] h-[50px]"></Icons.spinner>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
