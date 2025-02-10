export interface User {
  id: number;
  username: string;
  email: string;
}

export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
} 