import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useBlockMint } from '@/contexts/BlockMintContext';
import { ArrowRightLeft, TrendingUp, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAppKitAccount } from '@reown/appkit/react';
import useUserState from '@/stores/user';
import { useSwapMutation } from '@/services/service';
import { ISwap } from '@/types/types';
import { toast as Toast } from 'react-toastify';
import { CookiesStorage } from '@/lib/cookie-storage';
import { StorageKeys } from '@/constants/storage-keys';

interface SwapInterfaceProps {
  balance?: any;
}

const SwapInterface: React.FC<SwapInterfaceProps> = ({ balance }) => {
  const {
    wallet,
    bmTokens,
    swapBNBToBM,
    swapBMToBNB,
    buyBMTokens
  } = useBlockMint();
  const { toast } = useToast();
  const { address, isConnected } = useAppKitAccount();
  const [bnbAmount, setBnbAmount] = useState<string>('');
  const [bmAmount, setBmAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo, setUserInfo } = useUserState();
  const swapMutation = useSwapMutation()

  const BM_PRICE = 100; // 0.6 USDT per BM token

  // const handleBNBToBM = async () => {
  //   if (!bnbAmount || parseFloat(bnbAmount) <= 0) {
  //     toast({
  //       title: "Invalid Amount",
  //       description: "Please enter a valid BNB amount.",
  //       variant: "destructive"
  //     });
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     await swapBNBToBM(parseFloat(bnbAmount));
  //     toast({
  //       title: "Swap Successful",
  //       description: `Swapped ${bnbAmount} BNB for ${(parseFloat(bnbAmount) / BM_PRICE).toFixed(4)} BM tokens.`
  //     });
  //     setBnbAmount('');
  //   } catch (error) {
  //     toast({
  //       title: "Swap Failed",
  //       description: error instanceof Error ? error.message : "An error occurred",
  //       variant: "destructive"
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleBMToBNB = async () => {
    // if (!bmAmount || parseFloat(bmAmount) <= 0) {
    //   toast({
    //     title: "Invalid Amount",
    //     description: "Please enter a valid BM amount.",
    //     variant: "destructive"
    //   });
    //   return;
    // }

    if (!userInfo) return;

    setIsLoading(true);

    const payload: ISwap = {
      address: userInfo.address,
      amount: Number(bnbAmount),
      r: userInfo.r,
      s: userInfo.s,
      v: userInfo.v
    }
    swapMutation.mutate(
      payload,
      {
        onSuccess: (response: any) => {
          if (response) {
            setUserInfo(response?.userdata);
            CookiesStorage.setCookieData(StorageKeys.UserInfo, JSON.stringify(response?.userdata));
          }
          Toast.success('Swap Successful.', {
            position: 'top-right',
          });
          setIsLoading(false);
          setBmAmount('');
        }
      }
    )
    // try {
    //   const payload: ISwap = {
    //     address: userInfo.address,
    //     amount: Number(bnbAmount),
    //     r: userInfo.r,
    //     s: userInfo.s,
    //     v: userInfo.v
    //   }
    //   swapMutation.mutate(
    //     payload,
    //     {
    //       onSuccess: () => {
    //         Toast.success('Swap Successful.', {
    //           position: 'top-right',
    //         });
    //         setBmAmount('');
    //       }
    //     }
    //   )
    // await swapBMToBNB(parseFloat(bmAmount));
    // toast({
    //   title: "Swap Successful",
    //   description: `Swapped ${bmAmount} BM for ${(parseFloat(bmAmount) * BM_PRICE).toFixed(4)} BNB.`
    // });
    // setBmAmount('');
    // } catch (error) {
    //   toast({
    //     title: "Swap Failed",
    //     description: error instanceof Error ? error.message : "An error occurred",
    //     variant: "destructive"
    //   });
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const calculateBMFromBNB = (bnb: string) => {
    const bnbValue = parseFloat(bnb);
    return isNaN(bnbValue) ? '0' : (bnbValue / BM_PRICE).toFixed(4);
  };

  const calculateBNBFromBM = (bm: string) => {
    const bmValue = parseFloat(bm);
    return isNaN(bmValue) ? '0' : (bmValue * BM_PRICE).toFixed(4);
  };

  if (!address && !isConnected) {
    return (
      <Card className="max-w-4xl mx-auto" data-id="fizas7e9a" data-path="src/components/SwapInterface.tsx">
        <CardContent className="text-center py-12" data-id="r91de9nwi" data-path="src/components/SwapInterface.tsx">
          <ArrowRightLeft className="w-16 h-16 text-gray-400 mx-auto mb-4" data-id="30p1fgfsf" data-path="src/components/SwapInterface.tsx" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2" data-id="fvz7ekjn3" data-path="src/components/SwapInterface.tsx">Wallet Not Connected</h3>
          <p className="text-gray-500" data-id="fodak9uce" data-path="src/components/SwapInterface.tsx">Please connect your wallet to start swapping tokens.</p>
        </CardContent>
      </Card>);

  }

  return (
    <div className="space-y-6" data-id="pvucmrl7l" data-path="src/components/SwapInterface.tsx">
      <div className="text-center mb-8" data-id="lv0jntt6z" data-path="src/components/SwapInterface.tsx">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4" data-id="yffja3xhg" data-path="src/components/SwapInterface.tsx">
          Token Swap
        </h1>
        <p className="text-gray-600" data-id="r4bmgey5b" data-path="src/components/SwapInterface.tsx">Exchange BNB and BM tokens at competitive rates</p>
      </div>

      {/* Price Information */}
      <Card className="max-w-2xl mx-auto" data-id="d7kfmszuf" data-path="src/components/SwapInterface.tsx">
        <CardHeader data-id="hfa3ozo1k" data-path="src/components/SwapInterface.tsx">
          <CardTitle className="flex items-center justify-center" data-id="w8w8gseqw" data-path="src/components/SwapInterface.tsx">
            <DollarSign className="w-5 h-5 mr-2" data-id="v7e8r2iqe" data-path="src/components/SwapInterface.tsx" />
            Current Rates
          </CardTitle>
        </CardHeader>
        <CardContent data-id="4k36o775n" data-path="src/components/SwapInterface.tsx">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4" data-id="h1zbz7c1p" data-path="src/components/SwapInterface.tsx">
            {/* <div className="text-center p-4 bg-blue-50 rounded-lg" data-id="oowkqaf1f" data-path="src/components/SwapInterface.tsx">
              <div className="text-2xl font-bold text-blue-600" data-id="ptfh908p2" data-path="src/components/SwapInterface.tsx">1 BM</div>
              <div className="text-gray-600" data-id="hznusdclv" data-path="src/components/SwapInterface.tsx">= 0.6 USDT</div>
            </div> */}
            <div className="text-center p-4 bg-green-50 rounded-lg" data-id="b3tujohmf" data-path="src/components/SwapInterface.tsx">
              <div className="text-2xl font-bold text-green-600" data-id="tfeoxx35t" data-path="src/components/SwapInterface.tsx">1 BNB</div>
              <div className="text-gray-600" data-id="qro1uiclc" data-path="src/components/SwapInterface.tsx">= {BM_PRICE} BM</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto" data-id="78mv904a0" data-path="src/components/SwapInterface.tsx">
        <Card data-id="rgrodf1fh" data-path="src/components/SwapInterface.tsx">
          <CardContent className="text-center py-4" data-id="g5k4l0eqz" data-path="src/components/SwapInterface.tsx">
            <div className="text-sm text-gray-600 mb-1" data-id="6sf7kwqva" data-path="src/components/SwapInterface.tsx">BNB Balance</div>
            <div className="text-xl font-bold" data-id="i6qae2kfh" data-path="src/components/SwapInterface.tsx">{balance?.data?.balance ? Number(balance?.data?.balance).toFixed(4) : 0}</div>
          </CardContent>
        </Card>
        <Card data-id="1eosn0lm6" data-path="src/components/SwapInterface.tsx">
          <CardContent className="text-center py-4" data-id="er7cnjtu3" data-path="src/components/SwapInterface.tsx">
            <div className="text-sm text-gray-600 mb-1" data-id="y0o31qnff" data-path="src/components/SwapInterface.tsx">Unlocked BM</div>
            <div className="text-xl font-bold text-green-600" data-id="e1k9zptvm" data-path="src/components/SwapInterface.tsx">{bmTokens.unlocked.toFixed(4)}</div>
          </CardContent>
        </Card>
        <Card data-id="qataezsc6" data-path="src/components/SwapInterface.tsx">
          <CardContent className="text-center py-4" data-id="8mixrwyuq" data-path="src/components/SwapInterface.tsx">
            <div className="text-sm text-gray-600 mb-1" data-id="qwh1zk4db" data-path="src/components/SwapInterface.tsx">Total BM</div>
            <div className="text-xl font-bold text-blue-600" data-id="fpb2pmo6g" data-path="src/components/SwapInterface.tsx">{bmTokens.total.toFixed(4)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Swap Interface */}
      <Card className="max-w-2xl mx-auto" data-id="d7t9maz5t" data-path="src/components/SwapInterface.tsx">
        <CardHeader data-id="r2u1xls2s" data-path="src/components/SwapInterface.tsx">
          <CardTitle className="flex items-center" data-id="44ed7w6cf" data-path="src/components/SwapInterface.tsx">
            <ArrowRightLeft className="w-5 h-5 mr-2" data-id="h06xzlh67" data-path="src/components/SwapInterface.tsx" />
            Swap Tokens
          </CardTitle>
        </CardHeader>
        <CardContent data-id="lvg8mz6ah" data-path="src/components/SwapInterface.tsx">
          <Tabs defaultValue="bnb-to-bm" className="w-full" data-id="vmeeu25sv" data-path="src/components/SwapInterface.tsx">
            <TabsList className="grid w-full grid-cols-2" data-id="2skr3hw7o" data-path="src/components/SwapInterface.tsx">
              <TabsTrigger value="bnb-to-bm" data-id="ze4bmh2jz" data-path="src/components/SwapInterface.tsx">BNB → BM</TabsTrigger>
              <TabsTrigger value="bm-to-bnb" data-id="vvomt76d7" data-path="src/components/SwapInterface.tsx">BM → BNB</TabsTrigger>
            </TabsList>

            <TabsContent value="bnb-to-bm" className="space-y-4" data-id="4rh0hnyk4" data-path="src/components/SwapInterface.tsx">
              <div className="space-y-4" data-id="9viz6s1i5" data-path="src/components/SwapInterface.tsx">
                <div className="space-y-2" data-id="2gjvqcomt" data-path="src/components/SwapInterface.tsx">
                  <Label htmlFor="bnb-input" data-id="anv9c09r1" data-path="src/components/SwapInterface.tsx">BNB Amount</Label>
                  <Input
                    id="bnb-input"
                    type="number"
                    step="0.001"
                    min="0"
                    placeholder="0.0"
                    value={bnbAmount}
                    onChange={(e) => setBnbAmount(e.target.value)} data-id="02hy4flw1" data-path="src/components/SwapInterface.tsx" />

                  <div className="text-sm text-gray-500" data-id="i4g8v5jvz" data-path="src/components/SwapInterface.tsx">
                    Available: {wallet?.bnbBalance?.toFixed(4)} BNB
                  </div>
                </div>

                {bnbAmount &&
                  <div className="bg-blue-50 p-4 rounded-lg" data-id="8burupd6q" data-path="src/components/SwapInterface.tsx">
                    <div className="flex items-center justify-between" data-id="fwnj80iv5" data-path="src/components/SwapInterface.tsx">
                      <span data-id="27y040wzs" data-path="src/components/SwapInterface.tsx">You will receive:</span>
                      <span className="font-bold text-blue-600" data-id="gokgoa6nl" data-path="src/components/SwapInterface.tsx">
                        {/* {calculateBMFromBNB(bnbAmount)} BM */}
                        {"100"} BM
                      </span>
                    </div>
                  </div>
                }

                <Button
                  onClick={handleBMToBNB}
                  disabled={isLoading || !bnbAmount || parseFloat(bnbAmount) > wallet?.bnbBalance}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600" data-id="apgwhrfg0" data-path="src/components/SwapInterface.tsx">

                  <ArrowRightLeft className="w-4 h-4 mr-2" data-id="ws8myefjd" data-path="src/components/SwapInterface.tsx" />
                  {isLoading ? 'Swapping...' : 'Swap BNB for BM'}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="bm-to-bnb" className="space-y-4" data-id="ze96advdb" data-path="src/components/SwapInterface.tsx">
              <div className="space-y-4" data-id="7m0xs3cm9" data-path="src/components/SwapInterface.tsx">
                <div className="space-y-2" data-id="lli35v9vs" data-path="src/components/SwapInterface.tsx">
                  <Label htmlFor="bm-input" data-id="ggenibp6c" data-path="src/components/SwapInterface.tsx">BM Amount</Label>
                  <Input
                    id="bm-input"
                    type="number"
                    step="0.001"
                    min="0"
                    placeholder="0.0"
                    value={bmAmount}
                    onChange={(e) => setBmAmount(e.target.value)} data-id="6pd3k6z2h" data-path="src/components/SwapInterface.tsx" />

                  <div className="text-sm text-gray-500" data-id="dyxge35tf" data-path="src/components/SwapInterface.tsx">
                    Available: {bmTokens.unlocked.toFixed(4)} BM (unlocked)
                  </div>
                </div>

                {bmAmount &&
                  <div className="bg-green-50 p-4 rounded-lg" data-id="u3uq7xuv6" data-path="src/components/SwapInterface.tsx">
                    <div className="flex items-center justify-between" data-id="r5a7tbe4o" data-path="src/components/SwapInterface.tsx">
                      <span data-id="glz0js1n0" data-path="src/components/SwapInterface.tsx">You will receive:</span>
                      <span className="font-bold text-green-600" data-id="mf7td3dpw" data-path="src/components/SwapInterface.tsx">
                        {/* {calculateBNBFromBM(bmAmount)} BNB */}
                        {"100"} BM
                      </span>
                    </div>
                  </div>
                }

                <Button
                  onClick={handleBMToBNB}
                  // disabled={isLoading || !bmAmount || parseFloat(bmAmount) > bmTokens.unlocked}
                  disabled={userInfo.coin > userInfo.coinLock ? false : true}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600" data-id="clxh2624h" data-path="src/components/SwapInterface.tsx">

                  <ArrowRightLeft className="w-4 h-4 mr-2" data-id="mq45jjxzg" data-path="src/components/SwapInterface.tsx" />
                  {isLoading ? 'Swapping...' : 'Swap BM for BNB'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card className="max-w-xl mx-auto" data-id="4kuij57o5" data-path="src/components/SwapInterface.tsx">
        <CardHeader data-id="gtmcn95y8" data-path="src/components/SwapInterface.tsx">
          <CardTitle data-id="xtoh8xweu" data-path="src/components/SwapInterface.tsx">Swap Information</CardTitle>
        </CardHeader>
        <CardContent data-id="mnbielzo5" data-path="src/components/SwapInterface.tsx">
          <div className="grid grid-cols-1 gap-6" data-id="o6rzfrps9" data-path="src/components/SwapInterface.tsx">
            <div className="space-y-4" data-id="henhadfk8" data-path="src/components/SwapInterface.tsx">
              <ul className="space-y-2 text-sm text-gray-600" data-id="2bcnbnxvc" data-path="src/components/SwapInterface.tsx">
                <li className="flex items-start" data-id="ex0dgn6jz" data-path="src/components/SwapInterface.tsx">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" data-id="nsc0hq38x" data-path="src/components/SwapInterface.tsx"></span>
                  1 BNB = 100 BM tokens.
                </li>
                <li className="flex items-start" data-id="ex0dgn6jz" data-path="src/components/SwapInterface.tsx">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" data-id="nsc0hq38x" data-path="src/components/SwapInterface.tsx"></span>
                  BM tokens can participate in mining.
                </li>
                <li className="flex items-start" data-id="ex0dgn6jz" data-path="src/components/SwapInterface.tsx">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" data-id="nsc0hq38x" data-path="src/components/SwapInterface.tsx"></span>
                  Locked BM tokens cannot be swapped.
                </li>
              </ul>
            </div>
            {/* <div className="space-y-4" data-id="henhadfk8" data-path="src/components/SwapInterface.tsx">
              <h4 className="font-semibold text-gray-800" data-id="0omxdkzvk" data-path="src/components/SwapInterface.tsx">BNB to BM Swap</h4>
              <ul className="space-y-2 text-sm text-gray-600" data-id="2bcnbnxvc" data-path="src/components/SwapInterface.tsx">
                <li className="flex items-start" data-id="ex0dgn6jz" data-path="src/components/SwapInterface.tsx">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" data-id="nsc0hq38x" data-path="src/components/SwapInterface.tsx"></span>
                  Exchange rate: 1 BM = 0.6 USDT
                </li>
                <li className="flex items-start" data-id="llkj9mtko" data-path="src/components/SwapInterface.tsx">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" data-id="26r7khfy7" data-path="src/components/SwapInterface.tsx"></span>
                  Purchased BM tokens are immediately unlocked
                </li>
                <li className="flex items-start" data-id="vybtyjoql" data-path="src/components/SwapInterface.tsx">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" data-id="6e8vic215" data-path="src/components/SwapInterface.tsx"></span>
                  No transaction fees for swapping
                </li>
                <li className="flex items-start" data-id="wedf5ghrr" data-path="src/components/SwapInterface.tsx">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" data-id="i8nd3mnv5" data-path="src/components/SwapInterface.tsx"></span>
                  Instant transaction processing
                </li>
              </ul>
            </div> */}

            {/* <div className="space-y-4" data-id="y0rt02iie" data-path="src/components/SwapInterface.tsx">
              <h4 className="font-semibold text-gray-800" data-id="dlo9dsy15" data-path="src/components/SwapInterface.tsx">BM to BNB Swap</h4>
              <ul className="space-y-2 text-sm text-gray-600" data-id="t9tp999vz" data-path="src/components/SwapInterface.tsx">
                <li className="flex items-start" data-id="wrvgbp3fa" data-path="src/components/SwapInterface.tsx">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" data-id="12dv5obdt" data-path="src/components/SwapInterface.tsx"></span>
                  Only unlocked BM tokens can be swapped
                </li>
                <li className="flex items-start" data-id="u8n2cb7v7" data-path="src/components/SwapInterface.tsx">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" data-id="ipw5wz4wp" data-path="src/components/SwapInterface.tsx"></span>
                  Locked tokens unlock gradually over 60 days
                </li>
                <li className="flex items-start" data-id="ewr10zvcf" data-path="src/components/SwapInterface.tsx">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" data-id="mlijlm41r" data-path="src/components/SwapInterface.tsx"></span>
                  Competitive exchange rates
                </li>
                <li className="flex items-start" data-id="ox6nc4jsc" data-path="src/components/SwapInterface.tsx">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" data-id="yglflb8qo" data-path="src/components/SwapInterface.tsx"></span>
                  Direct transfer to your connected wallet
                </li>
              </ul>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </div>);

};

export default SwapInterface;