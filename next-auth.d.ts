import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: 'employee' | 'manager'; // Your defined roles
    };
  }

  interface User {
    role?: 'employee' | 'manager'; // Ensure the User interface has role
  }
}