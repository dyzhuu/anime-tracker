'use client';

import * as React from 'react';
import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { SearchBar } from '@/components/SearchBar';
import { usePathname } from 'next/navigation';
import { Icons } from '@/lib/icons';
import { useSession } from 'next-auth/react';

export function NavBar({user}: any) {
  const pathname = usePathname();
  const session = useSession();
  const userId = session.data?.user?.userId; 

  return (
    <div className="border-b sticky top-0 z-20 bg-background">
      <div className="flex h-16 items-center px-4">
        <div>
          <NavigationMenu className="md:hidden">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <NavigationMenu className="-md:hidden">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/popular" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Popular
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/seasonal" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Seasonal
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/top" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Top
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/new" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    New Releases
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex w-full justify-center space-x-6 mx-2 md:justify-end">
          <div
            className={`-md:w-full items-center ${
              pathname === '/' ? 'opacity-0 pointer-events-none' : ''
            }`}
          >
            <SearchBar
              className="pl-10 grow md:w-[200px] lg:w-[400px]"
              icon="h-[20px] translate-x-3"
              imageSize="h-[10dvh]"
            ></SearchBar>
          </div>
          <div className="flex space-x-8 items-center justify-center">
            <Link href={{ pathname: `/user/${userId}/bookmarks` }}>
              <Icons.bookmarkSolid className="h-7"></Icons.bookmarkSolid>
            </Link>
            <Link href={{ pathname: `/user/${userId}` }}>
              <Icons.profile className="h-8"></Icons.profile>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
