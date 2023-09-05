import { Global, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerInfrastructureModule } from '@dakker/server/infrastructure';
import { ServerApplicationModule } from '@dakker/server/application';
import { AuthModule } from './domain/auth/auth.module';

@Module({
  imports: [ServerInfrastructureModule, ServerApplicationModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
