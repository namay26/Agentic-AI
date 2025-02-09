"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "@/components/ui/wobble-card";

export function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          AI-Powered Memecoin Detection
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
          Memecoins often experience explosive growth immediately after launch, making early entry crucial. Our AI agents continuously scrape Twitter to detect new memecoin launch announcements in real-time, ensuring users never miss an opportunity.
          </p>
        </div>
        {/* <Image
          src="/logo.png"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
        /> */}
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
        Cross-Chain Trading Without Hassle
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
        Most memecoins launch on Solana, but users from other chains face a tedious onboarding process—setting up a Solana-compatible wallet, funding it with SOL, and executing trades. Our solution instantly launches a mirrored token on Arbitrum, allowing users to place buy/sell orders without needing direct access to Solana.
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Automated Liquidity & Instant Trading
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          When our AI detects a new memecoin launch on Solana, we automatically create a corresponding token on Arbitrum pegged to the original. This enables traders from other chains to participate in the hype immediately, without manually bridging assets or switching networks.

          </p>
        </div>
        <Image
          src="/linear.webp"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
}
