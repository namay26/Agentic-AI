import { HoverEffect } from "@/components/ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8 mt-20">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "AI Agents",
    description:
      "Uses AI to scrape tweets to detect memecoin launches at the earliest.",
    link: "",
  },
  {
    title: "Cross Chain Bridging",
    description:
      "Allows user on Arbitrum to buy Solana memecoins directly with USDC/USDT.",
    link: "",
  },
  {
    title: "Easy UI",
    description:
      "Easy-to-use on-boarding so users can place orders conveniently.",
    link: "",
  },
  
];
