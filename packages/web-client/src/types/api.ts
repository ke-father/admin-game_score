// 通用响应类型
export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

// 登录响应数据类型
export interface LoginResponseData {
  token: string;
  user: {
    username: string;
    role: string;
  };
}

// 其他响应数据类型可以继续在这里添加... 