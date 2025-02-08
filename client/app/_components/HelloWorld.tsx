"use client";

import React, { useState } from "react";
import { WavyBackground } from "../../components/ui/wavy-background";
import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CardHoverEffectDemo } from "./card-hover";
import CryptoLanding from "@/components/ui/crypto-landing";
import { useRouter } from 'next/navigation'
import { HeroParallax } from "@/components/ui/hero-parallax";
import { SparklesCore } from "@/components/ui/sparkles";
import { WobbleCardDemo} from "./wobble-card"
import Image from "next/image";

import localFont from 'next/font/local';

const myFont = localFont({
  src: [
    {
      path: '../Mimoid.woff',
      weight: '800', 
      style: 'normal', 
    },
  ],
  display: 'swap',
});

const myFont2 = localFont({
  src: [
    {
      path: '../GenericTechno.otf',
      weight: '800', 
      style: 'normal', 
    },
  ],
  display: 'swap',
});


export const products = [
  {
    title: "$TRUMP",
    link: "https://x.com/realDonaldTrump/status/1880446012168249386",
    thumbnail:
      "https://public.bnbstatic.com/image/cms/crawler/MARSBIT_NEWS/1737179393990940.jpg",
  },
  {
    title: "$TRUMP",
    link: "https://x.com/realDonaldTrump/status/1880446012168249386",
    thumbnail:
      "https://public.bnbstatic.com/image/cms/crawler/MARSBIT_NEWS/1737179393990940.jpg",
  },
  {
    title: "$TRUMP",
    link: "https://x.com/realDonaldTrump/status/1880446012168249386",
    thumbnail:
      "https://pbs.twimg.com/media/Ghr6U3NXcAAsRqa.jpg:large",
  },
 
  {
    title: "$MELANIA",
    link: "https://x.com/MELANIATRUMP/status/1881094861279129643",
    thumbnail:
      "https://pbs.twimg.com/media/Ghr6U3NXcAAsRqa.jpg:large",
  },
  {
    title: "$MELANIA",
    link: "https://x.com/MELANIATRUMP/status/1881094861279129643",
    thumbnail:
      "https://pbs.twimg.com/media/Ghr6U3NXcAAsRqa.jpg:large",
  },
  {
    title: "$MELANIA",
    link: "https://x.com/MELANIATRUMP/status/1881094861279129643",
    thumbnail:
      "https://pbs.twimg.com/media/Ghr6U3NXcAAsRqa.jpg:large",
  },
 
  {
    title: "$TRUMP",
    link: "https://x.com/realDonaldTrump/status/1880446012168249386",
    thumbnail:
      "https://public.bnbstatic.com/image/cms/crawler/MARSBIT_NEWS/1737179393990940.jpg",
  },
  {
    title: "$TRUMP",
    link: "https://x.com/realDonaldTrump/status/1880446012168249386",
    thumbnail:
      "https://public.bnbstatic.com/image/cms/crawler/MARSBIT_NEWS/1737179393990940.jpg",
  },
  {
    title: "$TRUMP",
    link: "https://x.com/realDonaldTrump/status/1880446012168249386",
    thumbnail:
      "https://pbs.twimg.com/media/Ghr6U3NXcAAsRqa.jpg:large",
  },
  {
    title: "$MELANIA",
    link: "https://x.com/MELANIATRUMP/status/1881094861279129643",
    thumbnail:
      "https://pbs.twimg.com/media/Ghr6U3NXcAAsRqa.jpg:large",
  },
  {
    title: "$MELANIA",
    link: "https://x.com/MELANIATRUMP/status/1881094861279129643",
    thumbnail:
      "https://pbs.twimg.com/media/Ghr6U3NXcAAsRqa.jpg:large",
  },
  {
    title: "$MELANIA",
    link: "https://x.com/MELANIATRUMP/status/1881094861279129643",
    thumbnail:
      "https://pbs.twimg.com/media/Ghr6U3NXcAAsRqa.jpg:large",
  },
  {
    title: "$TRUMP",
    link: "https://x.com/realDonaldTrump/status/1880446012168249386",
    thumbnail:
      "https://public.bnbstatic.com/image/cms/crawler/MARSBIT_NEWS/1737179393990940.jpg",
  },
  {
    title: "$TRUMP",
    link: "https://x.com/realDonaldTrump/status/1880446012168249386",
    thumbnail:
      "https://public.bnbstatic.com/image/cms/crawler/MARSBIT_NEWS/1737179393990940.jpg",
  },
  {
    title: "$TRUMP",
    link: "https://x.com/realDonaldTrump/status/1880446012168249386",
    thumbnail:
      "https://pbs.twimg.com/media/Ghr6U3NXcAAsRqa.jpg:large",
  },
];

export default function HelloWorld() {
  return (
    <PrivyProvider
      appId="cm6l86lp100vykh0tt3erllts"
      config={{
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <Home />
    </PrivyProvider>
  );
}

function Home() {
  const { login, logout, authenticated, user } = usePrivy();

  return (
    <div className="w-full min-h-screen bg-black"> 
      <Navbar className="top-2" login={login} logout={logout} authenticated={authenticated} user={user} />
      <WavyBackground className="w-full min-h-screen relative">
        <div className="flex flex-col items-center w-full space-y-12 p-4 pt-52">
        <h1 className={`text-2xl md:text-4xl lg:text-7xl text-white font-bold text-center ${myFont.className}`}>
          AGENTIC AI
        </h1>
          
          {!authenticated ? (
            <>
              <p className={`text-base md:text-lg mt-8 text-white font-normal inter-var text-center ${myFont2.className}`}> 
                Connect your wallet to get started!
              </p>
              <CardHoverEffectDemo />
              {/* <div className="max-w-7xl mx-auto px-4 mt-32 pb-40"> 
                <HoverEffect items={projects} />
              </div> */}
            </>
          ) : (
            <p className="text-white text-lg">
              Connected as {user?.wallet?.address}
            </p>
          )}
        </div>
        <CryptoLanding />
        <HeroParallax products={products} />
        <div className="h-[30rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
            <h2 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20 mb-4">
              Features
            </h2>
            <div className="w-[40rem] h-32 relative">
              {/* Gradients */}
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

              {/* Core component */}
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />

              {/* Radial Gradient to prevent sharp edges */}
              <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
          </div>
          <WobbleCardDemo />
          {/* <StickyScrollRevealDemo /> */}

      </WavyBackground>
    </div>
  );
}



function Navbar({ className, login, logout, authenticated, user }: { 
  className?: string, 
  login: () => void, 
  logout: () => void, 
  authenticated: boolean, 
  user: any 
}) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <div className={`flex justify-between items-center backdrop-blur-sm bg-white/30 dark:bg-black/30 rounded-full border border-white/20 dark:border-black/20 shadow-lg px-8 py-4 ${myFont.className}`}>
        <div className="flex space-x-6 text-white justify-center">
          <MenuItem setActive={setActive} active={active} item="Buy" />
          <MenuItem setActive={setActive} active={active} item="Market" />
          <MenuItem setActive={setActive} active={active} item="Learn" />
        </div>
        <div>
          {!authenticated ? (
            <button
              onClick={login}
              className="px-4 py-2 rounded-full bg-gradient-to-b from-purple-500 to-blue-600 text-white text-sm focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
            >
              Connect Wallet
            </button>
          ) : (
            <button 
              onClick={logout} 
              className="px-4 py-2 rounded-full bg-gradient-to-b from-red-500 to-red-600 text-white text-sm focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
            >
              Disconnect
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${item.toLowerCase()}`);
  };

  return (
    <div 
      onMouseEnter={() => setActive(item)} 
      onClick={handleClick}
      className="relative cursor-pointer"
    >
      <motion.p
        transition={{ duration: 0.3 }}
        className="text-white hover:opacity-[0.9]"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div
                  layout
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};