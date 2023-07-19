import Link from 'next/link';
import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
    return (
        <>
            <h1 className="text-3xl font-semibold tracking-tight text-primary">
                Sign up
            </h1>
            <RegisterForm />
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
