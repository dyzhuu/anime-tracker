'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { useSession } from 'next-auth/react';
import { notFound, redirect, usePathname, useSearchParams } from 'next/navigation';
import { BookmarkTable } from './BookmarkTable';

// //TODO:
// const token = await fetch('api/token');
// console.log('token', await token.json());

export default function UserBookmarksPage({
  params
}: {
  params: { id: string };
}) {
  const { toast } = useToast();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      toast({
        variant: 'destructive',
        title: 'Log in to access your bookmarks'
      });
      redirect(`/login?redirectTo=/user/undefined/bookmarks`);
    }
  });
  
  //TODO: FIX TO DB FETCH, AND CHANGE OTHER ONE TOO
  const user = session.data?.user

  if (session.status === 'loading') {
    return <p>Loading...</p>;
  }

  if (session.status === 'authenticated' ) {
    if (params.id === 'undefined') {
      redirect(`/user/${session?.data?.user?.userId}/bookmarks`);
    }
    else if (!user) {
      return notFound();
    }
  }

  return (
    <div className="flex justify-center py-10 md:px-10">
      <Card className="w-full py-5 -md:border-hidden -md:shadow-none -md:w-[100dvw] max-w-4xl">
        <CardHeader className="text-3xl font-medium text-primary px-1 text-center">
          {params.id == user?.id ? 'Your' : `${user?.username}'s`} anime list
        </CardHeader>
        <div className="mx-5">
          <Separator className="mb-5"></Separator>
        </div>
        <CardContent className="p-2">
          <BookmarkTable className='px-2'></BookmarkTable>
        </CardContent>
      </Card>
    </div>
  );
}
