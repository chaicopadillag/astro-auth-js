/// <reference path="../.astro/types.d.ts" />
/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/actions.d.ts" />
/// <reference types="astro/client" />

// interface User {
//   name: string;
//   email: string;
//   role?: string;
// }

declare namespace App {
  interface Locals {
    isLoggedIn: boolean;
    isAdmin: boolean;
    user: User | null;
  }
}

declare module '@auth/core/types' {
  interface User extends DefaultUser {
    role?: string;
    name: string;
    email: string;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}
