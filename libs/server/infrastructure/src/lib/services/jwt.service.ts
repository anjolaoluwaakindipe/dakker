import {
  EnvConfigService,
  JwtPayload,
  JwtUtilService,
  UserRepository,
} from '@dakker/server/application';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtUtilServiceImpl implements JwtUtilService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(EnvConfigService) private readonly configService: EnvConfigService,
    @Inject(UserRepository) private readonly userRepository: UserRepository
  ) {}

  async generateAccessToken(payload: JwtPayload): Promise<string> {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.getAccessTokenDuration(),
      secret: this.configService.getAccessTokenSecret(),
    });
    return accessToken;
  }

  async generateRefreshToken(payload: JwtPayload): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.getRefreshTokenDuration(),
      secret: this.configService.getRefreshTokenSecret(),
    });
    return refreshToken;
  }

  async verifyRefreshToken(refreshToken: string): Promise<JwtPayload> {
    const jwtPayload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.getRefreshTokenSecret(),
    });

    if (!this.userRepository.findUserById(jwtPayload.userId)) {
      throw new Error();
    }

    return {
      email: jwtPayload.email,
      firstname: jwtPayload.firstname,
      lastname: jwtPayload.lastname,
      userId: jwtPayload.userId,
    };
  }
}
