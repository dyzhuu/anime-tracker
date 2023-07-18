"use client"

import * as React from "react"
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Icons } from '@/lib/icons'
import { useState } from "react"
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
    username: z.string(),
    password: z.string()
});

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '', password: ''
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
         setIsLoading(true);
         // log in
         console.log(JSON.stringify(values))
         const data = await fetch(
             'https://dzmsabackend.azurewebsites.net/api/auth/login',
             {
                 method: 'POST',
                 mode: 'no-cors',
                 cache: 'no-store',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(values)
             }
         )
             .then((data) => data.json())
             .then((res) => console.log(res))
             .catch(() => {
                 toast({
                     variant: 'destructive',
                     title: 'Invalid Credentials.'
                 });
             });
         setIsLoading(false);
    }

    return (
        <div className="grid gap-6">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid gap-2"
                >
                    <div>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="sr-only">
                                        Username
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="username"
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
                                    <FormLabel className="sr-only">
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="password"
                                            type="password"
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
            <Button
                variant="outline"
                className="space-x-12"
                disabled={isLoading}
            >
                {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.google className="mr-2 h-4 w-4" />
                )}{' '}
                Log in with Google
            </Button>
        </div>
    );
}