import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useBlockMint } from '@/contexts/BlockMintContext';
import { AlertCircle, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAppKitAccount } from '@reown/appkit/react';
import { formatUnits, parseUnits } from 'viem';
import { useWriteContract } from 'wagmi';
import { decimalMultiplication } from '@/utils/common';
import { defineChain } from 'viem';
import { getRegister, useAddTransitionMutation, useSendRegisterMutation, useSendTransactionMutation } from '@/services/service';
// import { toast } from 'react-toastify';
import useUserState from '@/stores/user';
import { useDisableButtonByTime } from '@/hooks/useDisableButtonByTime';
import { IRegister, IRegisterPayload } from '@/types/types';
import { toast as ToastCus } from 'react-toastify';
import { StorageKeys } from '@/constants/storage-keys';
import { CookiesStorage } from '@/lib/cookie-storage';

import { parseEther } from "viem";
import { getPublicClient, getWalletClient, sendTransaction } from "wagmi/actions";
import { config } from '@/config';
import { ethers } from 'ethers';
import { estimateFeesPerGas, estimateGas } from 'viem/actions';

interface TransactionFormProps {
  selectedBlock?: string;
  setActiveTab: (v: string) => void;
}

const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");

const bsc = defineChain({
  id: 56,
  name: 'Binance Smart Chain',
  network: 'bsc',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: {
      http: ['https://bsc-dataseed.binance.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'BscScan',
      url: 'https://bscscan.com',
    },
  },
});

const switchToBSC = async () => {
  try {
    const ethereum = window.ethereum as any;
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x38' }], // BSC = 56 => 0x38
    });
  } catch (switchError: any) {
    // Nếu chain chưa được thêm
    if (switchError.code === 4902) {
      try {
        const ethereum = window.ethereum as any;
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x38',
            chainName: 'Binance Smart Chain',
            nativeCurrency: {
              name: 'BNB',
              symbol: 'BNB',
              decimals: 18,
            },
            rpcUrls: ['https://bsc-dataseed.binance.org/'],
            blockExplorerUrls: ['https://bscscan.com'],
          }],
        });
      } catch (addError) {
        console.error('Add BSC failed:', addError);
      }
    } else {
      console.error('Switch BSC failed:', switchError);
    }
  }
};


function hasTodayData(arr?: Array<IRegister>): boolean {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0]; // "2025-08-24"

  return arr.some(item => {
    const itemDate = new Date(item.createdAt).toISOString().split("T")[0];
    return itemDate === todayStr;
  });
}


const TransactionForm: React.FC<TransactionFormProps> = ({ selectedBlock, setActiveTab }) => {
  // console.log(selectedBlock, "selectedBlock")
  // const { wallet, systemWallet, createTransaction, isTransactionTime } = useBlockMint();
  const { toast } = useToast();
  const { address, isConnected } = useAppKitAccount();
  const addTransitionMutation = useAddTransitionMutation();
  const { userInfo, setTradeReg } = useUserState();
  const [fromWallet, setFromWallet] = useState<string>('');
  const [toAddress, setToAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [step, setStep] = useState<'form' | 'confirm' | 'success'>('form');
  const [isLoading, setIsLoading] = useState(false);
  const decimals = 4;
  const { writeContractAsync, isPending } = useWriteContract();
  const sendTransactionMutation = useSendTransactionMutation();
  const { isDisabled } = useDisableButtonByTime(7, 19);
  const [registerValue, setRegisterValue] = useState<Array<IRegister>>([]);
  // console.log(registerValue, "registerValue");
  // console.log(hasTodayData(registerValue));
  const sendRegisterMutation = useSendRegisterMutation();

  useEffect(() => {
    if (address) {
      setFromWallet(address);
      fetchFetchRegister(address);
    }
  }, [address])

  useEffect(() => {
    if (userInfo) {
      // console.log(userInfo, 'userInfo')
      setToAddress(userInfo.secondAddress)
    }
  }, [userInfo]);

  const fetchFetchRegister = async (value: string) => {
    const response = await getRegister({ address: value });
    // console.log(response, "response")
    if (response?.tradeReg?.length) {
      setRegisterValue(response?.tradeReg)
    }
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!selectedBlock) {
  //     toast({
  //       title: "No Block Selected",
  //       description: "Please select a block from the Block Explorer first.",
  //       variant: "destructive"
  //     });
  //     return;
  //   }

  //   if (!isTransactionTime) {
  //     toast({
  //       title: "Transaction Window Closed",
  //       description: "Transactions can only be made during 7-8 AM or 7-8 PM.",
  //       variant: "destructive"
  //     });
  //     return;
  //   }

  //   setStep('confirm');
  // };

  // const confirmTransaction = async () => {
  //   setIsLoading(true);
  //   try {
  //     await createTransaction(fromWallet, toAddress, parseFloat(amount), selectedBlock!);
  //     setStep('success');
  //     toast({
  //       title: "Transaction Successful",
  //       description: `Transaction of ${amount} BNB completed successfully. You'll receive 0.68% BM token reward.`
  //     });
  //   } catch (error) {
  //     toast({
  //       title: "Transaction Failed",
  //       description: error instanceof Error ? error.message : "An error occurred",
  //       variant: "destructive"
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const resetForm = () => {
    setFromWallet('');
    setToAddress('');
    setAmount('');
    setStep('form');
  };

  const handleRegister = () => {
    if (Number(amount) < 0.01) {
      toast({
        title: "Register Failed",
        description: "Value must be greater than 0.01",
        variant: "destructive"
      });
      return;
    }
    if (userInfo && selectedBlock) {
      const payload: IRegisterPayload = {
        address: userInfo.address,
        amount: Number(amount),
        block: Number(selectedBlock),
        r: userInfo.r,
        s: userInfo.s,
        v: userInfo.v
      }
      sendRegisterMutation.mutate(
        payload,
        {
          onSuccess: (res) => {
            // console.log(res?.tradeReg, "res?.tradeReg")
            ToastCus.success('Connect wallet success.', {
              position: 'top-right',
            });
            if (res?.tradeReg?.length) {
              setTradeReg(res.tradeReg[0]);
              CookiesStorage.setCookieData(StorageKeys.TradeReq, JSON.stringify(res.tradeReg[0]));
              setActiveTab("blocks")
              // setRegisterValue(prev => [...prev, ...res.tradeReg]);
            }
          }
        }
      )
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const onlyNumbers = e.target.value.replace(/\D/g, "");
    const raw = e.target.value;
    const onlyNumsAndDot = raw.replace(/[^0-9.]/g, "");
    const finalValue = onlyNumsAndDot.replace(/(\..*)\./g, "$1");
    setAmount(finalValue);
  };

  function calcFeeBNB(gasPriceWei, estimatedGas) {
    const feeWei = BigInt(gasPriceWei) * BigInt(estimatedGas);
    const feeBNB = Number(feeWei) / 1e18;
    return feeBNB;
  }

  const handleTranfer = async () => {
    // if (Number(amount) < 0.01) {
    //   toast({
    //     title: "Tranfer Failed",
    //     description: "Value must be greater than 0.01",
    //     variant: "destructive"
    //   });
    //   return;
    // }
    if (!isConnected || !/^0x[a-fA-F0-9]{40}$/.test(fromWallet)) {
      return;
    }
    await switchToBSC();
    // console.log(String(amount), "String(amount)")
    try {
      // const txHash = await writeContractAsync({
      //   account: address as `0x${string}`,
      //   chain: bsc, // ✅ BẮT BUỘC
      //   address: '0x55d398326f99059fF775485246999027B3197955' as `0x${string}`,
      //   abi: [
      //     {
      //       name: 'transfer',
      //       type: 'function',
      //       stateMutability: 'nonpayable',
      //       inputs: [
      //         { name: '_to', type: 'address' },
      //         { name: '_value', type: 'uint256' },
      //       ],
      //       outputs: [{ name: '', type: 'bool' }],
      //     },
      //   ],
      //   functionName: 'transfer',
      //   args: [
      //     toAddress as `0x${string}`,
      //     parseUnits(String(amount), decimalMultiplication()), 
      //   ],
      // });


      const publicClient = getPublicClient(config, { chainId: bsc.id });
      const walletClient = await getWalletClient(config, { chainId: bsc.id });
    
      const estimatedGas = await publicClient.estimateGas({
        account: address as `0x${string}`,
        to: toAddress as `0x${string}`,
        value: parseEther(String(amount)),
      });
    
      const gasPrice = await publicClient.getGasPrice();
    
      const feeWei = gasPrice * estimatedGas;
      const feeBNB = Number(formatUnits(feeWei, 18));

      console.log("Gas Estimate:", estimatedGas.toString());
      console.log("Gas Price:", formatUnits(gasPrice, 9), "gwei"); 
      console.log("Fee (BNB):", feeBNB);


      const txHash = await sendTransaction(config, {
        account: address as `0x${string}`,
        to: toAddress as `0x${string}`,
        value: parseEther(String(amount)), // số BNB gửi
        chainId: bsc.id,                   // BSC mainnet id = 56
        gas: estimatedGas,
        gasPrice: gasPrice,
      });
      if (txHash) {
        addTransitionMutation.mutate(
          {
            address,
            transaction: txHash
          },
          { 
            onSuccess: () => {
              toast({
                title: "Transaction Successful",
                description: `Transaction of ${amount} BNB completed successfully. You'll receive 0.68% BM token reward.`
              });
            },
            onError: error => {
              // console.log(error);
              toast({
                title: "Transaction Failed",
                description: "An error occurred",
                variant: "destructive"
              });
            }
          }
        )
      }
    } catch (error) {
      // console.log(error);
      toast({
        title: "Transaction Failed",
        description: "An error occurred",
        variant: "destructive"
      });
    }
  };

  if (!address && !isConnected) {
    return (
      <Card className="max-w-2xl mx-auto" data-id="dqga1a7dx" data-path="src/components/TransactionForm.tsx">
        <CardContent className="text-center py-12" data-id="foq5voo7m" data-path="src/components/TransactionForm.tsx">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" data-id="xlbrolaqz" data-path="src/components/TransactionForm.tsx" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2" data-id="kgjvngrb6" data-path="src/components/TransactionForm.tsx">Wallet Not Connected</h3>
          <p className="text-gray-500" data-id="vg8yd5g2x" data-path="src/components/TransactionForm.tsx">Please connect your wallet to create transactions.</p>
        </CardContent>
      </Card>);

  }

  if (step === 'success') {
    return (
      <Card className="max-w-2xl mx-auto" data-id="1kdpv9jum" data-path="src/components/TransactionForm.tsx">
        <CardContent className="text-center py-12" data-id="ogaefrudz" data-path="src/components/TransactionForm.tsx">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" data-id="ayss2n1cd" data-path="src/components/TransactionForm.tsx" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2" data-id="gossiuwee" data-path="src/components/TransactionForm.tsx">Transaction Completed!</h3>
          <p className="text-gray-500 mb-6" data-id="ted9fhkkx" data-path="src/components/TransactionForm.tsx">Your transaction has been processed successfully.</p>
          <Button onClick={resetForm} className="bg-gradient-to-r from-blue-600 to-purple-600" data-id="i3cy53b1p" data-path="src/components/TransactionForm.tsx">
            Create Another Transaction
          </Button>
        </CardContent>
      </Card>);

  }

  if (step === 'confirm') {
    return (
      <Card className="max-w-2xl mx-auto" data-id="hqy70ardc" data-path="src/components/TransactionForm.tsx">
        <CardHeader data-id="vv91e36vk" data-path="src/components/TransactionForm.tsx">
          <CardTitle className="text-center" data-id="jwg2v3j6r" data-path="src/components/TransactionForm.tsx">Confirm Transaction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6" data-id="sb3y6w99f" data-path="src/components/TransactionForm.tsx">
          <div className="bg-gray-50 p-4 rounded-lg space-y-3" data-id="9dui8v30g" data-path="src/components/TransactionForm.tsx">
            <div className="flex justify-between" data-id="r0kchh6d6" data-path="src/components/TransactionForm.tsx">
              <span className="font-medium" data-id="uvkc9xhv9" data-path="src/components/TransactionForm.tsx">Block Number:</span>
              <span className="font-mono" data-id="uss8hpkww" data-path="src/components/TransactionForm.tsx">{selectedBlock}</span>
            </div>
            <div className="flex justify-between" data-id="kgm2ub52o" data-path="src/components/TransactionForm.tsx">
              <span className="font-medium" data-id="szv2jq6kb" data-path="src/components/TransactionForm.tsx">From:</span>
              <span className="font-mono text-sm" data-id="kusc7fefx" data-path="src/components/TransactionForm.tsx">{fromWallet.slice(0, 8)}...{fromWallet.slice(-6)}</span>
            </div>
            <div className="flex justify-between" data-id="uov3b6siy" data-path="src/components/TransactionForm.tsx">
              <span className="font-medium" data-id="u6ix4hnk7" data-path="src/components/TransactionForm.tsx">To:</span>
              <span className="font-mono text-sm" data-id="n1sdnu2ip" data-path="src/components/TransactionForm.tsx">{toAddress.slice(0, 8)}...{toAddress.slice(-6)}</span>
            </div>
            <div className="flex justify-between" data-id="5bt3u21cv" data-path="src/components/TransactionForm.tsx">
              <span className="font-medium" data-id="m7ceg2gpt" data-path="src/components/TransactionForm.tsx">Amount:</span>
              <span data-id="8ph0ilc1u" data-path="src/components/TransactionForm.tsx">{amount} BNB</span>
            </div>
            <div className="flex justify-between" data-id="gn0xs40ux" data-path="src/components/TransactionForm.tsx">
              <span className="font-medium" data-id="e0gb7dco5" data-path="src/components/TransactionForm.tsx">Expected Reward:</span>
              <span className="text-green-600" data-id="i18vxtq1t" data-path="src/components/TransactionForm.tsx">{(parseFloat(amount) * 0.0068).toFixed(4)} BM</span>
            </div>
          </div>

          <div className="flex space-x-4" data-id="5yo3cgc56" data-path="src/components/TransactionForm.tsx">
            <Button
              variant="outline"
              onClick={() => setStep('form')}
              className="flex-1" data-id="uqojk0vzx" data-path="src/components/TransactionForm.tsx">

              Back to Edit
            </Button>
            <Button
              // onClick={confirmTransaction}
              onClick={handleTranfer}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600" data-id="8shtla36u" data-path="src/components/TransactionForm.tsx">

              {isLoading ? "Processing..." : "Confirm & Send"}
            </Button>
          </div>
        </CardContent>
      </Card>);

  }

  return (
    <div className="space-y-6" data-id="v2rozbpqe" data-path="src/components/TransactionForm.tsx">
      <div className="text-center mb-8" data-id="mgrkw7flx" data-path="src/components/TransactionForm.tsx">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4" data-id="krjv2wg5h" data-path="src/components/TransactionForm.tsx">
          Create Transaction
        </h1>
        {selectedBlock &&
          <Badge variant="secondary" className="text-lg px-4 py-2" data-id="h9qhp9dlv" data-path="src/components/TransactionForm.tsx">
            Selected Block: #{selectedBlock}
          </Badge>
        }
      </div>

      <Card className="max-w-2xl mx-auto" data-id="k7zele95q" data-path="src/components/TransactionForm.tsx">
        <CardHeader data-id="6sizzjkq5" data-path="src/components/TransactionForm.tsx">
          <CardTitle className="flex items-center" data-id="krkx70vsn" data-path="src/components/TransactionForm.tsx">
            <Send className="w-5 h-5 mr-2" data-id="59xibylgu" data-path="src/components/TransactionForm.tsx" />
            Transaction Details
          </CardTitle>
        </CardHeader>
        <CardContent data-id="ahquk4paq" data-path="src/components/TransactionForm.tsx">
          {/* <form onSubmit={handleSubmit} className="space-y-6" data-id="05p6tfiv2" data-path="src/components/TransactionForm.tsx"> */}
          <div className="space-y-2" data-id="t3zmkvl9i" data-path="src/components/TransactionForm.tsx">
            <Label htmlFor="fromWallet" data-id="bhqoauw50" data-path="src/components/TransactionForm.tsx">From Wallet</Label>
            <Select disabled value={fromWallet} onValueChange={setFromWallet} required data-id="rrvsmn3ld" data-path="src/components/TransactionForm.tsx">
              <SelectTrigger data-id="2o56ub674" data-path="src/components/TransactionForm.tsx">
                <SelectValue placeholder="Select sender wallet" data-id="q92rbx6w5" data-path="src/components/TransactionForm.tsx" />
              </SelectTrigger>
              <SelectContent data-id="yikb5wnvu" data-path="src/components/TransactionForm.tsx">
                <SelectItem value={address} data-id="wandes41u" data-path="src/components/TransactionForm.tsx">
                  Connected Wallet ({address.slice(0, 8)}...{address.slice(-6)})
                  {/* <Badge variant="outline" className="ml-2" data-id="tbk8p1i94" data-path="src/components/TransactionForm.tsx">Max: 100 USDT</Badge> */}
                </SelectItem>

                <SelectItem value={userInfo?.secondAddress} data-id="wandes41u" data-path="src/components/TransactionForm.tsx">
                  Connected General Wallet ({userInfo?.secondAddress.slice(0, 8)}...{userInfo?.secondAddress.slice(-6)})
                  <Badge variant="outline" className="ml-2" data-id="tbk8p1i94" data-path="src/components/TransactionForm.tsx">Max: 100 USDT</Badge>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2" data-id="f7na95ev6" data-path="src/components/TransactionForm.tsx">
            <Label htmlFor="toAddress" data-id="5d07kxyqc" data-path="src/components/TransactionForm.tsx">To Address</Label>
            <Input
              id="toAddress"
              type="text"
              placeholder="0x..."
              disabled
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              required
              className="font-mono" data-id="u54jok10s" data-path="src/components/TransactionForm.tsx" />

          </div>

          <div className="space-y-2" data-id="hz9tul1c4" data-path="src/components/TransactionForm.tsx">
            <Label htmlFor="amount" data-id="ias0dzrsn" data-path="src/components/TransactionForm.tsx">Amount (BNB)</Label>
            <Input
              id="amount"
              type="number"
              step="0.001"
              min="0.001"
              placeholder="0.0"
              value={amount}
              onChange={handleChange}
              required data-id="x45f0n2k7" data-path="src/components/TransactionForm.tsx" />

            {/* {fromWallet === wallet?.address &&
              <p className="text-sm text-orange-600" data-id="mas58qe4x" data-path="src/components/TransactionForm.tsx">
                  ⚠️ Connected wallet limited to 100 USDT per transaction
                </p>
              } */}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mt-4" data-id="8k488onbl" data-path="src/components/TransactionForm.tsx">
            <h4 className="font-semibold text-blue-800 mb-2" data-id="vgi0i8ajm" data-path="src/components/TransactionForm.tsx">Transaction Limits</h4>
            <ul className="text-sm text-blue-700 space-y-1" data-id="eu2ze3zww" data-path="src/components/TransactionForm.tsx">
              <li data-id="wilbr2t8t" data-path="src/components/TransactionForm.tsx">• Transaction registration time: 7:00 AM – 7:00 PM.</li>
              <li data-id="wilbr2t8t" data-path="src/components/TransactionForm.tsx">• From 7:00 PM – 8:00 PM, the system will verify the registration information.</li>
              <li data-id="wilbr2t8t" data-path="src/components/TransactionForm.tsx">• Transaction execution time: 8:00 PM – 7:00 AM.</li>
              <li data-id="wilbr2t8t" data-path="src/components/TransactionForm.tsx">• Reward: 1% – 1.5% of the total transaction volume, received directly in BM tokens.</li>
              <li data-id="wilbr2t8t" data-path="src/components/TransactionForm.tsx">• Maximum 10 transactions per day</li>
              {/* <li data-id="wilbr2t8t" data-path="src/components/TransactionForm.tsx">• Maximum 10 transactions per day</li> */}
              {/* <li data-id="97r63iigz" data-path="src/components/TransactionForm.tsx">• Trading windows: 7-8 AM and 7-8 PM only</li> */}
              {/* <li data-id="j274v0auw" data-path="src/components/TransactionForm.tsx">• Reward: 0.68% of transaction value in BM tokens</li> */}
              {/* <li data-id="4t4kn5b4a" data-path="src/components/TransactionForm.tsx">• BM tokens unlock gradually over 60 days</li> */}
            </ul>
          </div>

          <Button
            // type="submit"
            onClick={() => {
              // if (isDisabled) {
              //   if (!hasTodayData(registerValue)) {
              //     handleRegister()
              //   }
              // } else {
              //   handleTranfer()
              // }
              handleTranfer()
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 disabled:from-blue-300 disabled:to-purple-300 mt-4"
            disabled={Number(amount) > 0 ? false : hasTodayData(registerValue)}
            data-id="y516kwf8c"
            data-path="src/components/TransactionForm.tsx"
          >

            {isDisabled ? "Register" : "Trading Window Closed"}
          </Button>
          {/* </form> */}
        </CardContent>
      </Card>
    </div>);

};

export default TransactionForm;