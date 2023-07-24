import { AnimeBar } from '@/components/AnimeBar';
import { SearchBar } from '@/components/SearchBar';


const query = `
  query {
    Page(perPage: 20
      
      ) {
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
      <AnimeBar trendingAnime={trendingAnime}></AnimeBar>
    </>
  );
}
