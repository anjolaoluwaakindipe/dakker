import { Global, Module } from '@nestjs/common';
import { AuthServiceProvider } from './interfaces';
import { AuthServiceImpl } from './services/auth.service';
import { AuthService } from './interfaces/auth.interface';

@Global()
@Module({
  providers: [AuthServiceProvider({ useClass: AuthServiceImpl })],
  exports: [AuthService],
})
export class ServerApplicationModule {}
