import { AuthService } from '@dakker/server/application';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  RegisterResponse,
} from './auth.dto';

@Controller({ path: '/v1/auth' })
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('/login')
  async loginUser(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
    return await this.authService.login(loginRequest);
  }

  @Post('/register')
  async registerUser(
    @Body() registerRequest: RegisterRequest
  ): Promise<RegisterResponse> {
    return await this.authService.register(registerRequest);
  }

  @Post('/refresh')
  async refreshUser(
    @Body() refreshTokenRequest: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> {
    return await this.authService.refresh(refreshTokenRequest.refreshToken);
  }
}
