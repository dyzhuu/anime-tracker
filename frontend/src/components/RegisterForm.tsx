'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Icons } from '@/lib/icons';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useToast } from '@/components//ui/use-toast';
import { useRouter } from 'next/navigation';
import { Description } from '@radix-ui/react-toast';

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [password, setPassword] = useState('');
    const [passwordScore, setPasswordScore] = useState(0); // 0: too short, 1: weak
    const { toast } = useToast();
    const router = useRouter();

    const formSchema = z.object({
    username: z
        .string()
        .min(1, 'Required')
        .regex(
            new RegExp(/^[a-zA-Z0-9-_]+$/),
            'Username must be alphanumeric'
        ),
    password: z.string().min(1, 'Required')
    }).superRefine((values, ctx) => {
      if (passwordScore < 2) {
        ctx.addIssue({
          message: 'Password is too weak.',
          code: z.ZodIssueCode.custom,
          path: ['password']
        });
      }
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '', password: ''
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
      setIsLoading(true);
      
      try{
          //  const res = await fetch('https://dzmsabackend.azurewebsites.net/api/auth/register', {
          const res = await fetch('http://localhost:5148/api/auth/register', {
            method: 'POST',
            cache: 'no-store',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          });
    
          if (res.ok) {
            router.push('/login');
          } else {
            toast({
                variant: 'destructive',
                title: 'Username taken.'
              });
          }
      } catch (e) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'There was an error processing your request'
        });
      }
      setIsLoading(false);
    }

    return (
      <div className="grid gap-6">
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
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Password</FormLabel>
                    <FormControl
                      onChange={(e) =>
                        setPassword((e.target as HTMLInputElement).value)
                      }
                    >
                      <Input
                        placeholder="password"
                        type="password"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <PasswordStrengthBar
              password={password}
              onChangeScore={(s: number) => setPasswordScore(s)}
            ></PasswordStrengthBar>
            <Button type="submit" className="mt-4" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign up
            </Button>
          </form>
        </Form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-2 text-muted-foreground ">
              OR
            </span>
          </div>
        </div>
        <Button variant="outline" className="space-x-12" disabled={isLoading}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{' '}
          Sign up with Google
        </Button>
      </div>
    );
}
