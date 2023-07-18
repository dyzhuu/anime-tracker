import Link from 'next/link';
import { Card } from '@/components/ui/card';
import LoginForm from '@/components/LoginForm';


export default function LoginPage() {
    return (
        <div className="flex justify-center items-center h-[100dvh]">
            <Card className="border-card shadow-none md:border-border md:shadow-sm h-[100dvh] w-[100dvw] md:h-fit md:min-h-[650px] md:max-w-[480px] p-10 md:p-16 md:py-24 flex justify-center items-center">
                <div className="flex flex-col w-[350px] text-center space-y-10">
                    <h1 className="text-3xl font-semibold tracking-tight text-primary">
                        Log In
                    </h1>
                    <LoginForm />
                    <p className="px-8 text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <Link
                            href="/register"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Sign up
                        </Link>
                        .
                    </p>
                </div>
            </Card>
        </div>
    );
}
