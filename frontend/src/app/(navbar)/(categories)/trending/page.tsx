import { InfiniteAnimeScroll } from "@/app/(navbar)/anime/[id]/InfiniteAnimeScroll";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAnime, query } from "@/lib/gql";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'MSAnime / Trending'
};


export default async function TrendingPage() {
  const anime = await getAnime(query.trending)
  return (
    <div className="flex justify-center md:p-10">
      <Card className="w-full py-5 -md:border-hidden -md:shadow-none">
        <CardHeader className="text-3xl font-medium px-10">
          Trending Anime
        </CardHeader>
        <div className="mx-5">
          <Separator className="mb-10"></Separator>
        </div>
        <CardContent>
          <InfiniteAnimeScroll
            query={query.trending}
            initial={anime}
          ></InfiniteAnimeScroll>
        </CardContent>
      </Card>
    </div>
  );
}
