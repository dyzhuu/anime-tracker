'use client';

import * as React from 'react';
import Link from 'next/link';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { SearchBar } from '@/components/SearchBar';
import { usePathname } from 'next/navigation';
import { Icons } from '@/lib/icons';
import { useSession } from 'next-auth/react';
import { Drawer } from '@/components/Drawer';
import { Button } from './ui/button';

export function NavBar({ user }: any) {
  const pathname = usePathname();
  const session = useSession();
  const userId = session.data?.user?.userId;

  return (
    <nav className="border-b sticky top-0 z-20 bg-background">
      <div className="flex h-16 items-center px-4">
        <Drawer className="flex md:hidden"></Drawer>
        <div className="flex -md:hidden space-x-2">
          <Link
            href="/"
            className={`inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-3 py-2 text-sm font-medium transition-colors
              ${
                pathname === '/'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              }`}
          >
            Home
          </Link>
          <Link
            href="/trending"
            className={`inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-3 py-2 text-sm font-medium transition-colors
              ${
                pathname === '/trending'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              }`}
          >
            Trending
          </Link>
          <Link
            href="/top"
            className={`inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-3 py-2 text-sm font-medium transition-colors
              ${
                pathname === '/top'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              }`}
          >
            Top
          </Link>
          <Link
            href="/new"
            className={`inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-3 py-2 text-sm font-medium transition-colors
              ${
                pathname === '/new'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              }`}
          >
            New Releases
          </Link>
        </div>

        <div className="flex flex-row-reverse w-full ml-2 gap-x-2">
          <div className="flex items-center">
            <Link href={{ pathname: `/user/${userId}/bookmarks` }}>
              <Button className="bg-background hover:bg-muted">
                <Icons.bookmarkSolid className="h-7"></Icons.bookmarkSolid>
              </Button>
            </Link>
            <Link href={{ pathname: `/user/${userId}` }}>
              <Button className="bg-background hover:bg-muted">
                <Icons.profile className="h-8"></Icons.profile>
              </Button>
            </Link>
          </div>
          <div
            className={`-lg:w-full items-center ${
              pathname === '/' && 'hidden'
            }`}
          >
            <SearchBar
              className="pl-10 lg:w-[420px]"
              icon="h-[20px] translate-x-3"
              imageSize="h-[10dvh]"
            ></SearchBar>
          </div>
        </div>
      </div>
    </nav>
  );
}
