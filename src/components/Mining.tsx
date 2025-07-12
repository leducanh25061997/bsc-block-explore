import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useBlockMint } from '@/contexts/BlockMintContext';
import { Pickaxe, Zap, Clock, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAppKitAccount } from '@reown/appkit/react';

const Mining: React.FC = () => {
  const {
    wallet,
    systemWallet,
    bmTokens,
    mining,
    performMining,
    isTransactionTime
  } = useBlockMint();
  const { toast } = useToast();
  const { address, isConnected } = useAppKitAccount();

  const handleMining = () => {
    try {
      performMining();
      toast({
        title: "Mining Successful",
        description: `Mined ${mining.miningRate} BM tokens!`
      });
    } catch (error) {
      toast({
        title: "Mining Failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const autoMiningRate = bmTokens.total * 0.001; // 0.1% per hour
  const dailyProgress = mining.dailyMiningCount / 2 * 100;

  if (!address && !isConnected) {
    return (
      <Card className="max-w-4xl mx-auto" data-id="v3g5slszp" data-path="src/components/Mining.tsx">
        <CardContent className="text-center py-12" data-id="0weijfg3k" data-path="src/components/Mining.tsx">
          <Pickaxe className="w-16 h-16 text-gray-400 mx-auto mb-4" data-id="oc4mcqgu5" data-path="src/components/Mining.tsx" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2" data-id="v56yn0crk" data-path="src/components/Mining.tsx">Wallet Not Connected</h3>
          <p className="text-gray-500" data-id="6lbtl09aj" data-path="src/components/Mining.tsx">Please connect your wallet to start mining BM tokens.</p>
        </CardContent>
      </Card>);

  }

  return (
    <div className="space-y-6" data-id="ttxfmflki" data-path="src/components/Mining.tsx">
      <div className="text-center mb-8" data-id="dorw0vjfk" data-path="src/components/Mining.tsx">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4" data-id="crgakyizl" data-path="src/components/Mining.tsx">
          BM Token Mining
        </h1>
        <p className="text-gray-600" data-id="lhji19zfh" data-path="src/components/Mining.tsx">Mine BM tokens through automatic and manual mining</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-id="2wh4a67bd" data-path="src/components/Mining.tsx">
        {/* Manual Mining */}
        <Card data-id="9c4ha7kg4" data-path="src/components/Mining.tsx">
          <CardHeader data-id="qrdd62spz" data-path="src/components/Mining.tsx">
            <CardTitle className="flex items-center" data-id="28vqf0s6n" data-path="src/components/Mining.tsx">
              <Pickaxe className="w-5 h-5 mr-2" data-id="xnpu2qtrw" data-path="src/components/Mining.tsx" />
              Manual Mining
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" data-id="vmgjbgury" data-path="src/components/Mining.tsx">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg" data-id="0ywzg17gx" data-path="src/components/Mining.tsx">
              <div className="flex items-center justify-between mb-2" data-id="5ll1m2vst" data-path="src/components/Mining.tsx">
                <span className="font-medium" data-id="a4zel76vm" data-path="src/components/Mining.tsx">Mining Rate:</span>
                <span className="font-bold text-blue-600" data-id="bh3q3di15" data-path="src/components/Mining.tsx">{mining.miningRate} BM/session</span>
              </div>
              <div className="flex items-center justify-between mb-2" data-id="k2jgh50np" data-path="src/components/Mining.tsx">
                <span className="font-medium" data-id="z7epu4fbg" data-path="src/components/Mining.tsx">Total Mined:</span>
                <span className="font-semibold" data-id="6e8g7kzp4" data-path="src/components/Mining.tsx">{mining.totalMined.toFixed(4)} BM</span>
              </div>
              <div className="flex items-center justify-between" data-id="ec6a1oafo" data-path="src/components/Mining.tsx">
                <span className="font-medium" data-id="xzkagnapj" data-path="src/components/Mining.tsx">Last Mined:</span>
                <span className="text-sm text-gray-600" data-id="ell3nk8ip" data-path="src/components/Mining.tsx">
                  {mining.lastMined ? formatTime(mining.lastMined) : 'Never'}
                </span>
              </div>
            </div>

            <div className="space-y-2" data-id="r3svmik71" data-path="src/components/Mining.tsx">
              <div className="flex items-center justify-between" data-id="qo5cp3xgw" data-path="src/components/Mining.tsx">
                <span className="text-sm font-medium" data-id="p80s1ikls" data-path="src/components/Mining.tsx">Daily Progress:</span>
                <Badge variant={mining.dailyMiningCount === 2 ? "default" : "secondary"} data-id="v7myf1o14" data-path="src/components/Mining.tsx">
                  {mining.dailyMiningCount}/2 sessions
                </Badge>
              </div>
              <Progress value={dailyProgress} className="w-full" data-id="238dn86fs" data-path="src/components/Mining.tsx" />
            </div>

            <div className="bg-amber-50 p-3 rounded-lg border border-amber-200" data-id="bcxlga90t" data-path="src/components/Mining.tsx">
              <div className="flex items-center mb-2" data-id="md6zixkan" data-path="src/components/Mining.tsx">
                <Clock className="w-4 h-4 text-amber-600 mr-2" data-id="94q47w2s0" data-path="src/components/Mining.tsx" />
                <span className="text-sm font-medium text-amber-800" data-id="4haqivn4j" data-path="src/components/Mining.tsx">Mining Schedule</span>
              </div>
              <ul className="text-xs text-amber-700 space-y-1" data-id="np18hxfqz" data-path="src/components/Mining.tsx">
                <li data-id="d5x3xb5v0" data-path="src/components/Mining.tsx">• 7:00 - 8:00 AM daily</li>
                <li data-id="c01s9imr5" data-path="src/components/Mining.tsx">• 7:00 - 8:00 PM daily</li>
                <li data-id="9llkmr525" data-path="src/components/Mining.tsx">• Maximum 2 sessions per day</li>
              </ul>
            </div>

            <Button
              onClick={handleMining}
              disabled={!isTransactionTime || mining.dailyMiningCount >= 2}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600" data-id="z8q547rev" data-path="src/components/Mining.tsx">

              <Pickaxe className="w-4 h-4 mr-2" data-id="a07mxe6y5" data-path="src/components/Mining.tsx" />
              {mining.dailyMiningCount >= 2 ?
              'Daily Limit Reached' :
              isTransactionTime ?
              'Mine BM Tokens' :
              'Mining Window Closed'}
            </Button>
          </CardContent>
        </Card>

        {/* Auto Mining */}
        <Card data-id="tywtyhnot" data-path="src/components/Mining.tsx">
          <CardHeader data-id="40fv8t2vu" data-path="src/components/Mining.tsx">
            <CardTitle className="flex items-center" data-id="ssc61r3z5" data-path="src/components/Mining.tsx">
              <Zap className="w-5 h-5 mr-2" data-id="2kqlwt26l" data-path="src/components/Mining.tsx" />
              Auto Mining
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" data-id="jeimidwsl" data-path="src/components/Mining.tsx">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg" data-id="sw9mgf5h2" data-path="src/components/Mining.tsx">
              <div className="flex items-center justify-between mb-2" data-id="7jwe4r6pa" data-path="src/components/Mining.tsx">
                <span className="font-medium" data-id="72haqmk7w" data-path="src/components/Mining.tsx">Auto Rate:</span>
                <span className="font-bold text-green-600" data-id="1u50aajn2" data-path="src/components/Mining.tsx">
                  {autoMiningRate.toFixed(6)} BM/hour
                </span>
              </div>
              <div className="flex items-center justify-between mb-2" data-id="shgpqq44j" data-path="src/components/Mining.tsx">
                <span className="font-medium" data-id="8x0zndsb0" data-path="src/components/Mining.tsx">Based On:</span>
                <span className="font-semibold" data-id="pj47qzubz" data-path="src/components/Mining.tsx">{bmTokens.total.toFixed(4)} BM total</span>
              </div>
              <div className="text-xs text-gray-600" data-id="pqq39nn97" data-path="src/components/Mining.tsx">
                Auto-mining rate is 0.1% of your total BM tokens per hour
              </div>
            </div>

            {systemWallet ?
            <div className="bg-green-50 p-3 rounded-lg border border-green-200" data-id="co82cexd2" data-path="src/components/Mining.tsx">
                <div className="flex items-center mb-2" data-id="bpks6hjzo" data-path="src/components/Mining.tsx">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-2" data-id="f1wksluz1" data-path="src/components/Mining.tsx" />
                  <span className="text-sm font-medium text-green-800" data-id="seh1607m6" data-path="src/components/Mining.tsx">System Wallet Active</span>
                </div>
                <p className="text-xs text-green-700" data-id="yvrdngw4a" data-path="src/components/Mining.tsx">
                  Auto-mining is active! Your BM tokens are automatically increasing 
                  based on your total balance.
                </p>
              </div> :

            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200" data-id="5n5hz2qji" data-path="src/components/Mining.tsx">
                <div className="flex items-center mb-2" data-id="ayrwrzq1q" data-path="src/components/Mining.tsx">
                  <Clock className="w-4 h-4 text-gray-600 mr-2" data-id="494hq1u7h" data-path="src/components/Mining.tsx" />
                  <span className="text-sm font-medium text-gray-800" data-id="3xpezpsij" data-path="src/components/Mining.tsx">Auto-Mining Inactive</span>
                </div>
                <p className="text-xs text-gray-700" data-id="ysr064e5z" data-path="src/components/Mining.tsx">
                  Connect your wallet and perform transactions to activate auto-mining.
                </p>
              </div>
            }

            <div className="space-y-2" data-id="37fl4kt7d" data-path="src/components/Mining.tsx">
              <div className="text-sm font-medium" data-id="eau79a67r" data-path="src/components/Mining.tsx">Mining Statistics:</div>
              <div className="grid grid-cols-2 gap-2 text-xs" data-id="80rlyga6z" data-path="src/components/Mining.tsx">
                <div className="bg-gray-50 p-2 rounded" data-id="p9jlk66my" data-path="src/components/Mining.tsx">
                  <div className="font-medium" data-id="p5l7xfg3k" data-path="src/components/Mining.tsx">Total BM</div>
                  <div className="text-blue-600" data-id="l608yrlqw" data-path="src/components/Mining.tsx">{bmTokens.total.toFixed(4)}</div>
                </div>
                <div className="bg-gray-50 p-2 rounded" data-id="z1xqzdgvb" data-path="src/components/Mining.tsx">
                  <div className="font-medium" data-id="3yy48osg8" data-path="src/components/Mining.tsx">Locked BM</div>
                  <div className="text-orange-600" data-id="ar2t4uztx" data-path="src/components/Mining.tsx">{bmTokens.locked.toFixed(4)}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mining Information */}
      <Card data-id="s3e4hz52n" data-path="src/components/Mining.tsx">
        <CardHeader data-id="4qe703z6q" data-path="src/components/Mining.tsx">
          <CardTitle data-id="b9fysgxzg" data-path="src/components/Mining.tsx">Mining Information</CardTitle>
        </CardHeader>
        <CardContent data-id="tdyokx65x" data-path="src/components/Mining.tsx">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-id="660e1x3ed" data-path="src/components/Mining.tsx">
            <div className="space-y-4" data-id="b5h8slbf8" data-path="src/components/Mining.tsx">
              <h4 className="font-semibold text-gray-800" data-id="c58bcozxn" data-path="src/components/Mining.tsx">Manual Mining</h4>
              <ul className="space-y-2 text-sm text-gray-600" data-id="40jypc8jc" data-path="src/components/Mining.tsx">
                <li className="flex items-start" data-id="31dp5q5cy" data-path="src/components/Mining.tsx">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" data-id="8b9ohlo0e" data-path="src/components/Mining.tsx"></span>
                  Mine 0.006 BM tokens per session
                </li>
                <li className="flex items-start" data-id="mbcz8ddpq" data-path="src/components/Mining.tsx">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" data-id="ovstfm357" data-path="src/components/Mining.tsx"></span>
                  Available during trading windows (7-8 AM & 7-8 PM)
                </li>
                <li className="flex items-start" data-id="fpwb1f7il" data-path="src/components/Mining.tsx">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" data-id="t4ozbgh11" data-path="src/components/Mining.tsx"></span>
                  Maximum 2 mining sessions per day
                </li>
                <li className="flex items-start" data-id="shoryl6vx" data-path="src/components/Mining.tsx">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" data-id="zryw9ahlv" data-path="src/components/Mining.tsx"></span>
                  Mined tokens are added to locked balance
                </li>
              </ul>
            </div>

            <div className="space-y-4" data-id="qpm1bmcap" data-path="src/components/Mining.tsx">
              <h4 className="font-semibold text-gray-800" data-id="ow1qrpdw9" data-path="src/components/Mining.tsx">Auto Mining</h4>
              <ul className="space-y-2 text-sm text-gray-600" data-id="7m4ycztok" data-path="src/components/Mining.tsx">
                <li className="flex items-start" data-id="ngvk7e95c" data-path="src/components/Mining.tsx">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" data-id="0awg8zl0a" data-path="src/components/Mining.tsx"></span>
                  Continuous mining at 0.1% of total BM per hour
                </li>
                <li className="flex items-start" data-id="1ybtqeckf" data-path="src/components/Mining.tsx">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" data-id="7yzdxn37w" data-path="src/components/Mining.tsx"></span>
                  Activated when you have BM tokens
                </li>
                <li className="flex items-start" data-id="8yfgigi19" data-path="src/components/Mining.tsx">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" data-id="2vcvan9pq" data-path="src/components/Mining.tsx"></span>
                  No time restrictions
                </li>
                <li className="flex items-start" data-id="nyvxeo77p" data-path="src/components/Mining.tsx">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" data-id="9gk7em7c2" data-path="src/components/Mining.tsx"></span>
                  Higher total BM = faster auto mining
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>);

};

export default Mining;