'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Icons } from '@/lib/icons';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { signIn } from 'next-auth/react';
import { redirectUrl } from '@/lib/utils';

const formSchema = z.object({
  username: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required')
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams?.get('error') !== null) {
      setTimeout(() => {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'There was an error processing your request'
        });
      }, 100);
    }
  }, [toast, searchParams]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const res = (await signIn('credentials', { ...values, redirect: false }))!;
    if (!res.error) {
      router.push(redirectUrl(searchParams));
    } else if (res.error === 'CredentialsSignin') {
      toast({
        variant: 'destructive',
        title: `Invalid Credentials`
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'There was an error processing your request'
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="grid gap-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
          <div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="password"
                      type="password"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="mt-4" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Log in
          </Button>
        </form>
      </Form>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-2 text-muted-foreground ">OR</span>
        </div>
      </div>
      <Button
        key="Google"
        variant="outline"
        className="space-x-12"
        disabled={isLoading}
        onClick={() => {
          setIsLoading(true);
          signIn('google', { callbackUrl: redirectUrl(searchParams) });
        }}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{' '}
        Continue with Google
      </Button>

      <Button
        key="GitHub"
        variant="outline"
        className="space-x-12"
        disabled={isLoading}
        onClick={() => {
          setIsLoading(true);
          signIn('github', { callbackUrl: redirectUrl(searchParams) });
        }}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{' '}
        Continue with GitHub
      </Button>
    </div>
  );
}
