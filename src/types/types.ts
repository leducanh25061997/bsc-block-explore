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