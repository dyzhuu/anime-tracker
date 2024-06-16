import Image from 'next/image';
import Link from 'next/link';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import BookmarkButton from '@/components/BookmarkButton';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function BookmarkButtonFallback() {
  return <Skeleton className="h-10 w-full rounded-md"></Skeleton>;
}

export default function AnimeCard({
  anime,
  size
}: {
  anime: Anime;
  size: string;
  onClick?: () => void;
  selected?: boolean;
}) {
  return (
    <div
      className="overflow-hidden cursor-pointer rounded-lg"
      aria-label="Anime Card"
    >
      <div
        className={`group space-y-1 p-2 ${size} h-full hover:scale-105 overflow-hidden transition-all`}
      >
        <Link
          href={`/anime/${anime.id}`}
          prefetch={false}
          passHref
          legacyBehavior
        >
          <AspectRatio ratio={3 / 4} className="rounded-md">
            <Skeleton className="w-full h-full bg-muted absolute group-hover:scale-[1.5]"></Skeleton>
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
              <Suspense
                fallback={<BookmarkButtonFallback></BookmarkButtonFallback>}
              >
                <BookmarkButton
                  anime={anime}
                  className="-sm:hidden"
                ></BookmarkButton>
              </Suspense>
            </div>
          </AspectRatio>
        </Link>
        <div>
          <p className="text-sm font-medium vertical-text-ellipsis h-16 m-1 group-hover:opacity-0 pointer-events-none">
            {anime?.title?.english ?? anime?.title?.romaji}
          </p>
        </div>
      </div>
    </div>
  );
}
