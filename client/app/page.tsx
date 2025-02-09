"use client";

import { ReactElement } from "react";
import HelloWorld from "./_components/HelloWorld";
import CryptoTradingPage from "./(routes)/buy/page";

export default function Home(): ReactElement {
  return (
    <main className="h-full w-full flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <CryptoTradingPage />
        <HelloWorld />
      </div>
    </main>
  );
}
