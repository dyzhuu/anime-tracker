import 'next-auth';

declare module 'next-auth' {
  interface User {
    id?: number;
    userId?: number;
    username?: string;
  }

  interface Session {
    user?: User;
  }
}
