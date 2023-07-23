'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog';
import { Icons } from '@/lib/icons';
import Link from 'next/link';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { usePathname } from 'next/navigation';

export function Drawer({ className }: any) {
  const pathname = usePathname();
  return (
    <div className={className}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="p-2">
            <Icons.menu className="h-8"></Icons.menu>
          </Button>
        </DialogTrigger>
        <DialogContent className="fixed left-0 top-0 z-50 grid h-[100dvh] w-[75dvw] max-w-[360px] bg-background border p-6 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left">
          <DialogHeader className="flex text-left font-medium">
            <span className="text-xl font-semibold mb-3">Contents</span>
            <DialogPrimitive.Close asChild>
              <Link
                href="/"
                className={`h-10 w-full items-center rounded-md px-3 py-2 
              ${
                pathname === '/'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              }`}
              >
                Home
              </Link>
            </DialogPrimitive.Close>
            <DialogPrimitive.Close asChild>
              <Link
                href="/popular"
                className={`h-10 w-full items-center rounded-md px-3 py-2 
              ${
                pathname === '/popular'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              }`}
              >
                Popular
              </Link>
            </DialogPrimitive.Close>
            <DialogPrimitive.Close asChild>
              <Link
                href="/seasonal"
                className={`h-10 w-full items-center rounded-md px-3 py-2 
              ${
                pathname === '/seasonal'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              }`}
              >
                Seasonal
              </Link>
            </DialogPrimitive.Close>
            <DialogPrimitive.Close asChild>
              <Link
                href="/top"
                className={`h-10 w-full items-center rounded-md px-3 py-2 
              ${
                pathname === '/top'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              }`}
              >
                Top
              </Link>
            </DialogPrimitive.Close>
            <DialogPrimitive.Close asChild>
              <Link
                href="/new"
                className={`h-10 w-full items-center rounded-md px-3 py-2
              ${
                pathname === '/new'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              }`}
              >
                New Releases
              </Link>
            </DialogPrimitive.Close>
          </DialogHeader>
          <DialogFooter className="absolute left-9 bottom-5 font-medium">
            <DialogPrimitive.Close asChild>
              <Link href="/profile">Profile</Link>
            </DialogPrimitive.Close>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
