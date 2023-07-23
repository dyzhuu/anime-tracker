'use client';

import { useSession } from 'next-auth/react';
import {
  redirect,
} from 'next/navigation';

export default function UserPage({ params }: { params: { id: string } }) {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/login?redirectTo=/user/undefined`);
    }
  });
  if (params.id === 'undefined' && session.status === 'authenticated') {
    redirect(`/user/${session?.data?.user?.userId}`);
  }
  if (session.status === 'loading') {
    return <p>Loading...</p>;
  }
  return <p>{params.id}</p>;
}
