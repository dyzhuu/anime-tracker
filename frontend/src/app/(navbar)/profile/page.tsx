'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function ProfilePage({ params }: { params: { id: string } }) {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/login?redirectTo=/profile`);
    }
  });
  if (session.status === 'loading') {
    return <p>Loading...</p>;
  }
  return <p>{params.id}</p>;
}
