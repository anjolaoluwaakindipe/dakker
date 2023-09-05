import {
  ConflictException,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import {
  JwtPayload,
  JwtUtilService,
  UnitOfWorkService,
  UserRepository,
} from '../interfaces';
import {
  AuthResult,
  AuthService,
  LoginQuery,
  LoginResult,
  RegisterCommand,
  RegisterResult,
} from '../interfaces/auth.interface';
import * as bcrypt from 'bcrypt';
import { EntityManager } from 'typeorm';

export class AuthServiceImpl implements AuthService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(JwtUtilService) private readonly jwtUtilService: JwtUtilService,
    @Inject(UnitOfWorkService)
    private readonly uowService: UnitOfWorkService<EntityManager>
  ) {}

  async login(param: LoginQuery): Promise<LoginResult> {
    const user = await this.userRepository.findUserByEmail(param.email);

    if (!user || !(await bcrypt.compare(param.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid Email or password');
    }

    const payload = {
      email: user.email,
      userId: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
    };

    return {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      accessToken: await this.jwtUtilService.generateAccessToken(payload),
      refreshToken: await this.jwtUtilService.generateRefreshToken(payload),
    };
  }

  async register(param: RegisterCommand): Promise<RegisterResult> {
    const existingUser = await this.userRepository.findUserByEmail(param.email);
    console.log(existingUser);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    return await this.uowService.doTransaction(async () => {
      const passwordhash = await bcrypt.hash(param.password, 10);

      const newUser = await this.userRepository.saveUser(
        param.email,
        passwordhash,
        param.firstname,
        param.lastname
      );

      const payload = {
        email: newUser.email,
        userId: newUser.id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
      };
      return {
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        accessToken: await this.jwtUtilService.generateAccessToken(payload),
        refreshToken: await this.jwtUtilService.generateRefreshToken(payload),
      };
    });
  }

  async refresh(refreshToken: string): Promise<AuthResult> {
    let userPayload: JwtPayload;

    try {
      userPayload = await this.jwtUtilService.verifyRefreshToken(refreshToken);
    } catch (err) {
      throw new UnauthorizedException('Invalid Refresh Token');
    }

    return {
      firstname: userPayload.firstname,
      lastname: userPayload.lastname,
      email: userPayload.email,
      accessToken: await this.jwtUtilService.generateAccessToken(userPayload),
      refreshToken: await this.jwtUtilService.generateRefreshToken(userPayload),
    };
  }
}
