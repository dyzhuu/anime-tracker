import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex justify-center md:p-10">
      <Card className="w-full py-5 -md:border-hidden -md:shadow-none -md:bg-background">
        <CardHeader className="text-3xl font-medium px-10">
          Trending Anime
        </CardHeader>
        <div className="mx-5">
          <Separator className="mb-10"></Separator>
        </div>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-center -md:p-1 mb-10 gap-4">
            <AspectRatio ratio={3 / 4} className="rounded-md">
              <Skeleton className="w-full h-full bg-muted absolute group-hover:scale-[1.5]"></Skeleton>
            </AspectRatio>
            <AspectRatio ratio={3 / 4} className="rounded-md">
              <Skeleton className="w-full h-full bg-muted absolute group-hover:scale-[1.5]"></Skeleton>
            </AspectRatio>
            <AspectRatio ratio={3 / 4} className="rounded-md">
              <Skeleton className="w-full h-full bg-muted absolute group-hover:scale-[1.5]"></Skeleton>
            </AspectRatio>
            <AspectRatio ratio={3 / 4} className="rounded-md">
              <Skeleton className="w-full h-full bg-muted absolute group-hover:scale-[1.5]"></Skeleton>
            </AspectRatio>
            <AspectRatio ratio={3 / 4} className="rounded-md">
              <Skeleton className="w-full h-full bg-muted absolute group-hover:scale-[1.5]"></Skeleton>
            </AspectRatio>
            <AspectRatio ratio={3 / 4} className="rounded-md">
              <Skeleton className="w-full h-full bg-muted absolute group-hover:scale-[1.5]"></Skeleton>
            </AspectRatio>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
