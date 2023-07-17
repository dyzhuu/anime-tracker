"use client"

import * as React from "react"

import { Icons } from './icons'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ChangeEventHandler, FormEvent, useState } from "react"

export default function UserLoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e: FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        e.preventDefault();
        setTimeout(() => {
            setIsLoading(false)
            alert(username + ' ' + password);
        }, 1000);
  };

  return (
      <div className='grid gap-6'>
          <form onSubmit={submit}>
              <div className='grid gap-2'>
                  <Input
                      id='username'
                      placeholder='username'
                      disabled={isLoading}
                      onChange={(e) => setUsername(e.target.value)}
                  />
                  <Input
                      id='password'
                      placeholder='password'
                      type='password'
                      disabled={isLoading}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button className='mt-6' disabled={isLoading}>
                      {isLoading && (
                          <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                      )}
                      Log in
                  </Button>
              </div>
          </form>
          <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                  <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs'>
                  <span className='bg-background px-2 text-muted-foreground '>
                      OR
                  </span>
              </div>
          </div>
          <Button variant='outline' className='space-x-12' disabled={isLoading}>
              {isLoading ? (
                  <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                  <Icons.google className='mr-2 h-4 w-4' />
              )}{' '}
              Log in with Google
          </Button>
      </div>
  );
}