// pages/_app.tsx
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app'; // Import AppProps for typing
import '../styles/globals.css'; // Adjust the path if your styles folder is different

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}> {/* Correctly extract session */}
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;