import 'next-auth';

declare module 'next-auth' {
  interface User {
    id?: number;
    userId?: string;
    username?: string;
  }

  interface Session {
    user?: User;
  }
}
