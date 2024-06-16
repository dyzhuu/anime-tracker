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
  FormLabel
} from '@/components/ui/form';
import { Icons } from '@/lib/icons';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { User } from 'next-auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Skeleton } from './ui/skeleton';

function BookmarkTriggerButton({
  session,
  hasTooltip = true,
  children,
  className
}: {
  session: any;
  hasTooltip?: boolean;
  children?: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const url = pathname + '?' + searchParams?.toString();

  if (session.status === 'loading') {
    <Button
      variant="icon"
      aria-label="Bookmark Button"
      className={`fill-white group/button hover:bg-zinc-300/[0.4] active:bg-zinc-500/[0.3] active:scale-95 ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {children ?? (
        <Icons.bookmarkHollow className="group-hover/button:scale-110"></Icons.bookmarkHollow>
      )}
    </Button>;
  }

  if (session.status !== 'authenticated') {
    return (
      <Button
        variant="icon"
        className={`group/button hover:bg-zinc-300/[0.4] active:bg-zinc-500/[0.3] active:scale-95 ${className}`}
        onClick={(e) => {
          e.stopPropagation();
          toast({
            variant: 'destructive',
            title: 'Log in to use bookmarks'
          });
          router.push(`/login?redirectTo=${url}`);
        }}
      >
        {children ?? (
          <Icons.bookmarkHollow className="group-hover/button:scale-110 fill-white"></Icons.bookmarkHollow>
        )}
      </Button>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant="icon"
              className={`fill-primary-foreground group/button hover:bg-zinc-300/[0.4] active:bg-zinc-500/[0.3] active:scale-95 ${className}`}
              onClick={(e) => e.stopPropagation()}
            >
              {children ?? (
                <Icons.bookmarkHollow className="group-hover/button:scale-110"></Icons.bookmarkHollow>
              )}
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent className={`w-30 p-1 ${!hasTooltip && 'hidden'}`}>
          <p className="text-xs">Add to Bookmarks</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function SelectMenu({ anime, user }: { anime: Anime; user: User }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['bookmark', anime.id, user.userId],
    queryFn: async () => {
      const token = (await fetch('/api/token').then((res) => res.json())).token;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/user/${user.userId}/bookmarks/${anime.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (res.ok) return await res.json();
      return null;
    }
  });

  const form = useForm();

  const mutation = useMutation({
    mutationFn: async (bookmarkData: Bookmark) => {
      const method = data ? 'PUT' : 'POST';
      const token = (await fetch('/api/token').then((res) => res.json())).token;
      return fetch(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/user/profile/bookmarks/${anime.id}`,
        {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bookmarkData)
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookmark', anime.id, user.userId]
      });
      if (data) {
        toast({
          title: 'Bookmark Updated'
        });
      } else {
        toast({
          title: 'Bookmark Added'
        });
      }
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Changes were not saved successfully'
      });
    }
  });

  async function onSubmit(submitData: { rating?: number; status?: number }) {
    const bookmarkData = {
      userId: user.userId!,
      animeId: anime.id,
      title: anime.title.english ?? anime.title.romaji,
      description: anime.description!,
      imageURL: anime?.coverImage.medium,
      rating: submitData.rating ?? data?.rating,
      status: submitData.status ?? data?.status
    };
    mutation.mutate(bookmarkData);
  }

  if (isLoading)
    return (
      <div className="space-y-6 z-50">
        <div>
          <Skeleton className="h-3 w-16 mb-1" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div>
          <Skeleton className="h-3 w-16 mb-1" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 z-50">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={data?.status?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">Select Status</SelectItem>
                  <SelectItem value="1">Watching</SelectItem>
                  <SelectItem value="2">Completed</SelectItem>
                  <SelectItem value="3">Plan to watch</SelectItem>
                  <SelectItem value="4">Dropped</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={data?.rating?.toString()}
              >
                <FormControl></FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent className="*:hover:bg-accent">
                  <SelectItem value="0">Select Rating</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="9">9</SelectItem>
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="7">7</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <DialogPrimitive.Close asChild>
            <Button
              type="submit"
              className="flex grow"
              onClick={(e) => e.stopPropagation()}
            >
              Save Changes
            </Button>
          </DialogPrimitive.Close>
        </div>
      </form>
    </Form>
  );
}

export default function BookmarkButton({
  anime,
  children,
  hasTooltip,
  className
}: {
  anime: Anime;
  children?: React.ReactNode;
  hasTooltip?: boolean;
  className?: string;
}) {
  const session = useSession();

  return (
    <>
      <Dialog>
        <BookmarkTriggerButton
          hasTooltip={hasTooltip}
          session={session}
          className={className}
        >
          {children}
        </BookmarkTriggerButton>
        {session.status === 'authenticated' && (
          <DialogContent className="z-50 sm:max-w-[425px] fixed left-[50%] top-[50%] pointer-events-auto grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full">
            <DialogHeader>
              <DialogTitle>Add / Edit bookmark information</DialogTitle>
            </DialogHeader>

            <SelectMenu anime={anime} user={session.data.user!}></SelectMenu>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
