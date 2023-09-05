import { Provider } from '@nestjs/common';
import { InjectionOptions, InfrastructureProvider } from './provider';
export interface AuthService {
  login(param: LoginQuery): Promise<LoginResult>;
  register(param: RegisterCommand): Promise<RegisterResult>;
  refresh(refreshToken: string): Promise<AuthResult>;
}

export const AuthService = Symbol('AuthService');

export type AuthResult = {
  email: string;
  firstname: string;
  lastname: string;
  accessToken: string;
  refreshToken: string;
};

export type LoginQuery = {
  email: string;
  password: string;
};

export type LoginResult = AuthResult;

export type RegisterCommand = {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
};

export type RegisterResult = AuthResult;

export function AuthServiceProvider(
  param: InjectionOptions<AuthService>
): Provider<AuthService> {
  return InfrastructureProvider(AuthService, param);
}
