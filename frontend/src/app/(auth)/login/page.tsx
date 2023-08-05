import Link from 'next/link';
import LoginForm from '@/app/(auth)/login/LoginForm';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MSAnime / Login'
};

function LoginFormFallback() {
  return <Skeleton className="w-[350px] h-[344px] rounded-md"></Skeleton>;
}

export default async function LoginPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight">
        Log In
      </h1>
      <Suspense fallback={<LoginFormFallback></LoginFormFallback>}>
        <LoginForm />
      </Suspense>
      <p className="px-8 text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="underline underline-offset-4 hover:text-primary"
        >
          Sign up
        </Link>
        .
      </p>
    </>
  );
}
