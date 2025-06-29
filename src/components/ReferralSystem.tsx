import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useBlockMint } from '@/contexts/BlockMintContext';
import { Users, Share2, Gift, TrendingUp, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ReferralSystem: React.FC = () => {
  const { wallet, referral } = useBlockMint();
  const { toast } = useToast();

  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}?ref=${referral.code}`;
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Referral Link Copied",
      description: "Your referral link has been copied to clipboard."
    });
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referral.code);
    toast({
      title: "Referral Code Copied",
      description: "Your referral code has been copied to clipboard."
    });
  };

  if (!wallet) {
    return (
      <Card className="max-w-4xl mx-auto" data-id="0dzrws0re" data-path="src/components/ReferralSystem.tsx">
        <CardContent className="text-center py-12" data-id="wt2mg458k" data-path="src/components/ReferralSystem.tsx">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" data-id="3gihj8zhd" data-path="src/components/ReferralSystem.tsx" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2" data-id="uloyt3ena" data-path="src/components/ReferralSystem.tsx">Wallet Not Connected</h3>
          <p className="text-gray-500" data-id="e0kh2i3q0" data-path="src/components/ReferralSystem.tsx">Please connect your wallet to access the referral system.</p>
        </CardContent>
      </Card>);

  }

  return (
    <div className="space-y-6" data-id="bokxk35ww" data-path="src/components/ReferralSystem.tsx">
      <div className="text-center mb-8" data-id="ly63qxn5v" data-path="src/components/ReferralSystem.tsx">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4" data-id="w9e4vgeg7" data-path="src/components/ReferralSystem.tsx">
          Referral Program
        </h1>
        <p className="text-gray-600" data-id="mfior59kr" data-path="src/components/ReferralSystem.tsx">Earn 30% of mining rewards from your referrals</p>
      </div>

      {/* Referral Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4" data-id="d70m6cybh" data-path="src/components/ReferralSystem.tsx">
        <Card data-id="vrvovbqhg" data-path="src/components/ReferralSystem.tsx">
          <CardContent className="text-center py-6" data-id="s9jrgz2zs" data-path="src/components/ReferralSystem.tsx">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" data-id="ebxltbvl2" data-path="src/components/ReferralSystem.tsx" />
            <div className="text-2xl font-bold text-blue-600" data-id="hatzzal0w" data-path="src/components/ReferralSystem.tsx">{referral.totalReferred}</div>
            <div className="text-sm text-gray-600" data-id="ne0ejaox7" data-path="src/components/ReferralSystem.tsx">Total Referred</div>
          </CardContent>
        </Card>
        
        <Card data-id="u2l01s5ku" data-path="src/components/ReferralSystem.tsx">
          <CardContent className="text-center py-6" data-id="zt4nv89ub" data-path="src/components/ReferralSystem.tsx">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" data-id="399j20yoz" data-path="src/components/ReferralSystem.tsx" />
            <div className="text-2xl font-bold text-green-600" data-id="ynrqq5tiu" data-path="src/components/ReferralSystem.tsx">{referral.totalEarned.toFixed(4)}</div>
            <div className="text-sm text-gray-600" data-id="6igrabfka" data-path="src/components/ReferralSystem.tsx">Total Earned (BNB)</div>
          </CardContent>
        </Card>
        
        <Card data-id="exvp6a00h" data-path="src/components/ReferralSystem.tsx">
          <CardContent className="text-center py-6" data-id="u2yt47upt" data-path="src/components/ReferralSystem.tsx">
            <Gift className="w-8 h-8 text-purple-600 mx-auto mb-2" data-id="887f2rsti" data-path="src/components/ReferralSystem.tsx" />
            <div className="text-2xl font-bold text-purple-600" data-id="qviyxa3z1" data-path="src/components/ReferralSystem.tsx">{referral.totalBMReceived.toFixed(4)}</div>
            <div className="text-sm text-gray-600" data-id="cr81u1m7c" data-path="src/components/ReferralSystem.tsx">BM Received</div>
          </CardContent>
        </Card>
        
        <Card data-id="yjxfhxwps" data-path="src/components/ReferralSystem.tsx">
          <CardContent className="text-center py-6" data-id="oqyry8m3q" data-path="src/components/ReferralSystem.tsx">
            <Share2 className="w-8 h-8 text-orange-600 mx-auto mb-2" data-id="fibw61pwu" data-path="src/components/ReferralSystem.tsx" />
            <div className="text-2xl font-bold text-orange-600" data-id="l9o12cwqy" data-path="src/components/ReferralSystem.tsx">{referral.totalSwapped.toFixed(4)}</div>
            <div className="text-sm text-gray-600" data-id="8524x912c" data-path="src/components/ReferralSystem.tsx">BM Swapped</div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Code & Link */}
      <Card data-id="nko6qgshm" data-path="src/components/ReferralSystem.tsx">
        <CardHeader data-id="qnpxvmy9l" data-path="src/components/ReferralSystem.tsx">
          <CardTitle className="flex items-center" data-id="97sw9z2qn" data-path="src/components/ReferralSystem.tsx">
            <Share2 className="w-5 h-5 mr-2" data-id="jucn9xihh" data-path="src/components/ReferralSystem.tsx" />
            Your Referral Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" data-id="1f2sm7a7z" data-path="src/components/ReferralSystem.tsx">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="hipgx3tr0" data-path="src/components/ReferralSystem.tsx">
            <div className="space-y-2" data-id="z76fzc22u" data-path="src/components/ReferralSystem.tsx">
              <label className="text-sm font-medium" data-id="64tdpibif" data-path="src/components/ReferralSystem.tsx">Referral Code</label>
              <div className="flex" data-id="jontjhl6t" data-path="src/components/ReferralSystem.tsx">
                <Input
                  value={referral.code}
                  readOnly
                  className="font-mono" data-id="gtwdffmoo" data-path="src/components/ReferralSystem.tsx" />

                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyReferralCode}
                  className="ml-2" data-id="3fjn62cbc" data-path="src/components/ReferralSystem.tsx">

                  <Copy className="w-4 h-4" data-id="bn49a912g" data-path="src/components/ReferralSystem.tsx" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2" data-id="etg46m2co" data-path="src/components/ReferralSystem.tsx">
              <label className="text-sm font-medium" data-id="p0gzyc4dc" data-path="src/components/ReferralSystem.tsx">Referral Link</label>
              <div className="flex" data-id="ayt3maoyn" data-path="src/components/ReferralSystem.tsx">
                <Input
                  value={`${window.location.origin}?ref=${referral.code}`}
                  readOnly
                  className="font-mono text-sm" data-id="0xwlk148p" data-path="src/components/ReferralSystem.tsx" />

                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyReferralLink}
                  className="ml-2" data-id="a6k90mewx" data-path="src/components/ReferralSystem.tsx">

                  <Copy className="w-4 h-4" data-id="2qqw0iaqc" data-path="src/components/ReferralSystem.tsx" />
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg" data-id="073kg48zz" data-path="src/components/ReferralSystem.tsx">
            <h4 className="font-semibold text-gray-800 mb-2" data-id="129hjpq9b" data-path="src/components/ReferralSystem.tsx">How It Works</h4>
            <ul className="text-sm text-gray-600 space-y-1" data-id="dtk8z9ut9" data-path="src/components/ReferralSystem.tsx">
              <li data-id="cj4b289s5" data-path="src/components/ReferralSystem.tsx">• Share your referral code or link with friends</li>
              <li data-id="9s3qkur5g" data-path="src/components/ReferralSystem.tsx">• When they sign up and start mining, you earn rewards</li>
              <li data-id="ero51skbh" data-path="src/components/ReferralSystem.tsx">• You receive 30% of their BM token mining rewards</li>
              <li data-id="lrcakp04l" data-path="src/components/ReferralSystem.tsx">• Rewards are automatically added to your account</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Commission Structure */}
      <Card data-id="do4rh7tki" data-path="src/components/ReferralSystem.tsx">
        <CardHeader data-id="dudalmp3v" data-path="src/components/ReferralSystem.tsx">
          <CardTitle data-id="97sz9e7b7" data-path="src/components/ReferralSystem.tsx">Commission Structure</CardTitle>
        </CardHeader>
        <CardContent data-id="cz0qcu99i" data-path="src/components/ReferralSystem.tsx">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-id="9vqu2oufb" data-path="src/components/ReferralSystem.tsx">
            <div className="space-y-4" data-id="cmc666o14" data-path="src/components/ReferralSystem.tsx">
              <h4 className="font-semibold text-gray-800" data-id="ozjx1e6ru" data-path="src/components/ReferralSystem.tsx">Referral Benefits</h4>
              <div className="space-y-3" data-id="ywxgpa84n" data-path="src/components/ReferralSystem.tsx">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg" data-id="bd1pxpnje" data-path="src/components/ReferralSystem.tsx">
                  <span className="font-medium" data-id="7v4xldsp2" data-path="src/components/ReferralSystem.tsx">Mining Rewards</span>
                  <Badge className="bg-blue-600" data-id="zm96xsphk" data-path="src/components/ReferralSystem.tsx">30%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg" data-id="whd3c5mtw" data-path="src/components/ReferralSystem.tsx">
                  <span className="font-medium" data-id="u13un92ej" data-path="src/components/ReferralSystem.tsx">Transaction Rewards</span>
                  <Badge className="bg-green-600" data-id="phtdwia7f" data-path="src/components/ReferralSystem.tsx">30%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg" data-id="l2f9suzbg" data-path="src/components/ReferralSystem.tsx">
                  <span className="font-medium" data-id="oew90mcl8" data-path="src/components/ReferralSystem.tsx">Auto-Mining</span>
                  <Badge className="bg-purple-600" data-id="k165hxrsh" data-path="src/components/ReferralSystem.tsx">30%</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4" data-id="58zafy9d6" data-path="src/components/ReferralSystem.tsx">
              <h4 className="font-semibold text-gray-800" data-id="mxn12fdyv" data-path="src/components/ReferralSystem.tsx">Payout Details</h4>
              <ul className="space-y-2 text-sm text-gray-600" data-id="unfhe197d" data-path="src/components/ReferralSystem.tsx">
                <li className="flex items-start" data-id="a0is16sah" data-path="src/components/ReferralSystem.tsx">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" data-id="u33i1wdy2" data-path="src/components/ReferralSystem.tsx"></span>
                  Instant reward distribution
                </li>
                <li className="flex items-start" data-id="8r6f1fll0" data-path="src/components/ReferralSystem.tsx">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" data-id="f32niz0c9" data-path="src/components/ReferralSystem.tsx"></span>
                  No minimum payout threshold
                </li>
                <li className="flex items-start" data-id="dxuaebw6t" data-path="src/components/ReferralSystem.tsx">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" data-id="nz41d1esm" data-path="src/components/ReferralSystem.tsx"></span>
                  Lifetime earnings tracking
                </li>
                <li className="flex items-start" data-id="jk0zcjlnz" data-path="src/components/ReferralSystem.tsx">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" data-id="gew8zv5xk" data-path="src/components/ReferralSystem.tsx"></span>
                  Multi-level referral support
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral Tips */}
      <Card data-id="htox2wpnc" data-path="src/components/ReferralSystem.tsx">
        <CardHeader data-id="zrleay0hy" data-path="src/components/ReferralSystem.tsx">
          <CardTitle data-id="sh32nkszo" data-path="src/components/ReferralSystem.tsx">Maximize Your Earnings</CardTitle>
        </CardHeader>
        <CardContent data-id="szjn6bo2v" data-path="src/components/ReferralSystem.tsx">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-id="wgapb69dl" data-path="src/components/ReferralSystem.tsx">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg" data-id="1g9rmt4ss" data-path="src/components/ReferralSystem.tsx">
              <h5 className="font-semibold text-blue-800 mb-2" data-id="92hwdve9p" data-path="src/components/ReferralSystem.tsx">Share on Social Media</h5>
              <p className="text-sm text-blue-700" data-id="4ym9z2zck" data-path="src/components/ReferralSystem.tsx">
                Share your referral link on Twitter, Facebook, and other platforms to reach more people.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg" data-id="c5fp1ye2n" data-path="src/components/ReferralSystem.tsx">
              <h5 className="font-semibold text-green-800 mb-2" data-id="1mspufiv9" data-path="src/components/ReferralSystem.tsx">Create Content</h5>
              <p className="text-sm text-green-700" data-id="of497ww3z" data-path="src/components/ReferralSystem.tsx">
                Write blogs, create videos, or tutorials about BlockMint to attract interested users.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg" data-id="zv781ygl0" data-path="src/components/ReferralSystem.tsx">
              <h5 className="font-semibold text-purple-800 mb-2" data-id="62fjkzfu6" data-path="src/components/ReferralSystem.tsx">Join Communities</h5>
              <p className="text-sm text-purple-700" data-id="0evvq5ler" data-path="src/components/ReferralSystem.tsx">
                Participate in crypto and DeFi communities to share your experience with BlockMint.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>);

};

export default ReferralSystem;