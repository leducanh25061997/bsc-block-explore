import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BlockMintProvider } from './contexts/BlockMintContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BlockExplorer from './components/BlockExplorer';
import TransactionForm from './components/TransactionForm';
import WalletDashboard from './components/WalletDashboard';
import Mining from './components/Mining';
import SwapInterface from './components/SwapInterface';
import ReferralSystem from './components/ReferralSystem';
import Statistics from './components/Statistics';
import { ToastContainer } from 'react-toastify';

// Web3
import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { metadata, networks, projectId, wagmiAdapter } from './config';
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
  const [selectedBlock, setSelectedBlock] = useState<string | undefined>();

  const handleSelectBlock = (blockNumber: string) => {
    setSelectedBlock(blockNumber);
    setActiveTab('transaction');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'blocks':
        return <BlockExplorer onSelectBlock={handleSelectBlock} data-id="sbmvcyc5y" data-path="src/App.tsx" />;
      case 'transaction':
        return <TransactionForm selectedBlock={selectedBlock} data-id="kd9ov61g3" data-path="src/App.tsx" />;
      case 'wallet':
        return <WalletDashboard data-id="razaddntj" data-path="src/App.tsx" />;
      case 'mining':
        return <Mining data-id="ra5yrtjq6" data-path="src/App.tsx" />;
      case 'swap':
        return <SwapInterface data-id="dcu4brejj" data-path="src/App.tsx" />;
      case 'referral':
        return <ReferralSystem data-id="6zvrpvzvw" data-path="src/App.tsx" />;
      case 'statistics':
        return <Statistics data-id="8f43xq71s" data-path="src/App.tsx" />;
      default:
        return <BlockExplorer onSelectBlock={handleSelectBlock} data-id="ivtk0u7l6" data-path="src/App.tsx" />;
    }
  };

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient} data-id="1qvn1tzwc" data-path="src/App.tsx">
        <TooltipProvider data-id="j3oaek9sy" data-path="src/App.tsx">
          <BlockMintProvider data-id="sgtwh45pe" data-path="src/App.tsx">
            <div className="min-h-screen bg-gray-50" data-id="i90ojjoc1" data-path="src/App.tsx">
              <Header data-id="sz6rd0nns" data-path="src/App.tsx" />
              <div className="flex" data-id="i1avv64bb" data-path="src/App.tsx">
                <Sidebar activeTab={activeTab} onTabChange={setActiveTab} data-id="sj9d2u7u0" data-path="src/App.tsx" />
                <main className="flex-1 p-6 overflow-y-auto" data-id="j3qbmx7az" data-path="src/App.tsx">
                  {renderContent()}
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