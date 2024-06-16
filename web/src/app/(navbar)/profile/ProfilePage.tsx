'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useSession } from 'next-auth/react';
import { ProfileForm } from './ProfileForm';

export function ProfilePage() {
  const { status } = useSession({
    required: true
  });

  if (status === 'authenticated') {
    return (
      <div className="flex justify-center py-10 md:px-10">
        <Card className="w-full py-5 -md:border-hidden -md:shadow-none -md:w-[100dvw] max-w-4xl -md:bg-background">
          <CardHeader className="text-4xl font-semibold px-1 text-center">
            Update your account settings
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
