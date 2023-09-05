import { EnvConfigService } from '@dakker/server/application';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataPoint, Field, Project, User, Device } from '@dakker/server/domain';
import { Environment } from '../env/env.config';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (envConfigService: EnvConfigService) => ({
        type: 'postgres',
        url: envConfigService.getDatabaseUrl(),
        entities: [DataPoint, Field, Project, User, Device],
        synchronize:
          envConfigService.getEnvironment() === Environment.Development,
        logging: envConfigService.getEnvironment() === Environment.Development,
        migrations: [`${__dirname}/migrations/*{.ts,.js}`],
        migrationsTableName: 'migraitions',
      }),
      inject: [EnvConfigService],
    }),
  ],
  providers: [PrismaService],
  exports: [TypeOrmModule],
})
export class DbConfigModule {}
