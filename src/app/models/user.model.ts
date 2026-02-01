export interface User {
  id?: number;
  username: string;
  password?: string;
  created_at?: Date;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    userId: number;
    username: string;
  };
}
