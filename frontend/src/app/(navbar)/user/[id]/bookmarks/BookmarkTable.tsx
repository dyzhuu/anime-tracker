'use client';

import BookmarkButton from '@/components/BookmarkButton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Icons } from '@/lib/icons';
import Image from 'next/image';
import Link from 'next/link';
import DeleteBookmarkButton from './DeleteBookmarkButton';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

const STATUS = {
  0: '-',
  1: 'Watching',
  2: 'Completed',
  3: 'Plan to Watch',
  4: 'Dropped'
};

export function BookmarkTable({
  isUser,
  bookmarks,
  className
}: {
  isUser: boolean;
  bookmarks: Bookmark[];
  className?: string;
}) {
  const queryClient = useQueryClient();
  const session = useSession();
  const searchParams = useSearchParams();
  const sortTag = searchParams?.get('sort');

  bookmarks.sort((a: Bookmark, b: Bookmark) => {
    switch (sortTag) {
      case 'title':
        return a.title.localeCompare(b.title); // sort alphabetically
      case 'rating':
        return b.rating - a.rating; // sort by rating
    }

    if (a.status === 0 && b.status !== 0) {
      return 1;
    } else if (a.status !== 0 && b.status === 0) {
      return -1;
    } else {
      return a.status - b.status; // sort by status for other cases
    }
  });

  return (
    <div className={className}>
      <div className="py-2 bg-muted rounded-t-lg">
        <div className="h-5 items-center text-sm grid grid-cols-12 place-content-start font-semibold text-center">
          <span className="pl-2 border-r-[1px]">#</span>
          <span className="border-r-[1px] -md:hidden">Image</span>
          <Link
            href="?sort=title"
            replace={true}
            className={`border-r-[1px] col-span-7 -md:hidden ${
              sortTag === 'title' && 'text-secondary'
            }`}
          >
            Title
          </Link>
          <Link
            href={`?sort=${
              sortTag === 'title'
                ? 'status'
                : sortTag === 'status'
                ? 'rating'
                : 'title'
            }`}
            replace={true}
            className="border-r-[1px] col-span-11 md:hidden"
          >
            Sorted By:{' '}
            <span className="text-secondary">
              {sortTag === 'title'
                ? 'Title'
                : sortTag === 'rating'
                ? 'Rating'
                : 'Status'}
            </span>
          </Link>
          <Link
            href="?sort=rating"
            replace={true}
            className={`border-r-[1px] -md:hidden ${
              sortTag === 'rating' && 'text-secondary'
            }`}
          >
            Rating
          </Link>
          <Link
            href="?sort=status"
            replace={true}
            className={`col-span-2 -md:hidden ${
              sortTag === 'status' && 'text-secondary'
            }`}
          >
            Status
          </Link>
        </div>
      </div>
      <div>
        {bookmarks.map((bookmark: Bookmark, index: number) => (
          <div
            className="w-full grid grid-cols-12 border border-t-0 group last:rounded-b-lg"
            key={bookmark.animeId}
            onMouseEnter={async () => {
              queryClient.prefetchQuery({
                queryKey: [
                  'bookmark',
                  bookmark.animeId,
                  session.data?.user?.userId
                ],
                queryFn: async () => {
                  const token = (
                    await fetch('/api/token').then((res) => res.json())
                  ).token;
                  const res = await fetch(
                    `https://dzmsabackend.azurewebsites.net/api/user/${session.data?.user?.userId}/bookmarks/${bookmark.animeId}`,
                    // `http://localhost:5148/api/user/${user.userId}/bookmarks/${anime.id}`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`
                      }
                    }
                  );
                  if (res.ok) return await res.json();
                }
              });
            }}
          >
            <div
              className={`w-full flex justify-center items-center border-l-8 group-last:rounded-b-md -md:row-span-2 ${
                bookmark.status === 1
                  ? 'border-green-600'
                  : bookmark.status === 2
                  ? 'border-blue-900'
                  : bookmark.status === 4
                  ? 'border-red-700'
                  : 'border-muted-foreground'
              }`}
            >
              {index + 1}
            </div>
            <Link
              href={`/anime/${bookmark.animeId}`}
              className="-sm:col-span-2 -md:row-span-2"
            >
              <div className="p-1 flex items-center">
                <AspectRatio ratio={3 / 4} className="bg-muted">
                  <Image
                    priority
                    alt=""
                    src={bookmark?.imageURL ?? ''}
                    fill={true}
                    sizes="70px"
                    className="object-cover"
                  ></Image>
                </AspectRatio>
              </div>
            </Link>
            <div className="w-full col-span-6 -sm:col-span-7 -md:col-span-8 flex items-center pl-2 text-sm font-medium text-left pr-4">
              <Link
                href={`/anime/${bookmark.animeId}`}
                className="hover:underline underline-offset-2 hover:font-semibold -md:whitespace-nowrap -md:text-ellipsis -md:overflow-hidden"
              >
                {bookmark.title}
              </Link>
            </div>
            <div className="w-full flex items-center justify-center -md:justify-end pr-1 -md:col-span-2">
              {isUser && (
                <div className="flex gap-2">
                  <BookmarkButton
                    hasTooltip={false}
                    anime={{
                      id: bookmark.animeId,
                      title: {
                        english: bookmark.title,
                        romaji: bookmark.title
                      },
                      description: bookmark.description,
                      coverImage: {
                        medium: bookmark.imageURL
                      }
                    }}
                    className="fill-foreground -sm:px-1 w-0 h-7 bg-transparent"
                  >
                    <Icons.edit className="absolute"></Icons.edit>
                  </BookmarkButton>
                  <DeleteBookmarkButton
                    bookmark={bookmark}
                    className="w-0 h-7 bg-transparent hover:bg-zinc-300/[0.4] active:bg-zinc-500/[0.3] active:scale-95"
                  ></DeleteBookmarkButton>
                </div>
              )}
            </div>
            <div className="w-full flex justify-center -md:justify-start -md:pl-2 -md:col-span-5 items-center">
              <span className="font-medium text-sm md:hidden">
                Rating:&nbsp;
              </span>
              {bookmark.rating === 0 ? '-' : bookmark.rating}
            </div>
            <div className="w-full flex justify-center items-center text-center text-sm px-1 -md:justify-end col-span-2 -md:col-span-5 -sm:col-span-4 -md:pr-2">
              {STATUS[bookmark.status as keyof typeof STATUS]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
