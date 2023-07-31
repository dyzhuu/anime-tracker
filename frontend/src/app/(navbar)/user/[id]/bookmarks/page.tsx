'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useSession } from 'next-auth/react';
import { notFound, redirect } from 'next/navigation';
import { BookmarkTable } from './BookmarkTable';
import { useQuery } from '@tanstack/react-query';
import { Icons } from '@/lib/icons';

export default function UserBookmarksPage({
  params
}: {
  params: { id: string };
}) {
  const session = useSession();


  if (session.status === 'authenticated' && params.id === 'undefined') {
    redirect(`/user/${session?.data?.user?.userId}/bookmarks`);
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: async () => {
      const res = await fetch(
        `https://dzmsabackend.azurewebsites.net/api/user/${params.id}/bookmarks`
        // `http://localhost:5148/api/user/${id}/bookmarks`,
      );
      if (res.ok) {
        return await res.json();
      }
    },
  });

  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await fetch(
        `https://dzmsabackend.azurewebsites.net/api/user/${params.id}`
        // `http://localhost:5148/api/user/${params.id}`,
      );
      if (res.ok) {
        return await res.json();
      }
    }
  });
  

  if (session.status === 'loading' || isLoading) {
    return (
      <div className="flex justify-center py-10 md:px-10">
        <Card className="w-full py-5 -md:border-hidden -md:shadow-none -md:w-[100dvw] max-w-4xl">
          <CardHeader className="text-4xl font-semibold px-1 text-center animate-pulse">
            Loading...
          </CardHeader>
          <div className="mx-5">
            <Separator className="mb-5"></Separator>
          </div>
          <CardContent className="p-2 h-full animate-pulse">
            <div className="flex justify-center h-full">
              <Icons.spinner className="animate-spin w-[50px] h-[50px]"></Icons.spinner>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    notFound()
  }

  const isUser = params.id === session.data?.user?.userId?.toString();
    
  return (
    <div className="flex justify-center py-10 md:px-10">
      <Card className="w-full py-5 -md:border-hidden -md:shadow-none -md:w-[100dvw] max-w-4xl">
        <CardHeader className="text-4xl font-semibold px-1 text-center">
          {isUser ? 'Your' : `${userQuery.data?.name}'s`} anime list
        </CardHeader>
        <div className="mx-5">
          <Separator className="mb-5"></Separator>
        </div>
        <CardContent className="p-2">
          <BookmarkTable
            isUser={isUser}
            bookmarks={data}
            className="px-2"
          ></BookmarkTable>
        </CardContent>
      </Card>
    </div>
  );
}
