import type { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import jsonwebtoken from 'jsonwebtoken'

const secret = process.env.NEXTAUTH_SECRET

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID! as string,
      clientSecret: process.env.GITHUB_SECRET! as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID! as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET! as string
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const res = await fetch('https://dzmsabackend.azurewebsites.net/api/auth/login', 
        // const res = await fetch('http://localhost:5148/api/auth/login',
          {
            method: 'POST',
            cache: 'no-store',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
          }
        );

        if (res.ok) {
          const user = await res.json();
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          exp: Math.floor(Date.now() / 1000) + 1 * 24 * 60 * 60
        },
        secret
      );
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret);
      return decodedToken as JWT;
    }
  },
  callbacks: {
    async signIn({account, user}) {
      if (account?.provider === ('google' || 'github')) {
        const username = user.name?.split(' ')[0]
        try {
          const res = await fetch('https://dzmsabackend.azurewebsites.net/api/auth/oauth2', 
          // const res = await fetch('http://localhost:5148/api/auth/oauth2', 
          {
            method: 'POST',
            cache: 'no-store',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ExternalId: user.id,
              Username: username
            })
          });
        } catch (e) {
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      // // const res = await fetch('https://dzmsabackend.azurewebsites.net/api/user/me',  
      const encodedToken = jsonwebtoken.sign(
        { ...token }, secret!
      );
      const res = await fetch('http://localhost:5148/api/user/me', 
          {
            cache: 'no-store',
            headers: {
              Authorization: `Bearer ${encodedToken}`
            },  
          });
      const user = await res.json()
      session.user = { ...token, ...user } ;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    newUser: '/register',
    error: '/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60
  }
};
