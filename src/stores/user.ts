import { IUser } from '@/types/types';
import { create } from 'zustand';


interface UserState {
  userInfo: IUser | null;
  setUserInfo: (userInfo: IUser | null) => void;
}

const useUserState = create<UserState>(set => ({
  userInfo: null,
  setUserInfo: (userInfo: IUser) => set({ userInfo }),
}));

export default useUserState;