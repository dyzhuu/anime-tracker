import AnimeCard from '@/components/AnimeCard';
import { SearchBar } from '@/components/SearchBar';
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Icons } from '@/lib/icons';

const query = `
  query {
    Page(perPage: 12) {
      pageInfo {
        hasNextPage
      }
      media(sort: POPULARITY_DESC, isAdult: false, type: ANIME, status_in: RELEASING) {
        idMal
        title {
          romaji
          english
        }
        coverImage {
          extraLarge
          large
          medium
        }
        description
      }
    }
  }
`;

async function getTrendingAnime() {
  const res = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query
    }),
    next: { revalidate: 3600 }
  });

  const anime = await res.json();
  return anime.data.Page.media;
}

export default async function Home() {
  const trendingAnime = await getTrendingAnime();
  return (
    <>
      <div className="w-[100dvw] h-[300px] p-12 flex items-center justify-center px-10">
        <SearchBar
          className="pl-14 pr-[21px] w-[80dvw] h-14 text-xl"
          icon="h-[28px] translate-x-4"
          imageSize="h-[20dvh]"
        ></SearchBar>
      </div>
      <div className="mx-3 bg-muted">
        <ScrollArea>
          {/* <div className="p-2 grid max-w-8xl lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2"> */}
          <div className="p-2 flex">
            {trendingAnime.map((anime: any, index: number) => (
              <AnimeCard anime={anime} key={index}></AnimeCard>
            ))}
            <ScrollBar orientation="horizontal" className="hidden" />
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
