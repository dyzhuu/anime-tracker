import { InfiniteAnimeScroll } from '@/components/InfiniteAnimeScroll';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getAnime, query } from '@/lib/gql';

export default async function NewPage() {
  const anime = await getAnime(query.new);
  return (
    <div className="flex justify-center md:p-10">
      <Card className="w-full py-5 -md:border-hidden">
        <CardHeader className="text-3xl font-medium text-primary px-10">
          New Releases
        </CardHeader>
        <div className="mx-5">
          <Separator className="mb-10"></Separator>
        </div>
        <CardContent>
          <InfiniteAnimeScroll
            query={query.new}
            initial={anime}
          ></InfiniteAnimeScroll>
        </CardContent>
      </Card>
    </div>
  );
}
