import {
  EnvConfigService,
  EnvConfigServiceProvider,
} from '@dakker/server/application';
import { Global, Injectable, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

export class EnvironmentVariables {
  @IsString()
  DATABASE_URL!: string;

  @IsEnum(Environment)
  NODE_ENV!: Environment;

  @IsNumber()
  PORT!: number;

  @IsString()
  ACCESS_TOKEN_DURATION!: string;

  @IsString()
  ACCESS_TOKEN_SECRET!: string;
  @IsString()
  REFRESH_TOKEN_DURATION!: string;
  @IsString()
  REFRESH_TOKEN_SECRET!: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

@Injectable()
export class EnvConfigServiceImpl implements EnvConfigService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables, true>
  ) {}
  getDatabaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL');
  }
  getPort(): number {
    return this.configService.get<number>('PORT');
  }
  getEnvironment(): string {
    return this.configService.get<Environment>('NODE_ENV');
  }

  getAccessTokenDuration(): string {
    return this.configService.get<string>('ACCESS_TOKEN_DURATION');
  }
  getAccessTokenSecret(): string {
    return this.configService.get<string>('ACCESS_TOKEN_SECRET');
  }
  getRefreshTokenSecret(): string {
    return this.configService.get<string>('REFRESH_TOKEN_SECRET');
  }
  getRefreshTokenDuration(): string {
    return this.configService.get<string>('REFRESH_TOKEN_DURATION');
  }
}

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env['NODE_ENV'] === 'production',
      envFilePath: `${process.cwd}/.env.${process.env['NODE_ENV']}`,
      cache: true,
      validate,
    }),
  ],
  providers: [EnvConfigServiceProvider({ useClass: EnvConfigServiceImpl })],
  exports: [EnvConfigService],
})
export class AppConfigModule {}
