import { Provider } from '@nestjs/common';
import { InfrastructureProvider, InjectionOptions } from './provider';

export interface UnitOfWorkService<T> {
  getTransactionManager(): T;
  doTransaction<R>(fn: () => Promise<R>): Promise<R>;
}

export const UnitOfWorkService = Symbol('UnitOfWorkSevice');

export function UnitOfWorkServiceProvider<T>(
  param: InjectionOptions<UnitOfWorkService<T>>
): Provider<UnitOfWorkService<T>> {
  return InfrastructureProvider(UnitOfWorkService, param);
}
