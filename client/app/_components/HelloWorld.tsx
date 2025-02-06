"use client";

import React, { useState } from "react";
import { WavyBackground } from "../../components/ui/wavy-background";
import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { HoverEffect } from "../../components/ui/card-hover-effect";
import CryptoLanding from "@/components/ui/crypto-landing";
import { useRouter } from 'next/navigation'


export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Build Faster",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "",
  },
  {
    title: "Spend less",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "",
  },
  {
    title: "Increase resilience",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "",
  }
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
          <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold font-custom text-center">
            AGENTIC AI
          </p>
          
          {!authenticated ? (
            <>
              <p className="text-base md:text-lg mt-8 text-white font-normal inter-var text-center"> 
                Connect your wallet to get started!
              </p>
              <div className="max-w-7xl mx-auto px-4 mt-32 pb-40"> 
                <HoverEffect items={projects} />
              </div>
            </>
          ) : (
            <p className="text-white text-lg">
              Connected as {user?.wallet?.address}
            </p>
          )}
        </div>
        <CryptoLanding />
        
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
      <div className="flex justify-between items-center backdrop-blur-sm bg-white/30 dark:bg-black/30 rounded-full border border-white/20 dark:border-black/20 shadow-lg px-8 py-4">
        <div className="flex space-x-6 text-white justify-center">
          <MenuItem setActive={setActive} active={active} item="Buy" />
          <MenuItem setActive={setActive} active={active} item="Market" />
          <MenuItem setActive={setActive} active={active} item="Learn" />
        </div>
        <div>
          {!authenticated ? (
            <button
              onClick={login}
              className="px-4 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white text-sm focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
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