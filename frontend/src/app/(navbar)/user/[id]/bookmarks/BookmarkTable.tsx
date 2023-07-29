'use client';

import BookmarkButton from '@/components/BookmarkButton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Icons } from '@/lib/icons';
import Image from 'next/image';
import Link from 'next/link';
import DeleteBookmarkButton from './DeleteBookmarkButton';

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
  bookmarks: any;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="py-2 bg-muted rounded-t-lg">
        <div className="h-5 items-center text-sm grid grid-cols-12 place-content-start font-semibold text-center">
          <span className="pl-2 border-r-[1px]">#</span>
          <span className="border-r-[1px] -md:hidden">Image</span>
          <span className="border-r-[1px] col-span-7 -md:col-span-11">
            Title
          </span>
          <span className="border-r-[1px] -md:hidden">Rating</span>
          <span className="col-span-2 -md:hidden">Status</span>
        </div>
      </div>
      <div>
        {bookmarks.map((bookmark: any, index: number) => (
          <div
            className="w-full grid grid-cols-12 border border-t-0 group last:rounded-b-lg"
            key={bookmark.animeId}
          >
            <div
              className={`w-full flex justify-center items-center border-l-8 group-last:rounded-b-md -md:row-span-2 ${
                bookmark.status === 1
                  ? 'border-green-600'
                  : bookmark.status === 2
                  ? 'border-purple-800'
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
                <AspectRatio ratio={3 / 4}>
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
            <div className="w-full col-span-6 -sm:col-span-7 -md:col-span-8 flex items-center pl-2 text-sm font-medium text-left">
              <Link
                href={`/anime/${bookmark.animeId}`}
                className="hover:underline underline-offset-2 hover:font-semibold"
              >
                {bookmark.title}
              </Link>
            </div>
            <div className="w-full flex items-center justify-center -md:col-span-2">
              {isUser && (
                <div className="flex gap-2">
                  <BookmarkButton
                    hasTooltip={false}
                    anime={{
                      id: bookmark.animeId,
                      title: {
                        english: bookmark.title
                      },
                      description: bookmark.description,
                      coverImage: {
                        medium: bookmark.imageURL
                      }
                    }}
                    className="fill-primary -sm:px-1 w-0 h-7 bg-transparent"
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
