import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  exports: [JwtModule],
})
export class JwtConfigModule {}
