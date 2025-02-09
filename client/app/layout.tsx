"use client";

import "@/styles/globals.css";
import { Inter } from "next/font/google";
import localFont from 'next/font/local';
import { PrivyProvider } from "@privy-io/react-auth";


const myFont = localFont({
  src: [
    {
      path: 'GenericTechno.otf',
      weight: '400', 
      style: 'normal', 
    },
  ],
  display: 'swap',
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.className} bg-white min-h-screen`}>
        <PrivyProvider
          appId="cm6l86lp100vykh0tt3erllts"
          config={{
            embeddedWallets: {
              createOnLogin: "users-without-wallets",
            },
          }}
        >
          {children}
        </PrivyProvider>
      </body>
    </html>
  );
}
