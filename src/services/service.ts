import { API_URL } from '@/constants/common';
import { AddRefPayload, AuthParams } from '@/types/types';
import { request } from '@/utils/request';
import { useQuery, useMutation } from '@tanstack/react-query';

export const login = (data: AuthParams) => request.post(API_URL + '/login', data);
export const addRef = (data: AddRefPayload) => request.post(API_URL + '/login', data);

// Mutation
export const useLoginMutation = () => useMutation({ mutationFn: login });
export const useAddRefMutation = () => useMutation({ mutationFn: addRef });