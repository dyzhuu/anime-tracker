import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getAnimeFromId } from '@/lib/gql';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { AnimeBar } from '@/components/AnimeBar';
import BookmarkButton from '@/components/BookmarkButton';
import { Skeleton } from '@/components/ui/skeleton';

// export async function generateMetadata({ params }: { params: { id: number } }) {
//   const anime = await getAnimeFromId([params.id]);
//   if (anime) {
//     return {
//       title: anime?.title?.english ?? anime?.title?.romaji
//     };
//   }
// }

async function getRecommendedAnime(id: number) {
  const recommendationQuery = `query {
  Page {
    recommendations(mediaId: ${id}) {
      mediaRecommendation {
        id
        title {
          romaji
          english
        }
        startDate {
          year
          month
          day
        }
        coverImage {
          extraLarge
          medium
        }
        description
      }
    }
  }
}`;
  const res = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: recommendationQuery
    })
  });
  if (res.ok) {
    const data = await res
      .json()
      .then(
        (res) =>
          res?.data?.Page?.recommendations.map(
            (rec: { mediaRecommendation: Anime }) => rec.mediaRecommendation
          )
      );
    if (data.length !== 0) {
      return data;
    }
  }
}

export default async function AnimePage({
  params
}: {
  params: { id: number };
}) {
  let anime = await getAnimeFromId([params.id]);
  if (!anime) {
    throw new Error('Too Many Requests');
  }
  const recommendations = await getRecommendedAnime(params.id);
  return (
    <div className="flex justify-center -md:bg-card p-3 md:p-10">
      <Card className="w-full pt-5 max-w-6xl -md:border-none">
        <CardHeader className="-md:text-center pb-2">
          <h1 className="text-2xl font-medium">
            {anime?.title?.english ?? anime?.title?.romaji}
          </h1>
          <p className="text-md font-light italic tracking-tighter">
            {anime?.title?.native}
          </p>
        </CardHeader>
        <div className="mx-5">
          <Separator className="mb-5"></Separator>
        </div>
        <CardContent className="">
          <div className="flex -md:flex-col -md:items-center gap-10">
            <div className="w-[250px] shrink-0">
              <AspectRatio ratio={3 / 4} className="relative">
                <Skeleton className="absolute w-full h-full"></Skeleton>
                <Image
                  src={anime?.coverImage?.extraLarge ?? ''}
                  alt={anime?.title?.english ?? anime?.title?.romaji}
                  fill={true}
                  sizes="(max-width: 600px) 150px, 250px"
                  className="object-cover rounded-md"
                  priority={true}
                ></Image>
              </AspectRatio>
              <BookmarkButton
                anime={anime}
                className=" mt-5 w-full bg-primary hover:bg-primary/90 active:bg-primary/90"
              ></BookmarkButton>
            </div>
            <Separator className="md:hidden"></Separator>
            <div className="md:h-[393px] overflow-y-auto mask-image py-1 md:pr-3">
              <h1 className="text-lg font-medium">Description</h1>
              <p className="mt-2 font-light">
                {anime?.description
                  ? anime.description.replace(/<[^>]+>/g, '')
                  : 'N/A'}
              </p>
            </div>
          </div>
          {recommendations && (
            <>
              <Separator className="my-5"></Separator>
              <div className="space-y-5">
                <h1 className="text-lg font-medium">
                  Recommendations based on this anime:
                </h1>
                <AnimeBar
                  animeList={recommendations}
                  size="w-[180px]"
                ></AnimeBar>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
