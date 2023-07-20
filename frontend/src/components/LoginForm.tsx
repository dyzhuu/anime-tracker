'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Icons } from '@/lib/icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter, usePathname, useSearchParams, ReadonlyURLSearchParams } from 'next/navigation';
import { setAuthToken } from '@/lib/auth';
import { signIn, getSession, getCsrfToken, useSession } from 'next-auth/react';
import { stat } from 'fs';

const formSchema = z.object({
  username: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required')
});

function redirectUrl(
  searchParams: ReadonlyURLSearchParams | null,
): string {
  const redirectTo = searchParams?.get('redirectTo');

  if (redirectTo) {
    return `/${redirectTo.slice(1)}`;
  } else {
    return '/';
  }
}

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  // const pathname = usePathname();
  // const fromUrl = pathname + '?' + searchParams.toString()
  // router.push(`/login?redirectTo=${fromUrl}`);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // const res = await fetch('http://localhost:5148/api/auth/login', {
      const res = await fetch(
        'https://dzmsabackend.azurewebsites.net/api/auth/login',
        {
          method: 'POST',
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        }
      );
      if (res.status == 200) {
        const data = await res.json();

        // store JWT token in local storage
        setAuthToken(data.token);
        router.push(redirectUrl(searchParams));
      } else {
        toast({
          variant: 'destructive',
          title: `Invalid Credentials`
        });
      }
    } catch {
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
          setIsLoading(true)
          signIn('google', { callbackUrl: redirectUrl(searchParams) });
        }
        }
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
          setIsLoading(true)
          signIn('github', { callbackUrl: redirectUrl(searchParams) });
        }
        }
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
