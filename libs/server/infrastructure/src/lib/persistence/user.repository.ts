import { UnitOfWorkService, UserRepository } from '@dakker/server/application';
import { User } from '@dakker/server/domain';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../config/db/prisma.service';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UserRepositoryPrismaImpl implements UserRepository {
  constructor(
    @Inject(UnitOfWorkService)
    private readonly uowService: UnitOfWorkService<EntityManager>
  ) {}
  async saveUser(
    email: string,
    passwordHash: string,
    firstname: string,
    lastname: string
  ): Promise<User> {
    const newUser = await this.uowService
      .getTransactionManager()
      .getRepository(User)
      .save({
        email,
        passwordHash,
        firstname,
        lastname,
      });
    return newUser;
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.uowService
      .getTransactionManager()
      .getRepository(User)
      .findOne({ where: { id: id } });
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.uowService
      .getTransactionManager()
      .getRepository(User)
      .findOne({
        where: { email: email },
      });
    return user;
  }
}
