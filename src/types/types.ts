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
  isAuto: boolean;
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

export interface IRegister {
  _id: string;
  address: string;
  status: string;
  amount: number;
  block: number;
  createdAt: string;
  updatedAt: string;
}

export interface IRegisterPayload {
  address: string;
  amount: number;
  block: number;
  r: string;
  s: string;
  v: string;
}

export interface IGetRegisterPayload {
  address: string;
}

export interface IGetRegister {
  address: string;
}

export interface IBlock {
  status: string;
  _id: string;
  number: string;
  hash: string;
  tnx: number;
  createdAt: string;
  updatedAt: string;
  amount: number;
}

export interface IMinningPayload {
  address: string;
  isAuto: boolean;
  r: string;
  s: string;
  v: string;
}
export interface ISwap {
  address: string;
  amount: number;
  r: string;
  s: string;
  v: string;
}

export interface ISendTransaction {
  address: string;
  toAddress: string;
  amount: number;
  r: string;
  s: string;
  v: string;
}

export interface IHistories {
  address: string;
  amount: number;
  cointype: string;
  createdAt: string;
  status: string;
  timeCollect: number;
  tx: string;
  typeData: string;
  updatedAt: string;
  _id: string;
  from: string;
  blockNumber?: string
}