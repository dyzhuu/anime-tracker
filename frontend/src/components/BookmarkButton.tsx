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
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams
} from 'next/navigation';
import { User } from 'next-auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { revalidatePath } from 'next/cache';
import { parseArgs } from 'util';

function TriggerButton({
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

function SelectMenu({ anime, user }: { anime: any; user: User }) {
  const form = useForm();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['bookmark', anime.id, user.userId],
    queryFn: async () => {
      const res = await fetch(
        `https://dzmsabackend.azurewebsites.net/api/user/${user.userId}/bookmarks/${anime.id}`,
        // `http://localhost:5148/api/user/${user.userId}/bookmarks/${anime.id}`,
        {
          headers: {
            Authorization: `Bearer ${fetch('/api/token').then((res) =>
              res.json()
            )}`
          }
        }
      );
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    }
  });

  const mutation = useMutation({
    mutationFn: async (bookmarkData) => {
      const method = data ? 'PUT' : 'POST';
            const token = (await fetch('/api/token').then((res) => res.json()))
              .token;
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
      queryClient.invalidateQueries({queryKey: ['bookmarks']})
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
  })

  async function onSubmit(submitData: any) {
    const bookmarkData = {
      userId: user.userId,
      animeId: anime.id,
      title: anime.title.english ?? anime.title.romaji,
      description: anime.description,
      imageUrl: anime?.coverImage.medium,
      ...submitData
    };
    mutation.mutate(bookmarkData)
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
  return (
    <Dialog>
      <TriggerButton
        hasTooltip={hasTooltip}
        children={children}
        session={session}
        className={className}
      ></TriggerButton>
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
