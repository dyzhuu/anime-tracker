import { AnimeBar } from '@/components/AnimeBar';
import { SearchBar } from '@/components/SearchBar';
import { Separator } from '@/components/ui/separator';

const trendingQuery = `
  query {
    Page(perPage: 20
      ) {
      pageInfo {
        hasNextPage
      }
      media(sort: TRENDING_DESC, isAdult: false, type: ANIME) {
        idMal
        title {
          romaji
          english
        }
        coverImage {
          extraLarge
        }
        description
      }
    }
  }
`;
const topQuery = `
  query {
    Page(perPage: 20
      ) {
      pageInfo {
        hasNextPage
      }
      media(sort: POPULARITY_DESC, isAdult: false, type: ANIME) {
        idMal
        title {
          romaji
          english
        }
        coverImage {
          extraLarge
        }
        description
      }
    }
  }
`;
const newQuery = `
  query {
    Page(perPage: 20
      ) {
      pageInfo {
        hasNextPage
      }
        media(sort: [START_DATE_DESC, TRENDING_DESC], isAdult: false, type: ANIME status: RELEASING) {
        idMal
        title {
          romaji
          english
        }
        coverImage {
          extraLarge
        }
        description
      }
    }
  }
`;

async function getAnime(query: string) {
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
  const trendingAnime = await getAnime(trendingQuery);
  const topAnime = await getAnime(topQuery);
  const newAnime = await getAnime(newQuery);
  return (
    <>
      <div className="w-[100dvw] h-[300px] p-12 flex items-center justify-center px-10">
        <SearchBar
          className="pl-14 pr-[21px] w-[80dvw] h-14 text-xl"
          icon="h-[28px] translate-x-4"
          imageSize="h-[20dvh]"
        ></SearchBar>
      </div>
      <div className="space-y-10">
        <div className="mx-5">
          <div className="mx-20">
            <h1 className="text-3xl font-medium text-primary">Trending </h1>
            <p className="text-primary opacity-50 mt-2">
              Top trending anime right now
            </p>
          </div>
          <div className="mx-6">
            <Separator className="my-2"></Separator>
          </div>
          <AnimeBar animeList={trendingAnime}></AnimeBar>
        </div>

        <div className="mx-5">
          <div className="mx-20">
            <h1 className="text-3xl font-medium text-primary">Top anime</h1>
            <p className="text-primary opacity-50 mt-2">
              Top anime of all time
            </p>
          </div>
          <div className="mx-6">
            <Separator className="my-2"></Separator>
          </div>
          <AnimeBar animeList={topAnime}></AnimeBar>
        </div>
        
        <div className="mx-5">
          <div className="mx-20">
            <h1 className="text-3xl font-medium text-primary">New Releases</h1>
            <p className="text-primary opacity-50 mt-2">
              Newly released anime
            </p>
          </div>
          <div className="mx-6">
            <Separator className="my-2"></Separator>
          </div>
          <AnimeBar animeList={newAnime}></AnimeBar>
        </div>
      </div>
    </>
  );
}
