import AnimeCard from '@/components/AnimeCard';
import { SearchBar } from '@/components/SearchBar';
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1.4em"
          viewBox="0 0 512 512"
          className="translate-x-10"
        >
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>
        <SearchBar className="pl-14 mr-[21px] w-[80dvw] h-14 text-xl"></SearchBar>
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
