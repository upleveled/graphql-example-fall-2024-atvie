import './globals.scss';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUser } from '../database/users';
import { LogoutButton } from './(auth)/logout/LogoutButton';
import { ApolloClientProvider } from './ApolloClientProvider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Task: Protect the dashboard page and redirect to login if the user is not logged in

  // 1. Checking if the sessionToken cookie exists
  const sessionCookie = (await cookies()).get('sessionToken');

  // 2. Get the current logged in user from the database using the sessionToken value
  const user = sessionCookie && (await getUser(sessionCookie.value));

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <nav>
          <div>
            <Link href="/">Home</Link>
            <Link href="/animals">Animals</Link>
            <Link href="/animals/dashboard">Animal Dashboard</Link>
            <Link href="/notes">Notes</Link>
          </div>

          <div>{user?.username}</div>
          {user?.username ? (
            <LogoutButton />
          ) : (
            <>
              <Link href="/register">Register</Link>
              <Link href="/login">Login</Link>
            </>
          )}
        </nav>
        <ApolloClientProvider>
          <main>{children}</main>
        </ApolloClientProvider>
      </body>
    </html>
  );
}
