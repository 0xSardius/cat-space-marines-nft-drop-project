"use client";

import Image from "next/image";
import { ConnectButton, useReadContract } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "./client";
import { defineChain, getContract, toEther } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { getContractMetadata } from "thirdweb/extensions/common";
import { getTotalClaimedSupply } from "thirdweb/extensions/erc721";
import { nextTokenIdToMint } from "thirdweb/extensions/erc721";
import { getActiveClaimCondition } from "thirdweb/extensions/erc721";

export default function Home() {
  // Easy define chains with thirdweb
  const chain = defineChain(baseSepolia);

  // Thirdweb contract wrapper
  const contract = getContract({
    client: client,
    chain: chain,
    address: "0xe6C5502b816f1Bc938cd5858975831b19002E666",
  });

  const { data: contractMetadata } = useReadContract(getContractMetadata, {
    contract: contract,
  });

  const { data: claimedSupply } = useReadContract(getTotalClaimedSupply, {
    contract: contract,
  });

  const { data: totalNFTSupply } = useReadContract(nextTokenIdToMint, {
    contract: contract,
  });

  const { data: claimCondition } = useReadContract(getActiveClaimCondition, {
    contract: contract,
  });

  const getPrice = (quantity: number) => {
    const total =
      quantity * parseInt(claimCondition?.pricePerToken.toString() || "0");
    return toEther(BigInt(total));
  };

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20 text-center">
        <Header />
        <ConnectButton client={client} chain={chain} />
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-row items-center">
      <Image
        src={thirdwebIcon}
        alt=""
        className="size-[150px] md:size-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      />

      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        Felis Catus Space Marines
      </h1>
    </header>
  );
}
