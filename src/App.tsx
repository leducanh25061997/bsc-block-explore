import React, { useEffect, useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BlockMintProvider } from './contexts/BlockMintContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
// import BlockExplorer from './components/BlockExplorer';
// import TransactionForm from './components/TransactionForm';
// import WalletDashboard from './components/WalletDashboard';
// import Mining from './components/Mining';
// import SwapInterface from './components/SwapInterface';
// import ReferralSystem from './components/ReferralSystem';
// import Statistics from './components/Statistics';
import { ToastContainer } from 'react-toastify';
// import { useWriteContract } from "wagmi";
// import { parseUnits } from 'viem';
// import { useAppKitAccount } from '@reown/appkit/react';
// Web3
import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { metadata, networks, projectId, wagmiAdapter } from './config';
import { mainnet } from 'viem/chains';
import Home from './pages/Home';
import { IBlock } from './types/types';
import { getBlocks } from './services/service';
const generalConfig = {
  projectId,
  networks,
  metadata,
  themeMode: 'light' as const,
  themeVariables: {
    '--w3m-accent': '#000000'
  }
};

createAppKit({
  adapters: [wagmiAdapter],
  ...generalConfig,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

const queryClient = new QueryClient();

const App = () => {
  const [activeTab, setActiveTab] = useState('blocks');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<string>("");
  const [blocks, setBlocks] = useState<Array<IBlock>>([]);

  useEffect(() => {
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    const response = await getBlocks();
    console.log(response)
    if (response?.blocks?.length) {
      setBlocks(response?.blocks);
    }
  }

  const handleActivedTab = (v: string, type?: "REDIRECT" | "SIDEBAR") => {
    setActiveTab(v);

    if (type === "SIDEBAR" && v === 'transaction') {
      const randomIndex = Math.floor(Math.random() * blocks.length);
      console.log(blocks[randomIndex].hash, "blocks[randomIndex].hash")
      setSelectedBlock(blocks[randomIndex].number)
    }
  }

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient} data-id="1qvn1tzwc" data-path="src/App.tsx">
        <TooltipProvider data-id="j3oaek9sy" data-path="src/App.tsx">
          <BlockMintProvider data-id="sgtwh45pe" data-path="src/App.tsx">
            <div className="min-h-screen bg-gray-50" data-id="i90ojjoc1" data-path="src/App.tsx">
              <Header data-id="sz6rd0nns" data-path="src/App.tsx" activeTab={activeTab} onTabChange={(v) => handleActivedTab(v, "SIDEBAR")} />
              <div className="flex" data-id="i1avv64bb" data-path="src/App.tsx">
                <div className='hidden md:flex'>
                  <Sidebar activeTab={activeTab} onTabChange={(v) => handleActivedTab(v, "SIDEBAR")} data-id="sj9d2u7u0" data-path="src/App.tsx" />
                </div>     
                <main className="flex-1 p-6 overflow-y-auto" data-id="j3qbmx7az" data-path="src/App.tsx">
                  {/* {renderContent()} */}
                  <Home 
                    blocks={blocks}
                    activeTab={activeTab} 
                    setActiveTab={handleActivedTab} 
                    selectedBlock={selectedBlock}
                    setSelectedBlock={setSelectedBlock}
                  />
                </main>
              </div>
            </div>
            <Toaster data-id="nj9s2b6ty" data-path="src/App.tsx" />
            <ToastContainer />
          </BlockMintProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;