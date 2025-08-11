import { API_URL } from '@/constants/common';
import { AddRefPayload, AddTransitionPayload, AuthParams } from '@/types/types';
import { request } from '@/utils/request';
import { useQuery, useMutation } from '@tanstack/react-query';

export const login = (data: AuthParams) => request.post(API_URL + '/login', data);
export const addRef = (data: AddRefPayload) => request.post(API_URL + '/addRef', data);
export const addTransition = (data: AddTransitionPayload) => request.post(API_URL + '/addtransition', data);
export const getMainConfig = () => request.get(API_URL + '/getMainConfig');

// Mutation
export const useLoginMutation = () => useMutation({ mutationFn: login });
export const useAddRefMutation = () => useMutation({ mutationFn: addRef });
export const useAddTransitionMutation = () => useMutation({ mutationFn: addTransition });

// Query
export const useQueryGetMainConfig = (options = {}) => useQuery({ queryKey: ['GET_APY'], queryFn: () => getMainConfig(), ...options });