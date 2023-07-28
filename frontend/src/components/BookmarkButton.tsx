'use client';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { useQuery } from '@tanstack/react-query';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { toast, useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Icons } from '@/lib/icons';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { User } from 'next-auth';

function InnerButton({
  session,
  className
}: {
  session: any;
  className?: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant="icon"
              className={`fill-white group/button hover:bg-zinc-300/[0.4] active:bg-zinc-500/[0.3] active:scale-95 z-50 ${className}`}
              aria-label="Bookmark"
              onClick={(e) => {
                e.stopPropagation();
                if (session.status !== 'authenticated') {
                  toast({
                    variant: 'destructive',
                    title: 'Log in to use bookmarks'
                  });
                  const url = pathname + '?' + searchParams.toString();
                  router.push(`/login?redirectTo=${url}`);
                }
              }}
            >
              <Icons.bookmarkHollow className="group-hover/button:scale-110"></Icons.bookmarkHollow>
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent className="w-30 p-1">
          <p className="text-xs">Add to Bookmarks</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function SelectMenu({ anime, user }: { anime: any; user: User }) {
  const form = useForm();
  const { toast } = useToast();
  const { data } = useQuery({
    queryKey: ['bookmark'],
    queryFn: async () => {
      const res = await fetch(
        `https://dzmsabackend.azurewebsites.net/api/user/${user.userId}/bookmarks/${anime.id}`,
        // `http://localhost:5148/api/user/${user.userId}/bookmarks/${anime.id}`,
        {
          headers: {
            Authorization: `Bearer ${fetch('/api/token').then((res) =>
              res.json()
            )}`
          },
          cache: 'no-store'
        }
      );
      if (res.ok) {
        return await res.json();
      }
    }
  });

  async function onSubmit(submitData: any) {
    const bookmarkData = {
      userId: user.userId,
      animeId: anime.id,
      title: anime.title.english ?? anime.title.romaji,
      description: anime.description,
      imageUrl: anime.coverImage.medium,
      ...submitData
    };
    const method = data ? 'PUT' : 'POST';
    console.log('method', method);
    //TODO: FIX THIS LATER TO USEMUTATION!!!!
    try {
      const token = (await fetch('/api/token').then((res) => res.json())).token;
      const res = await fetch(
        `https://dzmsabackend.azurewebsites.net/api/user/profile/bookmarks/${anime.id}`,
        // `http://localhost:5148/api/user/profile/bookmarks/${anime.id}`,
        {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bookmarkData)
        }
      );
      if (res.ok && data) {
        toast({
          title: 'Bookmark Updated',
        });
      } else if (res.ok) {
        toast({
          title: 'Bookmark Added',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Changes were not saved successfully'
        });
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Error processing your request'
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">Watching</SelectItem>
                  <SelectItem value="1">Completed</SelectItem>
                  <SelectItem value="2">Plan to watch</SelectItem>
                  <SelectItem value="3">Dropped</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="7">7</SelectItem>
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="9">9</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogPrimitive.Close asChild>
          <Button type="submit" className="w-full" onClick={(e) => e.stopPropagation()}>
            Save Changes
          </Button>
        </DialogPrimitive.Close>
      </form>
    </Form>
  );
}

export default function BookmarkButton({
  anime,
  className
}: {
  anime: any;
  className?: string;
}) {
  const session = useSession();
  return (
    <Dialog>
      <InnerButton session={session} className={className}></InnerButton>
      {session.status === 'authenticated' && (
        <DialogContent className="sm:max-w-[425px] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full">
          <DialogHeader>
            <DialogTitle>Add / Edit bookmark information</DialogTitle>
          </DialogHeader>
          <SelectMenu anime={anime} user={session.data.user!}></SelectMenu>
        </DialogContent>
      )}
    </Dialog>
  );
}
