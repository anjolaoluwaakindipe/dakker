import { Provider } from '@nestjs/common';
import { InfrastructureProvider, InjectionOptions } from './provider';

export interface EnvConfigService {
  getAccessTokenDuration(): string;
  getAccessTokenSecret(): string;
  getRefreshTokenSecret(): string;
  getRefreshTokenDuration(): string;
  getDatabaseUrl():string;
  getPort(): number;
  getEnvironment(): string;
}

export const EnvConfigService = Symbol('EnvConfigService');

export function EnvConfigServiceProvider(
  param: InjectionOptions<EnvConfigService>
): Provider<EnvConfigService> {
  return InfrastructureProvider(EnvConfigService, param);
}
