import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}

export class LoginResponse {
  firstname: string;
  lastname: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export class RegisterRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  firstname: string;
}

export class RegisterResponse {
  firstname: string;
  lastname: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export class RefreshTokenRequest {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}

export class RefreshTokenResponse {
  firstname: string;
  lastname: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}
