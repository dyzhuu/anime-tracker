'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { useSession } from 'next-auth/react';
import { notFound, redirect } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Icons } from '@/lib/icons';
import { ProfileForm } from './ProfileForm';

export default function UserBookmarksPage() {
  const session = useSession({
    required: true
  });

  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await fetch(
        `https://dzmsabackend.azurewebsites.net/api/user/${session?.data?.user?.userId}`
      );
      if (res.ok) {
        return await res.json();
      }
    }
  });
  if (session.status === 'authenticated') {
    return (
      <div className="flex justify-center py-10 md:px-10">
        <Card className="w-full py-5 -md:border-hidden -md:shadow-none -md:w-[100dvw] max-w-4xl">
          <CardHeader className="text-4xl font-semibold px-1 text-center">
            Your profile
          </CardHeader>
          <div className="mx-5">
            <Separator className="mb-5"></Separator>
          </div>
          <CardContent className="md:px-20 lg:px-32">
            <ProfileForm></ProfileForm>
          </CardContent>
        </Card>
      </div>
    );
  }
}
