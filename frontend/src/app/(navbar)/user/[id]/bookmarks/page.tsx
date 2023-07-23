'use client'

import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { redirect, usePathname, useSearchParams } from "next/navigation";

export default function UserBookmarksPage({params}: {params: {id: string}}) {
  const { toast } = useToast();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      toast({
        variant: 'destructive',
        title: 'Log in to access your bookmarks'
      });
      redirect(`/login?redirectTo=/user/undefined/bookmarks`);
    },
  });
  if (params.id === 'undefined' && session.status === 'authenticated') {
    redirect(`/user/${session?.data?.user?.userId}/bookmarks`)
  }
  if (session.status === 'loading') {
    return(
    <p>Loading...</p>
    )
  }
  return(
    <p>{params.id}</p>
  )
}
