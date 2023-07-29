'use client';
import { Button } from '@/components/ui/button';
import { Icons } from '@/lib/icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useToast } from '@/components/ui/use-toast';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export default function DeleteBookmarkButton({
  className,
  bookmark
}: {
  className?: string;
  bookmark: any
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (animeId) => {
      const token = (await fetch('/api/token').then((res) => res.json())).token;
      return fetch(
        `https://dzmsabackend.azurewebsites.net/api/user/profile/bookmarks/${animeId}`,
        // `http://localhost:5148/api/user/profile/bookmarks/${bookmark.animeId}`,
        {
          method: 'Delete',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      toast({
        title: 'Bookmark successfully deleted'
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Unable to delete bookmark, please try again'
      });
    }
  });

  async function onSubmit() {
    mutation.mutate(bookmark.animeId)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className}>
          <Icons.delete className="w-5 h-5 absolute"></Icons.delete>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full">
        <DialogHeader>
          <DialogTitle>Delete bookmark?</DialogTitle>
          <DialogDescription>
            Confirm you want to delete this bookmark
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogPrimitive.Close asChild className="w-full">
            <Button
              type="submit"
              onClick={onSubmit}
              className="w-full"
              variant="destructive"
            >
              Confirm
            </Button>
          </DialogPrimitive.Close>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
