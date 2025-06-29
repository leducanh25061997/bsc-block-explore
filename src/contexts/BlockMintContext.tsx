import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Wallet {
  address: string;
  type: 'connected' | 'system';
  bnbBalance: number;
}

export interface BMTokens {
  total: number;
  unlocked: number;
  locked: number;
}

export interface Transaction {
  id: string;
  blockNumber: string;
  from: string;
  to: string;
  amount: number;
  type: 'block' | 'swap' | 'withdraw';
  status: 'completed' | 'pending';
  timestamp: number;
  reward?: number;
}

export interface Block {
  number: string;
  hash: string;
  timestamp: number;
  transactions: number;
}

export interface MiningData {
  totalMined: number;
  miningRate: number;
  lastMined: number;
  dailyMiningCount: number;
}

export interface ReferralData {
  code: string;
  totalReferred: number;
  totalEarned: number;
  totalBMReceived: number;
  totalSwapped: number;
}

interface BlockMintContextType {
  wallet: Wallet | null;
  systemWallet: Wallet | null;
  bmTokens: BMTokens;
  transactions: Transaction[];
  blocks: Block[];
  mining: MiningData;
  referral: ReferralData;
  isTransactionTime: boolean;
  timeLeft: number;
  connectWallet: () => void;
  disconnectWallet: () => void;
  createTransaction: (from: string, to: string, amount: number, blockNumber: string) => Promise<boolean>;
  swapBNBToBM: (bnbAmount: number) => Promise<boolean>;
  swapBMToBNB: (bmAmount: number) => Promise<boolean>;
  withdrawBNB: (amount: number) => Promise<boolean>;
  performMining: () => void;
  buyBMTokens: (bnbAmount: number) => Promise<boolean>;
}

const BlockMintContext = createContext<BlockMintContextType | undefined>(undefined);

export const useBlockMint = () => {
  const context = useContext(BlockMintContext);
  if (!context) {
    throw new Error('useBlockMint must be used within a BlockMintProvider');
  }
  return context;
};

const generateRandomAddress = () => {
  return '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
};

const generateBlocks = (): Block[] => {
  const blocks: Block[] = [];
  for (let i = 0; i < 50; i++) {
    blocks.push({
      number: (35000000 + i).toString(),
      hash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      timestamp: Date.now() - i * 3000,
      transactions: Math.floor(Math.random() * 200) + 50
    });
  }
  return blocks;
};

const isInTransactionWindow = () => {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 7 && hour < 8 || hour >= 19 && hour < 20;
};

const getTimeUntilNextWindow = () => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  let nextWindow: Date;

  if (hour < 7) {
    // Before morning window
    nextWindow = new Date(now);
    nextWindow.setHours(7, 0, 0, 0);
  } else if (hour >= 7 && hour < 8) {
    // In morning window
    return 0;
  } else if (hour < 19) {
    // Between windows
    nextWindow = new Date(now);
    nextWindow.setHours(19, 0, 0, 0);
  } else if (hour >= 19 && hour < 20) {
    // In evening window
    return 0;
  } else {
    // After evening window
    nextWindow = new Date(now);
    nextWindow.setDate(now.getDate() + 1);
    nextWindow.setHours(7, 0, 0, 0);
  }

  return Math.max(0, nextWindow.getTime() - now.getTime());
};

export const BlockMintProvider: React.FC<{children: ReactNode;}> = ({ children }) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [systemWallet, setSystemWallet] = useState<Wallet | null>(null);
  const [bmTokens, setBmTokens] = useState<BMTokens>({ total: 0, unlocked: 0, locked: 0 });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [blocks] = useState<Block[]>(generateBlocks());
  const [mining, setMining] = useState<MiningData>({
    totalMined: 0,
    miningRate: 0.006,
    lastMined: Date.now(),
    dailyMiningCount: 0
  });
  const [referral] = useState<ReferralData>({
    code: 'BMT' + Math.random().toString(36).substr(2, 6).toUpperCase(),
    totalReferred: 0,
    totalEarned: 0,
    totalBMReceived: 0,
    totalSwapped: 0
  });
  const [isTransactionTime, setIsTransactionTime] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const updateTimeStatus = () => {
      setIsTransactionTime(isInTransactionWindow());
      setTimeLeft(getTimeUntilNextWindow());
    };

    updateTimeStatus();
    const interval = setInterval(updateTimeStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Auto-mining for system wallet
    if (systemWallet && bmTokens.total > 0) {
      const interval = setInterval(() => {
        setBmTokens((prev) => ({
          ...prev,
          locked: prev.locked + prev.total * 0.001 / 60 // 0.1% per hour
        }));
      }, 60000); // Every minute

      return () => clearInterval(interval);
    }
  }, [systemWallet, bmTokens.total]);

  useEffect(() => {
    // Unlock tokens gradually over 60 days
    const interval = setInterval(() => {
      setBmTokens((prev) => {
        if (prev.locked > 0) {
          const unlockAmount = prev.locked / (60 * 24 * 60); // Unlock over 60 days
          return {
            ...prev,
            locked: Math.max(0, prev.locked - unlockAmount),
            unlocked: prev.unlocked + Math.min(unlockAmount, prev.locked)
          };
        }
        return prev;
      });
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }, []);

  const connectWallet = () => {
    const newWallet: Wallet = {
      address: generateRandomAddress(),
      type: 'connected',
      bnbBalance: Math.random() * 10 + 1
    };

    const newSystemWallet: Wallet = {
      address: generateRandomAddress(),
      type: 'system',
      bnbBalance: 1000
    };

    setWallet(newWallet);
    setSystemWallet(newSystemWallet);
  };

  const disconnectWallet = () => {
    setWallet(null);
    setSystemWallet(null);
    setBmTokens({ total: 0, unlocked: 0, locked: 0 });
    setTransactions([]);
  };

  const createTransaction = async (from: string, to: string, amount: number, blockNumber: string): Promise<boolean> => {
    if (!isTransactionTime) {
      throw new Error('Transactions can only be made during 7-8 AM or 7-8 PM');
    }

    // Check daily transaction limit
    const today = new Date().setHours(0, 0, 0, 0);
    const todayTransactions = transactions.filter((tx) =>
    new Date(tx.timestamp).setHours(0, 0, 0, 0) === today
    );

    if (todayTransactions.length >= 10) {
      throw new Error('Daily transaction limit (10) exceeded');
    }

    // Check amount limits for connected wallet
    if (wallet && from === wallet.address && amount > 100) {
      throw new Error('Connected wallet transactions limited to 100 USDT');
    }

    const transaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      blockNumber,
      from,
      to,
      amount,
      type: 'block',
      status: 'completed',
      timestamp: Date.now(),
      reward: amount * 0.0068 // 0.68% reward
    };

    setTransactions((prev) => [transaction, ...prev]);

    // Add reward to locked BM tokens
    setBmTokens((prev) => ({
      ...prev,
      total: prev.total + transaction.reward!,
      locked: prev.locked + transaction.reward!
    }));

    // Update wallet balance if from system wallet
    if (systemWallet && from === systemWallet.address) {
      setSystemWallet((prev) => prev ? { ...prev, bnbBalance: prev.bnbBalance - amount } : null);
    }

    return true;
  };

  const swapBNBToBM = async (bnbAmount: number): Promise<boolean> => {
    if (!wallet || wallet.bnbBalance < bnbAmount) {
      throw new Error('Insufficient BNB balance');
    }

    const bmAmount = bnbAmount / 0.6; // 1 BM = 0.6 USDT

    const transaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      blockNumber: '',
      from: wallet.address,
      to: 'BM_TOKEN_CONTRACT',
      amount: bnbAmount,
      type: 'swap',
      status: 'completed',
      timestamp: Date.now()
    };

    setTransactions((prev) => [transaction, ...prev]);
    setWallet((prev) => prev ? { ...prev, bnbBalance: prev.bnbBalance - bnbAmount } : null);
    setBmTokens((prev) => ({
      ...prev,
      total: prev.total + bmAmount,
      unlocked: prev.unlocked + bmAmount
    }));

    return true;
  };

  const swapBMToBNB = async (bmAmount: number): Promise<boolean> => {
    if (bmTokens.unlocked < bmAmount) {
      throw new Error('Insufficient unlocked BM tokens');
    }

    const bnbAmount = bmAmount * 0.6; // 1 BM = 0.6 USDT

    const transaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      blockNumber: '',
      from: 'BM_TOKEN_CONTRACT',
      to: wallet?.address || '',
      amount: bnbAmount,
      type: 'swap',
      status: 'completed',
      timestamp: Date.now()
    };

    setTransactions((prev) => [transaction, ...prev]);
    setWallet((prev) => prev ? { ...prev, bnbBalance: prev.bnbBalance + bnbAmount } : null);
    setBmTokens((prev) => ({
      ...prev,
      unlocked: prev.unlocked - bmAmount
    }));

    return true;
  };

  const withdrawBNB = async (amount: number): Promise<boolean> => {
    if (!systemWallet || systemWallet.bnbBalance < amount) {
      throw new Error('Insufficient system wallet balance');
    }

    const transaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      blockNumber: '',
      from: systemWallet.address,
      to: wallet?.address || '',
      amount,
      type: 'withdraw',
      status: 'completed',
      timestamp: Date.now()
    };

    setTransactions((prev) => [transaction, ...prev]);
    setSystemWallet((prev) => prev ? { ...prev, bnbBalance: prev.bnbBalance - amount } : null);
    setWallet((prev) => prev ? { ...prev, bnbBalance: prev.bnbBalance + amount } : null);

    return true;
  };

  const performMining = () => {
    const now = Date.now();
    const hour = new Date().getHours();

    if (!(hour >= 7 && hour < 8 || hour >= 19 && hour < 20)) {
      throw new Error('Mining only available during 7-8 AM or 7-8 PM');
    }

    if (mining.dailyMiningCount >= 2) {
      throw new Error('Daily mining limit reached (2 times)');
    }

    const minedAmount = mining.miningRate;

    setMining((prev) => ({
      ...prev,
      totalMined: prev.totalMined + minedAmount,
      lastMined: now,
      dailyMiningCount: prev.dailyMiningCount + 1
    }));

    setBmTokens((prev) => ({
      ...prev,
      total: prev.total + minedAmount,
      locked: prev.locked + minedAmount
    }));
  };

  const buyBMTokens = async (bnbAmount: number): Promise<boolean> => {
    return swapBNBToBM(bnbAmount);
  };

  const value: BlockMintContextType = {
    wallet,
    systemWallet,
    bmTokens,
    transactions,
    blocks,
    mining,
    referral,
    isTransactionTime,
    timeLeft,
    connectWallet,
    disconnectWallet,
    createTransaction,
    swapBNBToBM,
    swapBMToBNB,
    withdrawBNB,
    performMining,
    buyBMTokens
  };

  return (
    <BlockMintContext.Provider value={value} data-id="ajl3nuw9z" data-path="src/contexts/BlockMintContext.tsx">
      {children}
    </BlockMintContext.Provider>);

};