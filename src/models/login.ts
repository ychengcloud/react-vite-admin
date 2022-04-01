/** user's role */
export type Role = 'guest' | 'admin';

export interface LoginParams {
  /** 用户名 */
  user_name: string;
  /** 用户密码 */
  user_password: string;
}

export interface LoginResult {
  statue: number;
  data: any;
  username?: string;
  role: Role;
  errorMessage?: string;
}

export interface LogoutParams {
  token: string;
}

export interface LogoutResult {}
