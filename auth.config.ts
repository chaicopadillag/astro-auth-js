// import GitHub from '@auth/core/providers/github';
import type { AdapterUser } from '@auth/core/adapters';
import Credentials from '@auth/core/providers/credentials';
import { db, eq, User } from 'astro:db';
import { defineConfig } from 'auth-astro';
import bcript from 'bcryptjs';

export default defineConfig({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async ({ email, password }) => {
        const user = await db
          .select()
          .from(User)
          .where(eq(User.email, `${email}`))
          .get();

        if (!user) {
          throw new Error('User not found');
        }

        if (!bcript.compareSync(`${password}`, user.password)) {
          throw new Error('Invalid password');
        }

        const { password: _, ...rest } = user;

        console.log({ rest });

        return rest;
      }
    })
    // GitHub({
    //   clientId: import.meta.env.GITHUB_CLIENT_ID,
    //   clientSecret: import.meta.env.GITHUB_CLIENT_SECRET
    // })
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user = token.user as AdapterUser;

      return session;
    }
  }
});
