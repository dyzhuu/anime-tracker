import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function AnimeLoadingPage() {
  return (
    <div className="flex justify-center -md:bg-card p-3 md:p-10">
      <Card className="w-full pt-5 max-w-6xl -md:border-none">
        <CardHeader className="-md:text-center pb-2">
          <Skeleton className="w-28 h-8"></Skeleton>
          <Skeleton className="w-40 h-6"></Skeleton>
        </CardHeader>
        <div className="mx-5">
          <Separator className="mb-5"></Separator>
        </div>
        <CardContent className="">
          <div className="flex -md:flex-col -md:items-center gap-10">
            <div className="w-[250px] shrink-0">
              <AspectRatio ratio={3 / 4} className="relative">
                <Skeleton className="absolute w-full h-full"></Skeleton>
              </AspectRatio>
            </div>
            <Separator className="md:hidden"></Separator>
            <div className="md:h-[393px] overflow-y-auto mask-image py-1 md:pr-3 w-full space-y-1">
              <h1 className="text-lg font-medium">Description</h1>
              <Skeleton className="w-full h-5"></Skeleton>
              <Skeleton className="w-full h-5"></Skeleton>
              <Skeleton className="w-full h-5"></Skeleton>
              <Skeleton className="w-full h-5"></Skeleton>
              <Skeleton className="w-full h-5"></Skeleton>
              <Skeleton className="w-full h-5"></Skeleton>
              <Skeleton className="w-2/3 h-5"></Skeleton>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
