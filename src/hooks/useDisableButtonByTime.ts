import { StorageKeys } from "@/constants/storage-keys";
import { CookiesStorage } from "@/lib/cookie-storage";
import useUserState from "@/stores/user";
import { useEffect, useState } from "react";

export function useDisableButtonByTime(startHour: number, endHour: number) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [nextCheck, setNextCheck] = useState<Date | null>(null);
  const { setUserInfo, setTradeReg } = useUserState();


  const checkTime = () => {
    
    const now = new Date();
    const hours = now.getHours();

    if (hours >= startHour && hours < endHour) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
    // console.log(hours, 'hours')
    if (hours >= 21) {
      setTradeReg(null);
      CookiesStorage.clearCookieData(StorageKeys.TradeReq);
      // console.log("Cookie setTradeReg removed at", now.toLocaleTimeString());
    }

    const next = new Date(now.getTime() + 60 * 60 * 1000);
    setNextCheck(next);
  };

  useEffect(() => {
    checkTime(); 

    const interval = setInterval(() => {
      checkTime();
      // console.log("Cron check at:", new Date().toLocaleTimeString());
    }, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [startHour, endHour]);

  return { isDisabled, nextCheck };
}
