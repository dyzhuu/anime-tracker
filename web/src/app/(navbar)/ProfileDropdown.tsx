'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';

export function ProfileDropdown({ children }: { children: React.ReactNode }) {
  const { theme, systemTheme, setTheme } = useTheme();
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">Account Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button
              className="w-full"
              onClick={() => {
                if (theme === 'system') {
                  if (systemTheme === 'dark') {
                    setTheme('light');
                  } else {
                    setTheme('dark');
                  }
                } else if (theme === 'dark') {
                  setTheme('light');
                } else {
                  setTheme('dark');
                }
              }}
            >
              Toggle theme
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive" asChild>
          <button
            onClick={() => {
              if (pathname === '/profile') {
                signOut({ callbackUrl: '/' });
              } else {
                signOut();
              }
            }}
            className="w-full"
          >
            Log out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
