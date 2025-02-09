// components/Navbar.tsx
"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation'
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

export default Navbar;
