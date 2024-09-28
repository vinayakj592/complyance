import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role as 'employee' | 'manager';
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || 'employee';  // Set default role as 'employee' if not provided
      }
      return token;
    },
  },
  pages: {
    signIn: '/',  // Optional: Redirect to home page for sign-in
  },
});
