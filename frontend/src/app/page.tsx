import AnimeCard from '@/components/AnimeCard';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';


export const dynamic = 'force-dynamic'

const query = `
  query {
    Page(perPage: 40) {
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
          large
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
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
        }),
        next: {revalidate: 3600}
    });

    const anime = await res.json();
    return anime.data.Page.media;
}

export default async function Home() {
    const trendingAnime = await getTrendingAnime();
    console.log(trendingAnime)
    return (
        <main>
            {/* <ScrollArea className='h-[360px]'> */}
            <ScrollArea>
              <div className='flex p-10'>
                {trendingAnime.map((anime: any, index: number) => (
                    <AnimeCard anime={anime} key={index}></AnimeCard>
                ))}
                <ScrollBar orientation='horizontal' className='hidden'/>
              </div>
            </ScrollArea>
        </main>
    );
}
