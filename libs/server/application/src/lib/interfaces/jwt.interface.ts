import { Provider } from '@nestjs/common';
import { InfrastructureProvider, InjectionOptions } from './provider';

export interface JwtUtilService {
  generateAccessToken(payload: JwtPayload): Promise<string>;
  generateRefreshToken(payload: JwtPayload): Promise<string>;
  verifyRefreshToken(refreshToken:string): Promise<JwtPayload>;
}

export type JwtPayload = {
  email: string;
  userId: string;
  firstname: string;
  lastname: string;
};

export const JwtUtilService = 'JwtUtilService';

export function JwtUtilServiceProvider(
  param: InjectionOptions<JwtUtilService>
): Provider<JwtUtilService> {
  return InfrastructureProvider(JwtUtilService, param) 
}
