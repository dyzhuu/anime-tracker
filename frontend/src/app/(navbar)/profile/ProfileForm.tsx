'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';

export function ProfileForm() {
  const session = useSession();
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordScore, setPasswordScore] = useState(0); // 0: too short, 1: weak
  const profileFormSchema = z
    .object({
      username: z
        .string()
        .max(30, {
          message: 'Username must not be longer than 30 characters.'
        })
        .regex(
          new RegExp(/^(?:^[a-zA-Z0-9-_]+$|)$/),
          'Username must be alphanumeric'
        )
        .optional(),
      currentPassword: z.string().optional(),
      newPassword: z.string().optional()
    })
    .superRefine((values, ctx) => {
      if (passwordScore < 2 && newPassword) {
        ctx.addIssue({
          message: 'Password is too weak.',
          code: z.ZodIssueCode.custom,
          path: ['newPassword']
        });
      }
    });

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange'
  });

  useEffect(() => {
    if (currentPassword.length === 0) {
      form.setValue('newPassword', '');
    }
  }, [form, currentPassword]);

  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
    const data = {
      id: session.data?.user?.userId,
      username: values.username ? values.username : session.data?.user?.username,
      password: values.newPassword ?? ''
    };

    if (data.password) {
      const res = await fetch(
        'https://dzmsabackend.azurewebsites.net/api/auth/login',
        {
          method: 'POST',
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username: data.username, password: currentPassword})
        }
      );
      if (!res.ok) {
        toast({
          variant: 'destructive',
          title: 'Password incorrect.'
        });
        return;
      }
    }

    
    try {
      const token = (await fetch('/api/token').then((res) => res.json())).token;
      // const res = await fetch(
      //   'http://localhost:5148/api/user/profile',
        const res = await fetch(
          'https://dzmsabackend.azurewebsites.net/api/user/profile',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(data)
        }
      );

      if (res.ok) {
        toast({
          title: 'Profile Updated'
        })
        form.reset({
          newPassword: '',
          currentPassword: '',
          username: ''
        });
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
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
        className="space-y-8 grid"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl
                onChange={(e) =>
                  setUsername((e.target as HTMLInputElement).value)
                }
              >
                <Input
                  autoComplete="off"
                  placeholder={session.data?.user?.username}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl
                onChange={(e) =>
                  setCurrentPassword((e.target as HTMLInputElement).value)
                }
              >
                <Input
                  autoComplete="off"
                  type="password"
                  disabled={session.data?.user?.email != null}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl
                onChange={(e) =>
                  setNewPassword((e.target as HTMLInputElement).value)
                }
              >
                <Input
                  disabled={
                    !currentPassword || session.data?.user?.email != null
                  }
                  autoComplete="off"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <PasswordStrengthBar
          password={newPassword}
          onChangeScore={(s: number) => setPasswordScore(s)}
        ></PasswordStrengthBar>

        <Button disabled={!username && !currentPassword} type="submit">
          Update profile
        </Button>
      </form>
    </Form>
  );
}
