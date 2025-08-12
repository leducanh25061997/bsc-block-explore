import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBlockMint } from '@/contexts/BlockMintContext';
import { BarChart3, TrendingUp, Activity, DollarSign, Users, Zap } from 'lucide-react';
import { getMainConfig } from '@/services/service';
import { IPlatformStatistics } from '@/types/types';

const Statistics: React.FC = () => {
  const { transactions, bmTokens, mining, referral } = useBlockMint();
  const [ statistics, setStatistics ] = useState<IPlatformStatistics>();
  console.log(statistics, "statistics")
  
  useEffect(() => {
    fetchMainConfig()
  }, []);

  const fetchMainConfig = async () => {
    const response = await getMainConfig();
    setStatistics(response?.configdata)
  }

  // Calculate statistics
  const totalTransactionValue = transactions.
  filter((tx) => tx.type === 'block').
  reduce((sum, tx) => sum + tx.amount, 0);

  const totalTransactions = transactions.filter((tx) => tx.type === 'block').length;
  const totalSwaps = transactions.filter((tx) => tx.type === 'swap').length;
  const totalWithdrawals = transactions.filter((tx) => tx.type === 'withdraw').length;

  const totalRewards = transactions.
  filter((tx) => tx.reward).
  reduce((sum, tx) => sum + (tx.reward || 0), 0);

  const averageTransactionValue = totalTransactions > 0 ? totalTransactionValue / totalTransactions : 0;

  return (
    <div className="space-y-6" data-id="a12y38kw4" data-path="src/components/Statistics.tsx">
      <div className="text-center mb-8" data-id="o2g2p1stk" data-path="src/components/Statistics.tsx">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4" data-id="xxe5rniqo" data-path="src/components/Statistics.tsx">
          Platform Statistics
        </h1>
        <p className="text-gray-600" data-id="gwa2rlr5k" data-path="src/components/Statistics.tsx">Comprehensive overview of your BlockMint activity</p>
      </div>

      {/* Main Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" data-id="hi1cxohjj" data-path="src/components/Statistics.tsx">
        <Card data-id="iymobkl4w" data-path="src/components/Statistics.tsx">
          <CardContent className="text-center py-6" data-id="x4qta61ft" data-path="src/components/Statistics.tsx">
            <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" data-id="wruvj92tt" data-path="src/components/Statistics.tsx" />
            <div className="text-2xl font-bold text-green-600" data-id="5v15pebzk" data-path="src/components/Statistics.tsx">
              {totalTransactionValue.toFixed(4)}
            </div>
            <div className="text-sm text-gray-600" data-id="tw5gnnwug" data-path="src/components/Statistics.tsx">Total Transaction Value (BNB)</div>
          </CardContent>
        </Card>

        <Card data-id="gzxcdhdnr" data-path="src/components/Statistics.tsx">
          <CardContent className="text-center py-6" data-id="1az9774ok" data-path="src/components/Statistics.tsx">
            <Activity className="w-8 h-8 text-blue-600 mx-auto mb-2" data-id="bh4iav92g" data-path="src/components/Statistics.tsx" />
            <div className="text-2xl font-bold text-blue-600" data-id="p9nrnrj95" data-path="src/components/Statistics.tsx">{totalTransactions}</div>
            <div className="text-sm text-gray-600" data-id="5x8s9ejzl" data-path="src/components/Statistics.tsx">Total Transactions</div>
          </CardContent>
        </Card>

        <Card data-id="b1kybpbuq" data-path="src/components/Statistics.tsx">
          <CardContent className="text-center py-6" data-id="mo2b7vcxc" data-path="src/components/Statistics.tsx">
            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" data-id="3jxllhdxi" data-path="src/components/Statistics.tsx" />
            <div className="text-2xl font-bold text-purple-600" data-id="0r8659f06" data-path="src/components/Statistics.tsx">
              {totalRewards.toFixed(4)}
            </div>
            <div className="text-sm text-gray-600" data-id="oqo11yii4" data-path="src/components/Statistics.tsx">Total BM Rewards</div>
          </CardContent>
        </Card>

        <Card data-id="plid7x0mf" data-path="src/components/Statistics.tsx">
          <CardContent className="text-center py-6" data-id="2rpccja1i" data-path="src/components/Statistics.tsx">
            <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" data-id="st3uunar0" data-path="src/components/Statistics.tsx" />
            <div className="text-2xl font-bold text-orange-600" data-id="mari2og0k" data-path="src/components/Statistics.tsx">
              {mining.totalMined.toFixed(4)}
            </div>
            <div className="text-sm text-gray-600" data-id="c0x1m4e6x" data-path="src/components/Statistics.tsx">Total Mined BM</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-id="7syyatf3u" data-path="src/components/Statistics.tsx">
        {/* Transaction Statistics */}
        <Card data-id="6h008q4kl" data-path="src/components/Statistics.tsx">
          <CardHeader data-id="xvhr5eksp" data-path="src/components/Statistics.tsx">
            <CardTitle className="flex items-center" data-id="0e7yk4zlk" data-path="src/components/Statistics.tsx">
              <BarChart3 className="w-5 h-5 mr-2" data-id="7shtymwnr" data-path="src/components/Statistics.tsx" />
              Transaction Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" data-id="jwcqnpow8" data-path="src/components/Statistics.tsx">
            <div className="space-y-3" data-id="cc8sjsflb" data-path="src/components/Statistics.tsx">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg" data-id="dlwy0s3pm" data-path="src/components/Statistics.tsx">
                <span className="font-medium" data-id="nu6h3rv59" data-path="src/components/Statistics.tsx">Block Transactions</span>
                <span className="font-bold text-blue-600" data-id="km6njljyl" data-path="src/components/Statistics.tsx">{totalTransactions}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg" data-id="n89rxbdmd" data-path="src/components/Statistics.tsx">
                <span className="font-medium" data-id="gng7hg9yp" data-path="src/components/Statistics.tsx">Token Swaps</span>
                <span className="font-bold text-green-600" data-id="304gehcpq" data-path="src/components/Statistics.tsx">{totalSwaps}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg" data-id="ixaruqmu9" data-path="src/components/Statistics.tsx">
                <span className="font-medium" data-id="mf6gvy3ne" data-path="src/components/Statistics.tsx">Withdrawals</span>
                <span className="font-bold text-purple-600" data-id="auanz1pg4" data-path="src/components/Statistics.tsx">{totalWithdrawals}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg" data-id="j3mmzrp6q" data-path="src/components/Statistics.tsx">
                <span className="font-medium" data-id="usqwi1oy2" data-path="src/components/Statistics.tsx">Average Transaction</span>
                <span className="font-bold text-orange-600" data-id="ot68rfftd" data-path="src/components/Statistics.tsx">
                  {averageTransactionValue.toFixed(4)} BNB
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Token Statistics */}
        <Card data-id="4kdwjohmq" data-path="src/components/Statistics.tsx">
          <CardHeader data-id="uqhq8zlex" data-path="src/components/Statistics.tsx">
            <CardTitle className="flex items-center" data-id="wvr959ng5" data-path="src/components/Statistics.tsx">
              <TrendingUp className="w-5 h-5 mr-2" data-id="amdktqfwf" data-path="src/components/Statistics.tsx" />
              Token Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" data-id="9ehzrq6c9" data-path="src/components/Statistics.tsx">
            <div className="space-y-3" data-id="zq495cpb7" data-path="src/components/Statistics.tsx">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg" data-id="1y8p7ni3q" data-path="src/components/Statistics.tsx">
                <span className="font-medium" data-id="oh73qsrj2" data-path="src/components/Statistics.tsx">Total BM Tokens</span>
                <span className="font-bold text-blue-600" data-id="qiqnsnhzw" data-path="src/components/Statistics.tsx">{bmTokens.total.toFixed(4)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg" data-id="jlfx32ait" data-path="src/components/Statistics.tsx">
                <span className="font-medium" data-id="lshqg7tye" data-path="src/components/Statistics.tsx">Unlocked BM</span>
                <span className="font-bold text-green-600" data-id="o3r0d01f0" data-path="src/components/Statistics.tsx">{bmTokens.unlocked.toFixed(4)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg" data-id="vfxwz7cmz" data-path="src/components/Statistics.tsx">
                <span className="font-medium" data-id="p620rgglh" data-path="src/components/Statistics.tsx">Locked BM</span>
                <span className="font-bold text-orange-600" data-id="xznaynjyw" data-path="src/components/Statistics.tsx">{bmTokens.locked.toFixed(4)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg" data-id="2j22ysi5i" data-path="src/components/Statistics.tsx">
                <span className="font-medium" data-id="5l3f3os8o" data-path="src/components/Statistics.tsx">Unlock Progress</span>
                <span className="font-bold text-purple-600" data-id="yvvriq19z" data-path="src/components/Statistics.tsx">
                  {bmTokens.total > 0 ? (bmTokens.unlocked / bmTokens.total * 100).toFixed(1) : 0}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mining & Referral Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-id="pynnhty6v" data-path="src/components/Statistics.tsx">
        {/* Mining Statistics */}
        <Card data-id="l1499mwi6" data-path="src/components/Statistics.tsx">
          <CardHeader data-id="0mt0kgywx" data-path="src/components/Statistics.tsx">
            <CardTitle className="flex items-center" data-id="dm7t5i8rb" data-path="src/components/Statistics.tsx">
              <Zap className="w-5 h-5 mr-2" data-id="npy3ecv1r" data-path="src/components/Statistics.tsx" />
              Mining Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" data-id="yyy3h62xg" data-path="src/components/Statistics.tsx">
            <div className="space-y-3" data-id="g8cwsuhhk" data-path="src/components/Statistics.tsx">
              <div className="flex justify-between items-center" data-id="aqah0aqes" data-path="src/components/Statistics.tsx">
                <span className="font-medium" data-id="2f8urkmud" data-path="src/components/Statistics.tsx">Mining Rate:</span>
                <span className="font-semibold" data-id="rb1wvq0w9" data-path="src/components/Statistics.tsx">{mining.miningRate} BM/session</span>
              </div>
              <div className="flex justify-between items-center" data-id="ha4qbinea" data-path="src/components/Statistics.tsx">
                <span className="font-medium" data-id="vt4qjj0tx" data-path="src/components/Statistics.tsx">Daily Sessions:</span>
                <span className="font-semibold" data-id="h5oy9yoya" data-path="src/components/Statistics.tsx">{mining.dailyMiningCount}/2</span>
              </div>
              <div className="flex justify-between items-center" data-id="k9th03w9b" data-path="src/components/Statistics.tsx">
                <span className="font-medium" data-id="weq68x0y6" data-path="src/components/Statistics.tsx">Total Mined:</span>
                <span className="font-semibold" data-id="xfxejc36q" data-path="src/components/Statistics.tsx">{mining.totalMined.toFixed(4)} BM</span>
              </div>
              <div className="flex justify-between items-center" data-id="9qovvklph" data-path="src/components/Statistics.tsx">
                <span className="font-medium" data-id="t08pa0ffp" data-path="src/components/Statistics.tsx">Auto-Mining Rate:</span>
                <span className="font-semibold" data-id="gjbu7hkt7" data-path="src/components/Statistics.tsx">
                  {(bmTokens.total * 0.001).toFixed(6)} BM/hour
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Referral Statistics */}
        <Card data-id="c4lkz4krc" data-path="src/components/Statistics.tsx">
          <CardHeader data-id="u2yvecfo6" data-path="src/components/Statistics.tsx">
            <CardTitle className="flex items-center" data-id="wxn463mkb" data-path="src/components/Statistics.tsx">
              <Users className="w-5 h-5 mr-2" data-id="0y3n3aj2n" data-path="src/components/Statistics.tsx" />
              Referral Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" data-id="exs1e3ujf" data-path="src/components/Statistics.tsx">
            <div className="space-y-3" data-id="2keyl2tu5" data-path="src/components/Statistics.tsx">
              <div className="flex justify-between items-center" data-id="la26cxhng" data-path="src/components/Statistics.tsx">
                <span className="font-medium" data-id="aada4zamd" data-path="src/components/Statistics.tsx">Referral Code:</span>
                <span className="font-mono text-sm" data-id="7h7wb52dy" data-path="src/components/Statistics.tsx">{referral.code}</span>
              </div>
              <div className="flex justify-between items-center" data-id="l21sn8qpm" data-path="src/components/Statistics.tsx">
                <span className="font-medium" data-id="vaakmuhmq" data-path="src/components/Statistics.tsx">Total Referred:</span>
                <span className="font-semibold" data-id="2xzvm1zna" data-path="src/components/Statistics.tsx">{referral.totalReferred}</span>
              </div>
              <div className="flex justify-between items-center" data-id="884xgk61o" data-path="src/components/Statistics.tsx">
                <span className="font-medium" data-id="z9cwf845g" data-path="src/components/Statistics.tsx">Total Earned:</span>
                <span className="font-semibold" data-id="4rjiiuuc2" data-path="src/components/Statistics.tsx">{referral.totalEarned.toFixed(4)} BNB</span>
              </div>
              <div className="flex justify-between items-center" data-id="gkten60x0" data-path="src/components/Statistics.tsx">
                <span className="font-medium" data-id="e0z4ym74y" data-path="src/components/Statistics.tsx">BM Received:</span>
                <span className="font-semibold" data-id="xetbl1x5k" data-path="src/components/Statistics.tsx">{referral.totalBMReceived.toFixed(4)} BM</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Overview */}
      <Card data-id="45yuxf4ln" data-path="src/components/Statistics.tsx">
        <CardHeader data-id="esenyd6bk" data-path="src/components/Statistics.tsx">
          <CardTitle data-id="doyfl2xfj" data-path="src/components/Statistics.tsx">Platform Overview</CardTitle>
        </CardHeader>
        <CardContent data-id="cckdic8g2" data-path="src/components/Statistics.tsx">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-id="qz10vxowa" data-path="src/components/Statistics.tsx">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg" data-id="u3kxclnav" data-path="src/components/Statistics.tsx">
              <div className="text-3xl font-bold text-blue-600 mb-2" data-id="xdwzdmrlt" data-path="src/components/Statistics.tsx">
                {(totalRewards / totalTransactionValue * 100).toFixed(2)}%
              </div>
              <div className="text-sm text-blue-700" data-id="6ud1bnk6j" data-path="src/components/Statistics.tsx">Average Reward Rate</div>
              <div className="text-xs text-blue-600 mt-1" data-id="32nj3o1i9" data-path="src/components/Statistics.tsx">Based on transaction volume</div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg" data-id="wisnxrg4p" data-path="src/components/Statistics.tsx">
              <div className="text-3xl font-bold text-green-600 mb-2" data-id="6torvpt66" data-path="src/components/Statistics.tsx">
                {totalTransactions > 0 ? (totalTransactions / 30).toFixed(1) : '0'}
              </div>
              <div className="text-sm text-green-700" data-id="a9pkc8frv" data-path="src/components/Statistics.tsx">Avg Transactions/Day</div>
              <div className="text-xs text-green-600 mt-1" data-id="biub7uet8" data-path="src/components/Statistics.tsx">Estimated based on activity</div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg" data-id="nikglpbmo" data-path="src/components/Statistics.tsx">
              <div className="text-3xl font-bold text-purple-600 mb-2" data-id="aknkk8plm" data-path="src/components/Statistics.tsx">
                ${(bmTokens.total * 0.6).toFixed(2)}
              </div>
              <div className="text-sm text-purple-700" data-id="k6z7iss5f" data-path="src/components/Statistics.tsx">Portfolio Value</div>
              <div className="text-xs text-purple-600 mt-1" data-id="q21a1urxn" data-path="src/components/Statistics.tsx">Total BM value in USDT</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>);

};

export default Statistics;