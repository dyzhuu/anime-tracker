import { AnimeBar } from '@/components/AnimeBar';
import { SearchBar } from '@/components/SearchBar';
import { Separator } from '@/components/ui/separator';
import { getAnime, query } from '@/lib/gql';
import Link from 'next/link';

export default async function Home() {
  const trendingAnime = await getAnime(query.trending);
  const topAnime = await getAnime(query.top);
  const newAnime = await getAnime(query.new)
  
  // prefetch queries
  return (
    <>
      <div className="w-full h-[150px] md:h-[300px] py-12 flex flex-col items-center justify-center px-10 gap-3">
        <SearchBar
          className="pl-14 pr-[21px] w-[80dvw] h-14 text-xl"
          icon="h-[28px] translate-x-4"
          imageSize="h-[20dvh]"
        ></SearchBar>
      </div>
      <div className="space-y-2 md:space-y-10">
        <div className="mx-5">
          <div className="mx-5 md:mx-16">
            <Link href="/trending">
              <h1 className="text-3xl font-medium hover:underline underline-offset-8">
                Trending {'>>'}
              </h1>
            </Link>
            <p className="text-muted-foreground mt-2">
              Top trending anime right now
            </p>
          </div>
          <div className="mx-6">
            <Separator className="my-2"></Separator>
          </div>
          <AnimeBar
            animeList={trendingAnime}
            size="w-[41dvw] max-w-[200px]"
          ></AnimeBar>
        </div>

        <div className="mx-5">
          <div className="mx-5 md:mx-16">
            <Link href="/top">
              <h1 className="text-3xl font-medium hover:underline underline-offset-8">
                Top Anime {'>>'}
              </h1>
            </Link>
            <p className="text-muted-foreground mt-2">
              Greatest shows of all time
            </p>
          </div>
          <div className="mx-6">
            <Separator className="my-2"></Separator>
          </div>
          <AnimeBar
            animeList={topAnime}
            size="w-[41dvw] max-w-[200px]"
          ></AnimeBar>
        </div>

        <div className="mx-5">
          <div className="mx-5 md:mx-16">
            <Link href="/new">
              <h1 className="text-3xl font-medium hover:underline underline-offset-8">
                New Releases {'>>'}
              </h1>
            </Link>
            <p className="text-muted-foreground mt-2">
              Discover newly released shows
            </p>
          </div>
          <div className="mx-6">
            <Separator className="my-2"></Separator>
          </div>
          <AnimeBar
            animeList={newAnime}
            size="w-[41dvw] max-w-[200px]"
          ></AnimeBar>
        </div>
      </div>
    </>
  );
}
