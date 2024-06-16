'use client';

import Link from 'next/link';

import { SearchBar } from '@/components/SearchBar';
import { usePathname, useRouter } from 'next/navigation';
import { Icons } from '@/lib/icons';
import { useSession } from 'next-auth/react';
import { Drawer } from '@/app/(navbar)/Drawer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ProfileDropdown } from './ProfileDropdown';
import { Suspense } from 'react';
import { ProfileButton } from './ProfileButton';

export function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  const { toast } = useToast();
  const userId = session.data?.user?.userId;

  return (
    <nav className="border-b sticky top-0 z-50 bg-card">
      <div className="flex h-16 items-center px-4">
        <Drawer className="flex md:hidden"></Drawer>
        <div className="flex -md:hidden space-x-2">
          <Link
            href="/"
            className={`inline-flex h-10 w-max items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors
              ${
                pathname === '/'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent2'
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
                  : 'hover:bg-accent2'
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
                  : 'hover:bg-accent2'
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
                  : 'hover:bg-accent2'
              }`}
          >
            New Releases
          </Link>
        </div>

        <div className="flex flex-row w-full ml-2 gap-x-2">
          <div className="flex grow"></div>
          <div
            className={`-lg:w-full items-center peer ${
              pathname === '/' && 'hidden'
            }`}
          >
            <SearchBar
              className="pl-10 lg:w-[450px]"
              icon="h-[20px] translate-x-3"
              imageSize="h-[10dvh]"
            ></SearchBar>
          </div>
          <div className="flex items-center -lg:peer-focus-within:hidden">
            {session.status === 'loading' ? (
              <>
                <Button
                  variant="ghost"
                  className="fill-foreground hover:fill-primary hover:bg-accent2"
                >
                  <Icons.bookmarkSolid className="h-7"></Icons.bookmarkSolid>
                </Button>
                <Button
                  variant="ghost"
                  className="fill-foreground hover:fill-primary hover:bg-accent2"
                >
                  <Icons.profile className="h-8"></Icons.profile>
                </Button>
              </>
            ) : session.status === 'unauthenticated' ? (
              <>
                <Button
                  variant="ghost"
                  className="fill-foreground hover:fill-primary hover:bg-accent2"
                  onClick={() => {
                    toast({
                      variant: 'destructive',
                      title: 'Log in to view content'
                    });
                    router.push('/login');
                  }}
                >
                  <Icons.bookmarkSolid className="h-7"></Icons.bookmarkSolid>
                </Button>
                <Suspense
                  fallback={
                    <Button
                      variant="ghost"
                      className="fill-foreground hover:fill-primary hover:bg-accent2"
                    >
                      <Icons.profile className="h-8"></Icons.profile>
                    </Button>
                  }
                >
                  <ProfileButton className="fill-foreground hover:fill-primary hover:bg-accent2"></ProfileButton>
                </Suspense>
              </>
            ) : (
              <div className="flex peer-focus:hidden">
                <Button
                  variant="ghost"
                  className={`fill-foreground hover:fill-primary hover:bg-accent2 ${
                    pathname === `/user/${userId}/bookmarks` && 'fill-primary'
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
                    className="fill-foreground hover:fill-primary hover:bg-accent2"
                  >
                    <Icons.profile className="h-8"></Icons.profile>
                  </Button>
                </ProfileDropdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
