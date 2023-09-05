import { User } from '@dakker/server/domain';
import { Provider } from '@nestjs/common';
import { InfrastructureProvider, InjectionOptions } from './provider';

export interface UserRepository {
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  saveUser(email:string, passwordHash:string, firstname:string, lastname:string): Promise<User>
}

export const UserRepository = 'UserRepository';

export function UserRepositoryProvider(
  param: InjectionOptions<UserRepository>
): Provider {
  return InfrastructureProvider(UserRepository, param);
}
