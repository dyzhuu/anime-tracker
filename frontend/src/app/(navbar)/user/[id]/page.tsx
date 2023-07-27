'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useSession } from 'next-auth/react';
import { notFound, redirect } from 'next/navigation';

export default function UserPage({ params }: { params: { id: string } }) {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/login?redirectTo=/user/undefined`);
    }
  });
  const user = session.data?.user

  if (session.status === 'loading') {
    return <p>Loading...</p>;
  }
  if (session.status === 'authenticated' ) {
    if (params.id === 'undefined') {
      redirect(`/user/${session?.data?.user?.userId}`);
    }
    else if (!user) {
      return notFound();
    }
    
    return (
      <div className="flex justify-center md:p-10">
        <Card className="w-full py-5 -md:border-hidden -md:shadow-none">
          <CardHeader className="text-3xl font-medium text-primary px-10">
            Top 
          </CardHeader>
          <div className="mx-5">
            <Separator className="mb-10"></Separator>
          </div>
          <CardContent>
          </CardContent>
        </Card>
      </div>
    );
  }
}
