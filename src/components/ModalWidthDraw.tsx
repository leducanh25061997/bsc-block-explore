import { useEffect, useState } from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useAppKitAccount } from '@reown/appkit/react';
import useUserState from "@/stores/user"
import { useSendTransactionMutation } from "@/services/service"
import { ISendTransaction } from "@/types/types"
import { toast as ToastCus } from 'react-toastify';

export const ModalWidthDraw: React.FC<{ setIsModal: (v: boolean) => void}> = ({ setIsModal }) => {
  const [fromWallet, setFromWallet] = useState<string>('');
  const [toAddress, setToAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const sendTransactionMutation = useSendTransactionMutation();

  const { address, isConnected } = useAppKitAccount();
  const { userInfo, setTradeReg } = useUserState();

  useEffect(() => {
    if (userInfo) {
      setFromWallet(userInfo?.secondAddress)
    }
  }, [userInfo])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const onlyNumbers = e.target.value.replace(/\D/g, "");
    const raw = e.target.value;
    const onlyNumsAndDot = raw.replace(/[^0-9.]/g, "");
    const finalValue = onlyNumsAndDot.replace(/(\..*)\./g, "$1");
    setAmount(finalValue);
  };

  const handleWithdrawMoney = () => {
    if (userInfo) {
      const payload: ISendTransaction = {
        address: userInfo.secondAddress,
        // amount: Number(gereralBalance),
        amount: Number(amount),
        r: userInfo.r,
        s: userInfo.s,
        v: userInfo.v,
        toAddress: userInfo.address
      }
      sendTransactionMutation.mutate(
        payload,
        {
          onSuccess: (res) => {
            // console.log(res, "res?.tradeReg")
            setIsModal(false);
            ToastCus.success('Withdraw success.', {
              position: 'top-right',
            });
          }
        }
      )
    }
  }

  return (
    <div className="space-y-6" data-id="v2rozbpqe" data-path="src/components/TransactionForm.tsx">
      <div className="text-center mb-8" data-id="mgrkw7flx" data-path="src/components/TransactionForm.tsx">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4" data-id="krjv2wg5h" data-path="src/components/TransactionForm.tsx">
          Withdraw
        </h1>
      </div>
      <Card className="max-w-2xl mx-auto" data-id="k7zele95q" data-path="src/components/TransactionForm.tsx">
        <CardContent data-id="ahquk4paq" data-path="src/components/TransactionForm.tsx">
          {/* <form onSubmit={handleSubmit} className="space-y-6" data-id="05p6tfiv2" data-path="src/components/TransactionForm.tsx"> */}
          <div className="space-y-2 mt-2" data-id="t3zmkvl9i" data-path="src/components/TransactionForm.tsx">
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
                  {/* <Badge variant="outline" className="ml-2" data-id="tbk8p1i94" data-path="src/components/TransactionForm.tsx">Max: 100 USDT</Badge> */}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 mt-2" data-id="f7na95ev6" data-path="src/components/TransactionForm.tsx">
            <Label htmlFor="toAddress" data-id="5d07kxyqc" data-path="src/components/TransactionForm.tsx">To Address</Label>
            <Input
              id="toAddress"
              type="text"
              placeholder="0x..."
              // disabled
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              required
              className="font-mono" data-id="u54jok10s" data-path="src/components/TransactionForm.tsx" />

          </div>

          <div className="space-y-2 mt-2" data-id="hz9tul1c4" data-path="src/components/TransactionForm.tsx">
            <Label htmlFor="amount" data-id="ias0dzrsn" data-path="src/components/TransactionForm.tsx">Amount (BNB)</Label>
            <Input
              id="amount"
              type="number"
              step="0.001"
              min="0.001"
              placeholder="0.0"
              value={amount}
              onChange={handleChange}
              required data-id="x45f0n2k7" data-path="src/components/TransactionForm.tsx" 
            />
          </div>


          <Button
            // type="submit"
            // onClick={() => {
            //   if (isDisabled) {
            //     if (!hasTodayData(registerValue)) {
            //       handleRegister()
            //     }
            //   } else {
            //     handleTranfer()
            //   }
            // }}
            onClick={handleWithdrawMoney}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 disabled:from-blue-300 disabled:to-purple-300 mt-4"
            // disabled={Number(amount) > 0 ? false : hasTodayData(registerValue)}
            data-id="y516kwf8c"
            data-path="src/components/TransactionForm.tsx"
          >
            {"Withdraw"}
            {/* {isDisabled ? "Register" : "Trading Window Closed"} */}
          </Button>
          {/* </form> */}
        </CardContent>
      </Card>
    </div>
  )
}
