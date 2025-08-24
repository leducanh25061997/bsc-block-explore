import { IRegister, IUser } from '@/types/types';
import { create } from 'zustand';


interface UserState {
  userInfo: IUser | null;
  setUserInfo: (userInfo: IUser | null) => void;
  tradeReg: IRegister | null;
  setTradeReg: (userInfo: IRegister | null) => void;
}

const useUserState = create<UserState>(set => ({
  userInfo: null,
  setUserInfo: (userInfo: IUser) => set({ userInfo }),
  tradeReg: null,
  setTradeReg: (tradeReg: IRegister) => set({ tradeReg }),
}));

export default useUserState;