import Link from 'next/link';
import { Card } from '@/components/ui/card';
import UserLoginForm from '@/components/UserLoginForm';


export default function LoginPage() {
    return (
        <div className='flex justify-center items-center h-[100dvh]'>
            <Card className='p-16 py-24'>
                <div className='flex flex-col w-[350px] text-center space-y-10'>
                    <h1 className='text-3xl font-semibold tracking-tight'>
                        Log In
                    </h1>
                    <UserLoginForm />
                    <p className='px-8 text-sm text-muted-foreground'>
                        Don't have an account?{' '}
                        <Link
                            href='/register'
                            className='underline underline-offset-4 hover:text-primary'
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
