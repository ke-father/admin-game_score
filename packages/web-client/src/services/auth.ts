import request from '@/utils/request';
import type { LoginResponseData } from '@/types/api';

interface LoginParams {
  username: string;
  password: string;
  remember?: boolean;
}

export const login = (data: LoginParams) => {
  return request.post<any, LoginResponseData>('/auth/login', data);
};

interface RegisterParams {
  username: string;
  password: string;
  email: string;
}

export const register = (data: RegisterParams) => {
  return request.post<void>('/auth/register', data);
};
