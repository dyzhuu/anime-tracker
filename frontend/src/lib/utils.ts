import { type ClassValue, clsx } from 'clsx';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function redirectUrl(
  searchParams: ReadonlyURLSearchParams | null
): string {
  let redirectTo = searchParams?.get('redirectTo');
  if (redirectTo) {
    return `/${redirectTo.slice(1)}`;
  } else {
    return '/';
  }
}