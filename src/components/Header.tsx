import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBlockMint } from '@/contexts/BlockMintContext';
import { Wallet, Clock } from 'lucide-react';
import { useAppKit, useAppKitAccount, useDisconnect } from '@reown/appkit/react';
import { useAddRefMutation, useLoginMutation } from '@/services/service';
import { AddRefPayload, AuthParams, IUser } from '@/types/types';
import { toast } from 'react-toastify';
import { AnimatePresence, motion } from 'motion/react';
import Sidebar from './Sidebar';
import { signMessage } from "@wagmi/core";
import { config } from '@/config';
import useUserState from '@/stores/user';
import { CookiesStorage } from '@/lib/cookie-storage';
import { StorageKeys } from '@/constants/storage-keys';
import { useAppStorage } from '@/hooks/useAppStorage';
interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { wallet, connectWallet: _connectWallet, disconnectWallet, isTransactionTime, timeLeft } = useBlockMint();
  const { open } = useAppKit(); // AppKit hook to open the modal
  const { address, isConnected } = useAppKitAccount() // AppKit hook to get the address and check if the user is connected
  const loginMutation = useLoginMutation();
  const addRefMutation = useAddRefMutation();
  const { disconnect } = useDisconnect();
  const [isShowAlerConnect, setIsShowAlerConnect] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);
  const { setUserInfo, setTradeReg } = useUserState();
  const { setItem } = useAppStorage();
  // const [userI, setUserI] = useState<IUser>();
  // const [res, setRes] = useState<any>()

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor(ms % (1000 * 60 * 60) / (1000 * 60));
    const seconds = Math.floor(ms % (1000 * 60) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // useEffect(() => {
  //   if (isConnected && address) {
  //     handleSignMessage(address)
  //   }
  // }, [isConnected, address]);

  const handleSignMessage = async (address: any) => {
    try {
      const result = await signMessage(config, {
        account: address,
        message: "bsc-block-explore",
      });
      // console.log(result, 'result')
      if (result) {
        const signature = result.slice(2);
        const payload = {
          address,
          r: "0x" + signature.substring(0, 64),
          s: "0x" + signature.substring(64, 128),
          v: "0x" + signature.substring(128, 130),
        };
        loginMutation.mutate(payload, {
          onSuccess: async (response: any) => {
            // setRes(response)
            if (response) {
              // console.log(response?.userdata, "response")
              // setUserI(response?.userdata)
              const refPayload: AddRefPayload = {
                address,
                ref: response?.userdata?.ref
              };
              setUserInfo(response?.userdata);
              CookiesStorage.setCookieData(StorageKeys.AddressToken, address);
              await setItem(StorageKeys.AddressToken, address);
              if (response?.tradeReg?.length > 0) {
                setTradeReg(response?.tradeReg[0])
                CookiesStorage.setCookieData(StorageKeys.TradeReq, JSON.stringify(response?.tradeReg[0]));
              }
              CookiesStorage.setCookieData(StorageKeys.UserInfo, JSON.stringify(response?.userdata));
              
              await setItem(StorageKeys.UserInfo, JSON.stringify(response?.userdata));
              addRefMutation.mutate(refPayload, {
                onSuccess: (response) => {

                },
                // onError: (err) => {
                //   toast.error(`${err?.message || "Invalid Data"} 👋`, {
                //     position: 'top-left',
                //   });
                // },
              });
              setIsShowAlerConnect(false)
            }
          },
          onError: (err) => {
            // toast.error(`${err?.message || "Invalid Data"} 👋`, {
            //   position: 'top-left',
            // });
          },
        });
      }
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
  const signAfterConnect = async () => {
    if (isShowAlerConnect && isConnected && address) {
      toast.success("Connect wallet success.", { position: "top-right" });
      // đợi 500ms cho provider attach xong
      await new Promise((r) => setTimeout(r, 500));
      await handleSignMessage(address);
    }
  };
  signAfterConnect();
}, [isConnected, address, isShowAlerConnect]);

  const handleDisconnect = async () => {
    CookiesStorage.clearSession();
    await disconnect();
    // Optionally, update UI or clear wallet info here
    // console.log('Wallet disconnected');
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 to-purple-800 text-white shadow-lg" data-id="n032jdi80" data-path="src/components/Header.tsx">
      <div className="container mx-auto px-4 py-4" data-id="32lgoaqr0" data-path="src/components/Header.tsx">
        <div className="flex items-center justify-between" data-id="2kcbia0ev" data-path="src/components/Header.tsx">
          <div className="flex items-center space-x-4" data-id="zi59p6g00" data-path="src/components/Header.tsx">
            <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent" data-id="nk6ggrbwa" data-path="src/components/Header.tsx">
              BlockMint
            </div>
            <div className='mr-1 hidden md:flex'>
              <Badge variant={isTransactionTime ? "default" : "secondary"} className="text-sm" data-id="u9xwpiupr" data-path="src/components/Header.tsx">
                <Clock className="w-4 h-4" data-id="6gm4zsndu" data-path="src/components/Header.tsx" />
                {isTransactionTime ? 'Trading Active' : `Next Window: ${formatTime(timeLeft)}`}
              </Badge>
            </div>
          </div>

          <div className='flex md:hidden'>
            <button onClick={toggleSidebar} className="text-4xl text-blue-500 focus:outline-none">
              ☰
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-4" data-id="45qntje6p" data-path="src/components/Header.tsx">
            {isConnected && address ?
              <div className="flex justify-between items-center space-x-3" data-id="cdl7etl7w" data-path="src/components/Header.tsx">
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
        <div className="flex md:hidden justify-between items-center space-x-4" data-id="45qntje6p" data-path="src/components/Header.tsx">
          {isConnected && address ?
            <div className="flex items-center space-x-3" data-id="cdl7etl7w" data-path="src/components/Header.tsx">
              <div className="text-sm" data-id="yyhnx3c07" data-path="src/components/Header.tsx">
                <div className="font-medium" data-id="ax2zrkwi9" data-path="src/components/Header.tsx">Connected</div>
                <div className="text-gray-300 font-mono text-xs" data-id="u80jns8dw" data-path="src/components/Header.tsx">
                  {/* <p>{JSON.stringify(userI)}</p>
                  <p>{'-----'}</p>
                   <p>{JSON.stringify(res)}</p> */}
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

        <div className='mr-1 flex md:hidden w-full mt-4'>
          <Badge variant={isTransactionTime ? "default" : "secondary"} className="text-sm w-full py-2" data-id="u9xwpiupr" data-path="src/components/Header.tsx">
            <Clock className="w-4 h-4 mr-1" data-id="6gm4zsndu" data-path="src/components/Header.tsx" />
            {isTransactionTime ? 'Trading Active' : `Next Window: ${formatTime(timeLeft)}`}
          </Badge>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay nền tối */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 min-h-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSidebar}
            />

            {/* Sidebar */}
            <motion.aside
              className="fixed top-0 left-0 w-64 h-full bg-gray-900 shadow-lg z-50 min-h-screen"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center p-4">
                <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent" data-id="nk6ggrbwa" data-path="src/components/Header.tsx">
                  BlockMint
                </div>
                <button onClick={closeSidebar} className="text-2xl">×</button>
              </div>
              <Sidebar activeTab={activeTab} onTabChange={onTabChange} closeSidebar={closeSidebar} />
              <div className=''>
                <Button
                  variant="outline"
                  size="sm"
                  // onClick={disconnectWallet}
                  onClick={handleDisconnect}
                  className="bg-transparent border-white text-white hover:bg-white/10" data-id="2ix97pnwn" data-path="src/components/Header.tsx">

                  Disconnect
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>);

};

export default Header;