import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBlockMint } from '@/contexts/BlockMintContext';
import { Wallet, Lock, Unlock, TrendingUp, History, Download, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAppKitAccount, useAppKitBalance } from '@reown/appkit/react';
import useUserState from '@/stores/user';
import { ethers } from "ethers";
import { getHistory, useGetHistoryMutation, useSendTransactionMutation } from '@/services/service';
import { IHistories, ISendTransaction } from '@/types/types';
import { toast as ToastCus } from 'react-toastify';
import { Modal } from './ui/modal';
import { ModalWidthDraw } from './ModalWidthDraw';
interface WalletDashboardProps {
  balance?: any;
}

const WalletDashboard: React.FC<WalletDashboardProps> = ({ balance }) => {
  const {
    wallet,
    systemWallet,
    bmTokens,
    transactions,
    withdrawBNB
  } = useBlockMint();
  const { toast } = useToast();
  const { address, isConnected } = useAppKitAccount();
  const { userInfo } = useUserState();
  const [gereralBalance, setGereralBalance] = useState<any>(0)
  const [isModal, setIsModal] = useState<boolean>(false);
  const [histories, setHistories] = useState<Array<IHistories>>([]);
  console.log(histories, "histories")

  // Sử dụng URL của một node BSC công khai
  const bscProviderUrl = "https://bsc-dataseed.binance.org/";
  // const { data: histories } = useGetHistoryMutation({ address });
  // console.log(histories, 'histories')

  const provider = new ethers.JsonRpcProvider(bscProviderUrl);

  useEffect(() => {
    if (userInfo?.secondAddress) {
      fetchHistories(userInfo?.address);
      getBnbBalance(userInfo?.secondAddress);
    }
  }, [userInfo]);

  const fetchHistories = async (_address: string, type?: string) => {
    const data = await getHistory({ address: _address, type });
    console.log(data, 'data');
    setHistories(data.histories);
  }

  async function getBnbBalance(walletAddress: string) {
    try {
      const balance = await provider.getBalance(walletAddress);
      // Chuyển đổi từ wei sang BNB
      const balanceInBnb = ethers.formatEther(balance);
      setGereralBalance(balanceInBnb);
      console.log(`Số dư BNB của ví ${walletAddress} là: ${balanceInBnb} BNB`);
    } catch (error) {
      console.error("Lỗi khi lấy số dư BNB:", error);
    }
  }

  const handleWithdraw = async () => {
    if (!systemWallet) return;

    try {
      await withdrawBNB(systemWallet.bnbBalance);
      toast({
        title: "Withdrawal Successful",
        description: "BNB transferred to your connected wallet."
      });
    } catch (error) {
      toast({
        title: "Withdrawal Failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'block': return 'bg-blue-100 text-blue-800';
      case 'swap to BM': return 'bg-green-100 text-green-800';
      case 'withdraw': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCopyText = async (addressWallet: string) => {
    try {
      await navigator.clipboard.writeText(addressWallet);
      toast({
        title: "Copy address Successful",
      });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  if (!address && !isConnected) {
    return (
      <Card className="max-w-4xl mx-auto" data-id="uhlu7j5dw" data-path="src/components/WalletDashboard.tsx">
        <CardContent className="text-center py-12" data-id="ldt7le6xd" data-path="src/components/WalletDashboard.tsx">
          <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" data-id="k8o6ok2pu" data-path="src/components/WalletDashboard.tsx" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2" data-id="vm67aia08" data-path="src/components/WalletDashboard.tsx">No Wallet Connected</h3>
          <p className="text-gray-500" data-id="ttiljalyy" data-path="src/components/WalletDashboard.tsx">Please connect your wallet to view your dashboard.</p>
        </CardContent>
      </Card>);

  }

  return (
    <div className="space-y-6" data-id="j5bjchnfn" data-path="src/components/WalletDashboard.tsx">
      <div className="text-center mb-8" data-id="x6lhbi52w" data-path="src/components/WalletDashboard.tsx">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4" data-id="i4in6j4ra" data-path="src/components/WalletDashboard.tsx">
          My Wallet
        </h1>
        <p className="text-gray-600" data-id="wicl8qv80" data-path="src/components/WalletDashboard.tsx">Manage your wallets and track your BM token earnings</p>
      </div>

      {/* Wallet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-id="nhixvoqlj" data-path="src/components/WalletDashboard.tsx">
        <Card data-id="9lmk7rqc1" data-path="src/components/WalletDashboard.tsx">
          <CardHeader data-id="3wo90qygm" data-path="src/components/WalletDashboard.tsx">
            <CardTitle className="flex items-center" data-id="smn68iz7i" data-path="src/components/WalletDashboard.tsx">
              <Wallet className="w-5 h-5 mr-2" data-id="qkbgk959f" data-path="src/components/WalletDashboard.tsx" />
              Connected Wallet
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3" data-id="0mjv95ywr" data-path="src/components/WalletDashboard.tsx">
            <div className="hidden md:flex justify-between items-center font-mono text-sm bg-gray-100 p-2 rounded" data-id="d0o81tjz5" data-path="src/components/WalletDashboard.tsx">
              {address}
              <button
                onClick={() => handleCopyText(address)}
              >
                <Copy />
              </button>
            </div>
            <div className="flex justify-between items-center md:hidden font-mono text-sm bg-gray-100 p-2 rounded" data-id="d0o81tjz5" data-path="src/components/WalletDashboard.tsx">
              {address.slice(0, 6)}...{address.slice(-4)}
              <button
                onClick={() => handleCopyText(address)}
              >
                <Copy />
              </button>
            </div>
            <div className="flex justify-between items-center" data-id="vxopocere" data-path="src/components/WalletDashboard.tsx">
              <span data-id="59rewfglk" data-path="src/components/WalletDashboard.tsx">BNB Balance:</span>
              <span className="font-semibold" data-id="ff7mwiyuy" data-path="src/components/WalletDashboard.tsx">{balance?.data?.balance ? Number(balance?.data?.balance).toFixed(4) : 0} BNB</span>
            </div>
            {/* <Badge variant="outline" className="w-full justify-center" data-id="urvjq7z8a" data-path="src/components/WalletDashboard.tsx">
              Transaction Limit: 100 USDT
            </Badge> */}
          </CardContent>
        </Card>

        <Card data-id="9lmk7rqc1" data-path="src/components/WalletDashboard.tsx">
          <CardHeader data-id="3wo90qygm" data-path="src/components/WalletDashboard.tsx">
            <div className='flex justify-between'>
              <CardTitle className="flex items-center" data-id="smn68iz7i" data-path="src/components/WalletDashboard.tsx">
                <Wallet className="w-5 h-5 mr-2" data-id="qkbgk959f" data-path="src/components/WalletDashboard.tsx" />
                General Wallet
              </CardTitle>
              <Button
                // onClick={handleWithdrawMoney}
                onClick={() => setIsModal(true)}
                // disabled={!isTransactionTime || mining.dailyMiningCount >= 2}
                className="px-8 bg-gradient-to-r from-blue-600 to-purple-600" data-id="z8q547rev" data-path="src/components/Mining.tsx">
                {"Withdraw"}
              </Button>
            </div>

          </CardHeader>
          <CardContent className="space-y-3" data-id="0mjv95ywr" data-path="src/components/WalletDashboard.tsx">
            <div className="hidden md:flex justify-between items-center font-mono text-sm bg-gray-100 p-2 rounded" data-id="d0o81tjz5" data-path="src/components/WalletDashboard.tsx">
              {userInfo?.secondAddress}
              <button
                onClick={() => handleCopyText(userInfo?.secondAddress)}
              >
                <Copy />
              </button>
            </div>
            <div className="flex justify-between items-center md:hidden font-mono text-sm bg-gray-100 p-2 rounded" data-id="d0o81tjz5" data-path="src/components/WalletDashboard.tsx">
              {userInfo?.secondAddress.slice(0, 6)}...{userInfo?.secondAddress.slice(-4)}
              <button
                onClick={() => handleCopyText(userInfo?.secondAddress)}
              >
                <Copy />
              </button>
            </div>
            {/* <div className="font-mono text-sm bg-gray-100 p-2 rounded" data-id="d0o81tjz5" data-path="src/components/WalletDashboard.tsx">
              {userInfo?.secondAddress}
            </div> */}
            <div className="flex justify-between items-center" data-id="vxopocere" data-path="src/components/WalletDashboard.tsx">
              <span data-id="59rewfglk" data-path="src/components/WalletDashboard.tsx">BNB Balance:</span>
              <span className="font-semibold" data-id="ff7mwiyuy" data-path="src/components/WalletDashboard.tsx">{gereralBalance} BNB</span>
            </div>
            {/* <Badge variant="outline" className="w-full justify-center" data-id="urvjq7z8a" data-path="src/components/WalletDashboard.tsx">
              Transaction Limit: 100 USDT
              Unlimitted
            </Badge> */}
          </CardContent>
        </Card>

        {systemWallet &&
          <Card data-id="0rlyp41p9" data-path="src/components/WalletDashboard.tsx">
            <CardHeader data-id="7s5evvxom" data-path="src/components/WalletDashboard.tsx">
              <CardTitle className="flex items-center" data-id="hfbqu6dna" data-path="src/components/WalletDashboard.tsx">
                <TrendingUp className="w-5 h-5 mr-2" data-id="1man9nknp" data-path="src/components/WalletDashboard.tsx" />
                System Wallet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3" data-id="0gzxc3y0f" data-path="src/components/WalletDashboard.tsx">
              <div className="font-mono text-sm bg-gray-100 p-2 rounded" data-id="zaz4m1090" data-path="src/components/WalletDashboard.tsx">
                {systemWallet.address}
              </div>
              <div className="flex justify-between items-center" data-id="fblmempa2" data-path="src/components/WalletDashboard.tsx">
                <span data-id="hogpiqumk" data-path="src/components/WalletDashboard.tsx">BNB Balance:</span>
                <span className="font-semibold" data-id="n9rvqmfv7" data-path="src/components/WalletDashboard.tsx">{systemWallet.bnbBalance.toFixed(4)} BNB</span>
              </div>
              <Button
                onClick={handleWithdraw}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600"
                disabled={systemWallet.bnbBalance === 0} data-id="99mmzsqyj" data-path="src/components/WalletDashboard.tsx">

                <Download className="w-4 h-4 mr-2" data-id="w98als2x1" data-path="src/components/WalletDashboard.tsx" />
                Withdraw to Connected Wallet
              </Button>
            </CardContent>
          </Card>
        }
      </div>

      {/* BM Token Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-id="cg1pbj7jm" data-path="src/components/WalletDashboard.tsx">
        <Card data-id="61afjbgrm" data-path="src/components/WalletDashboard.tsx">
          <CardHeader data-id="tfbvdobjv" data-path="src/components/WalletDashboard.tsx">
            <CardTitle className="flex items-center" data-id="4hy5awwfw" data-path="src/components/WalletDashboard.tsx">
              <TrendingUp className="w-5 h-5 mr-2" data-id="zvjwql4py" data-path="src/components/WalletDashboard.tsx" />
              Total BM Tokens
            </CardTitle>
          </CardHeader>
          <CardContent data-id="a4kzgb9z2" data-path="src/components/WalletDashboard.tsx">
            <div className="text-3xl font-bold text-blue-600" data-id="tediqjmu5" data-path="src/components/WalletDashboard.tsx">
              {userInfo?.coin?.toFixed(6)}
            </div>
            <p className="text-sm text-gray-500 mt-1" data-id="nis60iwjl" data-path="src/components/WalletDashboard.tsx">Total earned BM tokens</p>
          </CardContent>
        </Card>

        <Card data-id="ipha195fi" data-path="src/components/WalletDashboard.tsx">
          <CardHeader data-id="8aai1gr7d" data-path="src/components/WalletDashboard.tsx">
            <CardTitle className="flex items-center" data-id="03rjgazqz" data-path="src/components/WalletDashboard.tsx">
              <Unlock className="w-5 h-5 mr-2 text-green-600" data-id="dp9satqhk" data-path="src/components/WalletDashboard.tsx" />
              Unlocked BM
            </CardTitle>
          </CardHeader>
          <CardContent data-id="pvrp5wkfb" data-path="src/components/WalletDashboard.tsx">
            <div className="text-3xl font-bold text-green-600" data-id="m8usadu39" data-path="src/components/WalletDashboard.tsx">
              {((userInfo?.coin || 0) - (userInfo?.coinLock || 0)).toFixed(6)}
            </div>
            <p className="text-sm text-gray-500 mt-1" data-id="fvuyddky8" data-path="src/components/WalletDashboard.tsx">Available for trading</p>
          </CardContent>
        </Card>

        <Card data-id="7ski3438x" data-path="src/components/WalletDashboard.tsx">
          <CardHeader data-id="fwe8j20ou" data-path="src/components/WalletDashboard.tsx">
            <CardTitle className="flex items-center" data-id="iihbkhfel" data-path="src/components/WalletDashboard.tsx">
              <Lock className="w-5 h-5 mr-2 text-orange-600" data-id="04fmycdtz" data-path="src/components/WalletDashboard.tsx" />
              Locked BM
            </CardTitle>
          </CardHeader>
          <CardContent data-id="wv1t9ecmb" data-path="src/components/WalletDashboard.tsx">
            <div className="text-3xl font-bold text-orange-600" data-id="m7bxao2ua" data-path="src/components/WalletDashboard.tsx">
              {userInfo?.coinLock || 0}
            </div>
            <p className="text-sm text-gray-500 mt-1" data-id="b41dskuhl" data-path="src/components/WalletDashboard.tsx">Unlocking over 60 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card data-id="8kt9sdmsx" data-path="src/components/WalletDashboard.tsx">
        <CardHeader data-id="9gnzeedum" data-path="src/components/WalletDashboard.tsx">
          <CardTitle className="flex items-center" data-id="6uggijknd" data-path="src/components/WalletDashboard.tsx">
            <History className="w-5 h-5 mr-2" data-id="m9ikl169q" data-path="src/components/WalletDashboard.tsx" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent data-id="q9b67au6u" data-path="src/components/WalletDashboard.tsx">
          <Tabs defaultValue="all" onValueChange={v => fetchHistories(address, v === 'all' ? '' : v)} className="w-full" data-id="eg4bq56zb" data-path="src/components/WalletDashboard.tsx">
            <TabsList className="grid w-full grid-cols-4" data-id="we8vkxf6s" data-path="src/components/WalletDashboard.tsx">
              <TabsTrigger value="all" data-id="ea4facbwo" data-path="src/components/WalletDashboard.tsx">All</TabsTrigger>
              <TabsTrigger value="transaction" data-id="azqb7mq3d" data-path="src/components/WalletDashboard.tsx">Block Transactions</TabsTrigger>
              <TabsTrigger value="swap" data-id="saqjhsiuj" data-path="src/components/WalletDashboard.tsx">Swaps</TabsTrigger>
              <TabsTrigger value="withdraw" data-id="decqu8597" data-path="src/components/WalletDashboard.tsx">Withdrawals</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4" data-id="mzi20v242" data-path="src/components/WalletDashboard.tsx">
              {histories.length === 0 ?
                <div className="text-center py-8 text-gray-500" data-id="mfxmuwfqu" data-path="src/components/WalletDashboard.tsx">
                  No transactions yet
                </div> :

                <div className="space-y-3" data-id="mbp3ihnp4" data-path="src/components/WalletDashboard.tsx">
                  {histories.map((history) =>
                    <div key={history._id} className="flex items-center justify-between p-4 border rounded-lg" data-id="92i5b7c3e" data-path="src/components/WalletDashboard.tsx">
                      <div className="flex-1" data-id="p5xv4gh8d" data-path="src/components/WalletDashboard.tsx">
                        <div className="flex items-center space-x-2 mb-1" data-id="tkq5ytddm" data-path="src/components/WalletDashboard.tsx">
                          <Badge className={getTransactionTypeColor(history.typeData)} data-id="38kjhkgt7" data-path="src/components/WalletDashboard.tsx">
                            {history.typeData.toUpperCase()}
                          </Badge>
                          {/* {history.blockNumber &&
                            <span className="text-sm text-gray-500" data-id="r5cnfbpme" data-path="src/components/WalletDashboard.tsx">Block #{tx.blockNumber}</span>
                          } */}
                        </div>
                        {/* <div className="text-sm text-gray-600" data-id="i6plvmdtk" data-path="src/components/WalletDashboard.tsx">
                          From: {history.from.slice(0, 8)}...{history.from.slice(-6)} →
                          To: {history.to.slice(0, 8)}...{history.to.slice(-6)}
                        </div> */}
                        <div className="text-xs text-gray-500" data-id="p8qwqdc11" data-path="src/components/WalletDashboard.tsx">
                          {formatTimestamp(history.timeCollect)}
                        </div>
                      </div>
                      <div className="text-right" data-id="k1eq91rb1" data-path="src/components/WalletDashboard.tsx">
                        <div className="font-semibold" data-id="wwnr7vscm" data-path="src/components/WalletDashboard.tsx">
                          {history.amount.toFixed(4)} {history.typeData === 'swap' && history?.from === address ? 'BNB' : 'BNB'}
                        </div>
                        {history.amount &&
                          <div className="text-sm text-green-600" data-id="vvxn2mzsf" data-path="src/components/WalletDashboard.tsx">
                            +{history.amount.toFixed(4)} BM reward
                          </div>
                        }
                      </div>
                    </div>
                  )}
                </div>
              }
            </TabsContent>

            <TabsContent value="transaction" data-id="1qgwben62" data-path="src/components/WalletDashboard.tsx">
              <div className="space-y-3" data-id="ycqyetoit" data-path="src/components/WalletDashboard.tsx">
                {histories.map((tx) =>
                  <div key={tx._id} className="flex items-center justify-between p-4 border rounded-lg" data-id="znkr1lmth" data-path="src/components/WalletDashboard.tsx">
                    <div className="flex-1" data-id="83zvggsko" data-path="src/components/WalletDashboard.tsx">
                      <div className="flex items-center space-x-2 mb-1" data-id="16728lu3x" data-path="src/components/WalletDashboard.tsx">
                        <Badge className="bg-blue-100 text-blue-800" data-id="m9gr285xm" data-path="src/components/WalletDashboard.tsx">BLOCK TRANSACTION</Badge>
                        <span className="text-sm text-gray-500" data-id="bp4842s3b" data-path="src/components/WalletDashboard.tsx">Block #{tx.blockNumber}</span>
                      </div>
                      {/* <div className="text-sm text-gray-600" data-id="hcisto5e3" data-path="src/components/WalletDashboard.tsx">
                        {tx.from.slice(0, 8)}...{tx.from.slice(-6)} → {tx.to.slice(0, 8)}...{tx.to.slice(-6)}
                      </div> */}
                      <div className="text-xs text-gray-500" data-id="nfnjpdc2x" data-path="src/components/WalletDashboard.tsx">
                        {formatTimestamp(tx.timeCollect)}
                      </div>
                    </div>
                    <div className="text-right" data-id="egg2p48st" data-path="src/components/WalletDashboard.tsx">
                      <div className="font-semibold" data-id="3hgay3r37" data-path="src/components/WalletDashboard.tsx">{tx.amount.toFixed(4)} BNB</div>
                      <div className="text-sm text-green-600" data-id="7piw4f4hd" data-path="src/components/WalletDashboard.tsx">
                        +{tx.amount?.toFixed(4)} BM reward
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="swap" data-id="67ilx7v31" data-path="src/components/WalletDashboard.tsx">
              <div className="space-y-3" data-id="h5df3wtsg" data-path="src/components/WalletDashboard.tsx">
                {histories.filter((tx) => tx.typeData === 'swap to BM').map((tx) =>
                  <div key={tx._id} className="flex items-center justify-between p-4 border rounded-lg" data-id="zlc93q3dm" data-path="src/components/WalletDashboard.tsx">
                    <div className="flex-1" data-id="utm4momr9" data-path="src/components/WalletDashboard.tsx">
                      <Badge className="bg-green-100 text-green-800 mb-2" data-id="6zmitrejf" data-path="src/components/WalletDashboard.tsx">SWAP</Badge>
                      <div className="text-sm text-gray-600" data-id="2bdta3b3n" data-path="src/components/WalletDashboard.tsx">
                        {tx.from === address ? 'BNB → BM' : 'BM → BNB'}
                      </div>
                      <div className="text-xs text-gray-500" data-id="c4c03eox4" data-path="src/components/WalletDashboard.tsx">
                        {formatTimestamp(tx.timeCollect)}
                      </div>
                    </div>
                    <div className="text-right" data-id="qvnhu8xk1" data-path="src/components/WalletDashboard.tsx">
                      <div className="font-semibold" data-id="p5uyzrqze" data-path="src/components/WalletDashboard.tsx">{tx.amount.toFixed(4)} BNB</div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="withdraw" data-id="f9fge4lwe" data-path="src/components/WalletDashboard.tsx">
              <div className="space-y-3" data-id="ta5kp69m9" data-path="src/components/WalletDashboard.tsx">
                {histories.filter((tx) => tx.typeData === 'withdraw').map((tx) =>
                  <div key={tx._id} className="flex items-center justify-between p-4 border rounded-lg" data-id="2ef92afpv" data-path="src/components/WalletDashboard.tsx">
                    <div className="flex-1" data-id="px7ksmkb8" data-path="src/components/WalletDashboard.tsx">
                      <Badge className="bg-purple-100 text-purple-800 mb-2" data-id="07zhls2bv" data-path="src/components/WalletDashboard.tsx">WITHDRAWAL</Badge>
                      <div className="text-sm text-gray-600" data-id="qn42yt6fa" data-path="src/components/WalletDashboard.tsx">
                        System → Connected Wallet
                      </div>
                      <div className="text-xs text-gray-500" data-id="k5q190sk1" data-path="src/components/WalletDashboard.tsx">
                        {formatTimestamp(tx.timeCollect)}
                      </div>
                    </div>
                    <div className="text-right" data-id="3240zgcvy" data-path="src/components/WalletDashboard.tsx">
                      <div className="font-semibold" data-id="1yn5s2her" data-path="src/components/WalletDashboard.tsx">{tx.amount.toFixed(4)} BNB</div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <Modal
        isOpen={isModal}
        onClose={() => setIsModal(false)}
        children={<ModalWidthDraw setIsModal={setIsModal} />}
      />
    </div>
  );

};

export default WalletDashboard;