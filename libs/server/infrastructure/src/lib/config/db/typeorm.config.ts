import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { EnvironmentVariables } from '../env/env.config';
import { DataPoint, Device, Field, Project, User } from '@dakker/server/domain';

config();

const configService = new ConfigService<EnvironmentVariables, true>();

export default new DataSource({
  type: 'postgres',
  url: configService.get<string>('DATABASE_URL'),
  entities: [DataPoint, Field, Project, User, Device],
  synchronize: configService.get('NODE_ENV') === 'development',
  logging: configService.get('NODE_ENV') === 'development',
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  migrationsTableName: 'migraitions',
});
