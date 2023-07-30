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
import Link from 'next/link';

function TriggerButton({
  session,
  hasTooltip = true,
  children,
  className,
  onMouseEnter
}: {
  session: any;
  hasTooltip?: boolean;
  children?: React.ReactNode;
  className?: string;
  onMouseEnter?: React.MouseEventHandler;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const url = pathname + '?' + searchParams.toString();
  return (
    <>
      {session.status === 'loading' ? (
        <Button
          variant="icon"
          className={`fill-white group/button hover:bg-zinc-300/[0.4] active:bg-zinc-500/[0.3] active:scale-95 z-50 ${className}`}
        >
            {children ?? (
              <Icons.bookmarkHollow className="group-hover/button:scale-110"></Icons.bookmarkHollow>
            )}
        </Button>
      ) : session.status === 'authenticated' ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button
                  variant="icon"
                  className={`fill-white group/button hover:bg-zinc-300/[0.4] active:bg-zinc-500/[0.3] active:scale-95 z-50 ${className}`}
                          onClick={(e) => {
                    e.stopPropagation();
                    if (session.status !== 'authenticated') {
                      console.log(session);
                      toast({
                        variant: 'destructive',
                        title: 'Log in to use bookmarks'
                      });
                      router.push(`/login?redirectTo=${url}`);
                    }
                  }}
                  onMouseEnter={onMouseEnter}
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
      ) : (
        <Button
          variant="icon"
          className={`group/button hover:bg-zinc-300/[0.4] active:bg-zinc-500/[0.3] active:scale-95 z-50 ${className}`}
          onClick={(e) => {
            e.stopPropagation();
            toast({
              variant: 'destructive',
              title: 'Log in to use bookmarks'
            });
          }}
          asChild
        >
          <Link href={`/login?redirectTo=${url}`}>
            {children ?? (
              <Icons.bookmarkHollow className="group-hover/button:scale-110 fill-white"></Icons.bookmarkHollow>
            )}
          </Link>
        </Button>
      )}
    </>
  );
}

function SelectMenu({ anime, user }: { anime: any; user: User }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['bookmark', anime.id, user.userId],
    queryFn: async () => {
      const token = (await fetch('/api/token').then((res) => res.json())).token;
      const res = await fetch(
        `https://dzmsabackend.azurewebsites.net/api/user/${user.userId}/bookmarks/${anime.id}`,
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

  const form = useForm({
    defaultValues: {
      status: data?.status?.toString(),
      rating: data?.rating?.toString()
    }
  });

  console.log(data?.status?.toString());

  const mutation = useMutation({
    mutationFn: async (bookmarkData) => {
      const method = data ? 'PUT' : 'POST';
      const token = (await fetch('/api/token').then((res) => res.json())).token;
      return fetch(
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
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
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

  async function onSubmit(submitData: any) {
    console.log(submitData);
    const bookmarkData = {
      userId: user.userId,
      animeId: anime.id,
      title: anime.title.english ?? anime.title.romaji,
      description: anime.description,
      imageUrl: anime?.coverImage.medium,
      ...submitData
    };
    mutation.mutate(bookmarkData);
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
              <Select
                onValueChange={field.onChange}
                defaultValue={
                  data?.status === 0 ? field.value : data?.status?.toString()
                }
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
                defaultValue={
                  data?.rating === 0 ? field.value : data?.rating?.toString()
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
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
  anime: any;
  children?: React.ReactNode;
  hasTooltip?: boolean;
  className?: string;
}) {
  const session = useSession();
  const queryClient = useQueryClient();
  return (
    <Dialog>
      {/* <Link href='/login'>
        <TriggerButton session={session} className={'pointer-events-none' + className}></TriggerButton>
      </Link> */}
      <TriggerButton
        hasTooltip={hasTooltip}
        session={session}
        className={className}
        onMouseEnter={async () => {
          queryClient.prefetchQuery({
            queryKey: [
              'bookmark',
              anime.id,
              session.data?.user?.userId
            ],
            queryFn: async () => {
              const token = (
                await fetch('/api/token').then((res) => res.json())
              ).token;
              const res = await fetch(
                `https://dzmsabackend.azurewebsites.net/api/user/${session.data?.user?.userId}/bookmarks/${anime.id}`,
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
        {children}
      </TriggerButton>
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
