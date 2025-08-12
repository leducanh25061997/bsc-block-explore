export interface AuthParams {
  address: string;
}

export interface AddRefPayload {
  address: string;
  ref: string;
}

export interface AddTransitionPayload {
  address: string;
  transaction: string;
}

export interface IUser {
  address: string;
  blockNumber: number;
  coin: number;
  coinLock: number;
  createdAt: string;
  gotRef: number;
  isClaimDaily: boolean;
  not: number;
  poly: number;
  polyFriend: number;
  password: string;
  polyUnlock: number;
  privateKey: string;
  r: string;
  ref: string;
  secondAddress: string;
  tele_id: string;
  txPoly: string;
  usdtClaim: number;
  v: string;
  s: string;
  _id: string;
}

export interface IPlatformStatistics {
  avgTrans: number;
  lockedToken: number;
  price: number;
  totalAmountTransaction: number;
  totalBlock: number;
  totalSwap: number;
  totalToken: number;
  totalTokenBM: number;
  totalTransaction: number;
  totalUnlockToken: number;
  totalWithdraw: number;
  unlockToken: number;
  _id: string;
  createdAt: string;
}