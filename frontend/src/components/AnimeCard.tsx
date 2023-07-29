import Image from 'next/image';
import Link from 'next/link';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import BookmarkButton from '@/components/BookmarkButton';
import { Fallback } from '@radix-ui/react-avatar';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function BookmarkButtonFallback() {
  return <Skeleton className="h-10 w-full rounded-md"></Skeleton>;
}

export default function AnimeCard({ anime, size }: any) {
  return (
    <Link href={`/anime/${anime.id}`} passHref legacyBehavior>
      <div className="overflow-hidden cursor-pointer rounded-lg">
        <div
          className={`group space-y-1 p-2 ${size} h-full hover:scale-105 overflow-hidden transition-all`}
        >
          <AspectRatio ratio={3 / 4} className="bg-muted rounded-md">
            <Image
              priority
              src={anime?.coverImage?.extraLarge ?? ''}
              alt={anime?.title?.english ?? anime?.title?.romaji}
              fill={true}
              sizes="(max-width: 600px) 150px, 250px"
              className="group-hover:brightness-[0.25] group-hover:scale-[1.5] group-hover:translate-y-[48px] object-cover rounded-md "
            ></Image>
            <div className="h-[calc(100%+64px)] w-full scale-105 opacity-0 p-4 py-6 pb-4 group-hover:opacity-100 gap-y-2 flex flex-col">
              <p className="text-white text-sm font-medium vertical-text-ellipsis select-none">
                {anime?.title?.english ?? anime?.title?.romaji}
              </p>
              <p className="text-white text-xs font-light vertical-desc-ellipsis mt-2 select-none">
                {anime.description
                  ? anime.description.replace(/<[^>]+>/g, '')
                  : ''}
              </p>
              <div className="flex grow"></div>
              <Suspense fallback={<BookmarkButtonFallback></BookmarkButtonFallback>}>
                <BookmarkButton
                  anime={anime}
                  className="-sm:hidden"
                ></BookmarkButton>
              </Suspense>
            </div>
          </AspectRatio>
          <div className="">
            <p className="text-sm font-medium vertical-text-ellipsis h-16 m-1">
              {anime?.title?.english ?? anime?.title?.romaji}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
