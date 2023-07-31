'use client';

import Link from 'next/link';

import { SearchBar } from '@/components/SearchBar';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import { Icons } from '@/lib/icons';
import { useSession } from 'next-auth/react';
import { Drawer } from '@/app/(navbar)/Drawer';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { RedirectType } from 'next/dist/client/components/redirect';
import { ProfileDropdown } from './ProfileDropdown';
import { Suspense } from 'react';
import { ProfileButton } from './ProfileButton';

export function NavBar() {
  const pathname = usePathname();
  const session = useSession();
  const { toast } = useToast();
  const userId = session.data?.user?.userId;

  return (
    <nav className="border-b sticky top-0 z-50 bg-background">
      <div className="flex h-16 items-center px-4">
        <Drawer className="flex md:hidden"></Drawer>
        <div className="flex -md:hidden space-x-2">
          <Link
            href="/"
            className={`inline-flex h-10 w-max items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors
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
            className={`inline-flex h-10 w-max items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors
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
            className={`inline-flex h-10 w-max items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors
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
            className={`inline-flex h-10 w-max items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors
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
            {session.status === 'loading' ? (
              <>
                <Button
                  variant="ghost"
                  className="fill-foreground hover:fill-primary hover:bg-transparent"
                >
                  <Icons.bookmarkSolid className="h-7"></Icons.bookmarkSolid>
                </Button>
                <Button
                  variant="ghost"
                  className="fill-foreground hover:fill-primary hover:bg-transparent"
                >
                  <Icons.profile className="h-8"></Icons.profile>
                </Button>
              </>
            ) : session.status === 'unauthenticated' ? (
              <>
                <Button
                  variant="ghost"
                  className="fill-foreground hover:fill-primary hover:bg-transparent"
                  onClick={() => {
                    toast({
                      variant: 'destructive',
                      title: 'Log in to view content'
                    });
                  }}
                  asChild
                >
                  <Link href="/login?redirectTo=/user/undefined/bookmarks">
                    <Icons.bookmarkSolid className="h-7"></Icons.bookmarkSolid>
                  </Link>
                </Button>
                <Suspense
                  fallback={
                    <Button
                      variant="ghost"
                      className="fill-foreground hover:fill-primary hover:bg-transparent"
                    >
                      <Icons.profile className="h-8"></Icons.profile>
                    </Button>
                  }
                >
                  <ProfileButton className="fill-foreground hover:fill-primary hover:bg-transparent"></ProfileButton>
                </Suspense>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className={`fill-foreground hover:fill-primary hover:bg-transparent ${
                    pathname === `/user/${userId}/bookmarks` &&
                    'fill-primary'
                  }`}
                  asChild
                >
                  <Link href={`/user/${userId}/bookmarks`}>
                    <Icons.bookmarkSolid className="h-7"></Icons.bookmarkSolid>
                  </Link>
                </Button>
                <ProfileDropdown>
                  <Button
                    variant="ghost"
                    className="fill-foreground hover:fill-primary hover:bg-transparent"
                  >
                    <Icons.profile className="h-8"></Icons.profile>
                  </Button>
                </ProfileDropdown>
              </>
            )}
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
