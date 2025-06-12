import type { FC } from "react";

const BTC_ADDRESS = "bc1q8st6p7h6rrdg3qzsvxnwjl4mggwd4rcr4cq0qn";
const ETH_ADDRESS = "0x041241A967A7f35f575451fB15652357Fa15171c";
const USDC_ADDRESS = "0x041241A967A7f35f575451fB15652357Fa15171c";
const LTC_ADDRESS = "ltc1qhld85x6w0n3dkjl6e5333uzxs43memfhych77j";
const SOL_ADDRESS = "Bv8Wcon6xjkfrtg4LhCKpuNPyjKqukb29tnQxRVj4RAn";
const DOGE_ADDRESS = "DMUy7Hu7u5c1F8tUVCJMdQYWHGhCgXyW8m";
const XRP_ADDRESS = "rLFJv2NTiKXsz7quyR55PJpNd32Qhr6cB3";
const BNB_ADDRESS = "0x041241A967A7f35f575451fB15652357Fa15171c";
const TRON_ADDRESS = "TMENErUuaajAmJoenppG4qohhqzXuu7fgp";

export const DonateSection: FC = () => {
  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Support MoodSnap</h2>
      <p className="mb-4">If you enjoy using MoodSnap, consider supporting us!</p>

      <div className="mt-4">
        <div className="flex flex-col space-y-4">
          <div className="w-full p-4 bg-white border rounded">
            <p className="font-semibold">Bitcoin (BTC)</p>
            <code className="block mt-1 break-all">{BTC_ADDRESS}</code>
          </div>
          <div className="w-full p-4 bg-white border rounded">
            <p className="font-semibold">Ethereum (ETH)</p>
            <code className="block mt-1 break-all">{ETH_ADDRESS}</code>
          </div>
          <div className="w-full p-4 bg-white border rounded">
            <p className="font-semibold">USD Coin (USDC)</p>
            <code className="block mt-1 break-all">{USDC_ADDRESS}</code>
          </div>
          <div className="w-full p-4 bg-white border rounded">
            <p className="font-semibold">Litecoin (LTC)</p>
            <code className="block mt-1 break-all">{LTC_ADDRESS}</code>
          </div>
          <div className="w-full p-4 bg-white border rounded">
            <p className="font-semibold">Solana (SOL)</p>
            <code className="block mt-1 break-all">{SOL_ADDRESS}</code>
          </div>
          <div className="w-full p-4 bg-white border rounded">
            <p className="font-semibold">Dogecoin (DOGE)</p>
            <code className="block mt-1 break-all">{DOGE_ADDRESS}</code>
          </div>
          <div className="w-full p-4 bg-white border rounded">
            <p className="font-semibold">Tron (TRON)</p>
            <code className="block mt-1 break-all">{TRON_ADDRESS}</code>
          </div>
          <div className="w-full p-4 bg-white border rounded">
            <p className="font-semibold">BNB (BNB)</p>
            <code className="block mt-1 break-all">{BNB_ADDRESS}</code>
          </div>
          <div className="w-full p-4 bg-white border rounded">
            <p className="font-semibold">XRP (XRP)</p>
            <code className="block mt-1 break-all">{XRP_ADDRESS}</code>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Note: We recommend BTC, ETH, and USDC for broad support and stable value.
        </p>
      </div>
    </div>
  );
};
