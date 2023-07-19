import Link from 'next/link';
import LoginForm from '@/components/LoginForm';


export default function LoginPage() {
    return (
        <>
            <h1 className="text-3xl font-semibold tracking-tight text-primary">
                Log In
            </h1>
            <LoginForm />
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
