import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { AdapterUser } from 'next-auth/adapters';

// Function to fetch user role from your database or service
async function fetchUserRole(email: string): Promise<string> {
  // Replace with actual logic to fetch the user role
  // For demonstration, we’ll use hardcoded values
  if (email === 'web3samajmanipal@gmail.com') {
    return 'manager'; // Simulated manager email
  } else {
    return 'employee'; // Default role
  }
}

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
      // Assign the role from token to session
      session.user.role = token.role as 'employee' | 'manager';
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        // Fetch and set the user role when the user logs in
        token.role = await fetchUserRole(user.email || ''); // Ensure email is available
      }
      return token;
    },
  },
  pages: {
    signIn: '/',  // Optional: Redirect to home page for sign-in
  },
});
