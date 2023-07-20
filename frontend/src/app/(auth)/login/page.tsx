import Link from 'next/link';
import LoginForm from '@/components/LoginForm';
import { getProviders } from 'next-auth/react';



export default async function LoginPage() {
    const providers = await getProviders();
    console.log(providers);
    return (
        <>
            <h1 className="text-3xl font-semibold tracking-tight text-primary">
                Log In
            </h1>
            <LoginForm providers={providers}/>
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
