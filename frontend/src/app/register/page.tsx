import Link from 'next/link';
import { Card } from '@/components/ui/card';
import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
    return (
        <div className="flex justify-center items-center h-[100dvh]">
            <Card className="border-card shadow-none md:border-border md:shadow-sm h-[100dvh] w-[100dvw] md:h-fit md:min-h-[650px] md:max-w-[480px] p-10 md:p-16 md:py-24 flex justify-center items-center">
                <div className="flex flex-col w-[350px] text-center space-y-10">
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
                </div>
            </Card>
        </div>
    );
}
