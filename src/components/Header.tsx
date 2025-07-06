import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBlockMint } from '@/contexts/BlockMintContext';
import { Wallet, Clock } from 'lucide-react';
import { useAppKit, useAppKitAccount, useDisconnect } from '@reown/appkit/react';
import { useAddRefMutation, useLoginMutation } from '@/services/service';
import { AddRefPayload, AuthParams } from '@/types/types';
import { toast } from 'react-toastify';

const Header: React.FC = () => {
  const { wallet, connectWallet, disconnectWallet, isTransactionTime, timeLeft } = useBlockMint();
  const { open } = useAppKit(); // AppKit hook to open the modal
  const { address, isConnected } = useAppKitAccount() // AppKit hook to get the address and check if the user is connected
  const loginMutation = useLoginMutation();
  const addRefMutation = useAddRefMutation();
  const { disconnect } = useDisconnect();
  const [isShowAlerConnect, setIsShowAlerConnect] = useState<boolean>(false);

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor(ms % (1000 * 60 * 60) / (1000 * 60));
    const seconds = Math.floor(ms % (1000 * 60) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isShowAlerConnect && isConnected && address) {
      toast.success('Connect wallet success.', {
        position: 'top-right',
      });
      const payload: AuthParams = { address};
      try {
        loginMutation.mutate(payload, {
          onSuccess: (response: any) => {
            if (response) {
              // console.log(response, "response")
              const refPayload: AddRefPayload = {
                address,
                ref: response?.userdata?.ref
              };
              addRefMutation.mutate(refPayload, {
                onSuccess: (response) => {

                },
                onError: (err) => {
                  toast.error(`${err?.message || "Invalid Data"} 👋`, {
                    position: 'top-left',
                  });
                },
              });
              setIsShowAlerConnect(false)
            }
          },
          onError: (err) => {
            toast.error(`${err?.message || "Invalid Data"} 👋`, {
              position: 'top-left',
            });
          },
        });
      } catch (error) {
        console.log(error)
      }
    }
  }, [isConnected, address, isShowAlerConnect]);

  const handleDisconnect = async () => {
    await disconnect();
    // Optionally, update UI or clear wallet info here
    console.log('Wallet disconnected');
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 to-purple-800 text-white shadow-lg" data-id="n032jdi80" data-path="src/components/Header.tsx">
      <div className="container mx-auto px-4 py-4" data-id="32lgoaqr0" data-path="src/components/Header.tsx">
        <div className="flex items-center justify-between" data-id="2kcbia0ev" data-path="src/components/Header.tsx">
          <div className="flex items-center space-x-4" data-id="zi59p6g00" data-path="src/components/Header.tsx">
            <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent" data-id="nk6ggrbwa" data-path="src/components/Header.tsx">
              BlockMint
            </div>
            <Badge variant={isTransactionTime ? "default" : "secondary"} className="text-sm" data-id="u9xwpiupr" data-path="src/components/Header.tsx">
              <Clock className="w-4 h-4 mr-1" data-id="6gm4zsndu" data-path="src/components/Header.tsx" />
              {isTransactionTime ? 'Trading Active' : `Next Window: ${formatTime(timeLeft)}`}
            </Badge>
          </div>

          <div className="flex items-center space-x-4" data-id="45qntje6p" data-path="src/components/Header.tsx">
            {isConnected && address ?
              <div className="flex items-center space-x-3" data-id="cdl7etl7w" data-path="src/components/Header.tsx">
                <div className="text-sm" data-id="yyhnx3c07" data-path="src/components/Header.tsx">
                  <div className="font-medium" data-id="ax2zrkwi9" data-path="src/components/Header.tsx">Connected</div>
                  <div className="text-gray-300 font-mono text-xs" data-id="u80jns8dw" data-path="src/components/Header.tsx">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  // onClick={disconnectWallet}
                  onClick={handleDisconnect}
                  className="bg-transparent border-white/20 text-white hover:bg-white/10" data-id="2ix97pnwn" data-path="src/components/Header.tsx">

                  Disconnect
                </Button>
              </div> :

              <Button
                // onClick={connectWallet}
                // onClick={() => {
                //   toast.success('Hey 👋!', {
                //     position: 'top-right',
                //   });
                // }}
                onClick={() => {
                  setIsShowAlerConnect(true);
                  open();
                }}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:from-yellow-500 hover:to-orange-600" data-id="a0glzvvwj" data-path="src/components/Header.tsx">

                <Wallet className="w-4 h-4 mr-2" data-id="1khgn0el7" data-path="src/components/Header.tsx" />
                Connect Wallet
              </Button>
            }
          </div>
        </div>
      </div>
    </header>);

};

export default Header;