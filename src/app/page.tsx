'use client'

import { chains, projectId } from "@/config";
import { WalletClientSigner } from "@alchemy/aa-core";
import { useEffect, useState } from "react";
import { createWalletClient, custom } from "viem";
import { useAccount } from "wagmi";
import { AlchemySigner, AlchemySmartAccountClient, createModularAccountAlchemyClient } from '@alchemy/aa-alchemy'
import SmartAccountWalletUI from "@/pages/SmartAccountWallet";


export default function Home() {
  
  const apikey = process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_KEY
  const idx = projectId

  

  
  return (
    <main className="flex items-center justify-between p-24 grid grid-rows-1">
      
      <SmartAccountWalletUI/>
    </main>
  );
}
