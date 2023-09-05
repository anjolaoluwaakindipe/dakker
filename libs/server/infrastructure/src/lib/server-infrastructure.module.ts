import {
  JwtUtilService,
  JwtUtilServiceProvider,
  UnitOfWorkService,
  UnitOfWorkServiceProvider,
  UserRepository,
  UserRepositoryProvider,
} from '@dakker/server/application';
import { Global, Module } from '@nestjs/common';
import { AppConfigModule } from './config/env/env.config';
import { UserRepositoryPrismaImpl } from './persistence/user.repository';
import { JwtUtilServiceImpl } from './services/jwt.service';
import { JwtConfigModule } from './config/jwt/jwt.config';
import { DbConfigModule } from './config/db/db.config';
import { UnitOfWorkServiceImpl } from './services/unitOfWork.service';

@Global()
@Module({
  imports: [AppConfigModule, JwtConfigModule, DbConfigModule],
  providers: [
    JwtUtilServiceProvider({ useClass: JwtUtilServiceImpl }),
    UserRepositoryProvider({
      useClass: UserRepositoryPrismaImpl,
    }),
    UnitOfWorkServiceProvider({ useClass: UnitOfWorkServiceImpl }),
  ],
  exports: [UserRepository, JwtUtilService, UnitOfWorkService],
})
export class ServerInfrastructureModule {}
