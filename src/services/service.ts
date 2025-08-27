import { API_URL } from '@/constants/common';
import { AddRefPayload, AddTransitionPayload, AuthParams, IBlock, IGetRegister, IGetRegisterPayload, IMinningPayload, IPlatformStatistics, IRegister, IRegisterPayload, ISendTransaction, ISwap, IUser } from '@/types/types';
import { request } from '@/utils/request';
import { useQuery, useMutation } from '@tanstack/react-query';

export const login = (data: AuthParams): Promise<{ data: { userdata: IUser }}> => request.post(API_URL + '/login', data);
export const addRef = (data: AddRefPayload) => request.post(API_URL + '/addRef', data);
export const addTransition = (data: AddTransitionPayload) => request.post(API_URL + '/addtransition', data);
export const getMainConfig = (): Promise<{ configdata: IPlatformStatistics }> => request.post(API_URL + '/getMainConfig');
export const getHistory = () => request.post(API_URL + '/history');
export const sendTransaction = (data: ISendTransaction) => request.post(API_URL + '/sendTransaction', data);
export const register = (data: IRegisterPayload): Promise<{ tradeReg: Array<IRegister> }> => request.post(API_URL + '/register', data);
export const getRegister = (data: IGetRegisterPayload): Promise<{ tradeReg: Array<IRegister> }> => request.post(API_URL + '/getRegister', data);
export const getBlocks = (): Promise<{blocks: Array<IBlock> }> => request.post(API_URL + '/getBlocks');
export const createMinning = (data: IMinningPayload): Promise<{ userdata: IUser }> => request.post(API_URL + '/minning', data);
export const swap = (data: ISwap): Promise<{ userdata: IUser }> => request.post(API_URL + '/swap', data);

// Mutation
export const useLoginMutation = () => useMutation({ mutationFn: login });
export const useAddRefMutation = () => useMutation({ mutationFn: addRef });
export const useAddTransitionMutation = () => useMutation({ mutationFn: addTransition });
export const useGetMainConfigMutation = () => useMutation({ mutationFn: getMainConfig });
export const useGetHistoryMutation = () => useMutation({ mutationFn: getHistory });
export const useSendTransactionMutation = () => useMutation({ mutationFn: sendTransaction });
export const useSendRegisterMutation = () => useMutation({ mutationFn: register });
export const useCreateMinningMutation = () => useMutation({ mutationFn: createMinning });
export const useSendGetRegisterMutation = () => useMutation({ mutationFn: getRegister });
export const useSwapMutation = () => useMutation({ mutationFn: swap });

// Query
// export const useQueryGetMainConfig = (options = {}) => useQuery({ queryKey: ['GET_APY'], queryFn: () => getMainConfig(), ...options });