import Link from 'next/link';
import RegisterForm from '@/app/(auth)/register/RegisterForm';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

function RegisterFormFallback() {
  return <Skeleton className="w-[350px] h-[385px] rounded-md"></Skeleton>;
}

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight text-primary">
        Sign up
      </h1>
      <Suspense fallback={<RegisterFormFallback></RegisterFormFallback>}>
        <RegisterForm />
      </Suspense>
      <p className="px-8 text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-primary"
        >
          Log in
        </Link>
        .
      </p>
    </>
  );
}
