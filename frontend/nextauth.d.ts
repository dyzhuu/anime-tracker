import 'next-auth';

declare module 'next-auth' {
  interface User {
    id?: string;
    userId?: string;
    username?: string;
  }

  interface Session {
    user?: User;
  }
  interface DefaultJWT {
    id: number,
  }
}
