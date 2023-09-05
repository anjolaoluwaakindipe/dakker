import {
  ClassProvider,
  ExistingProvider,
  FactoryProvider,
  InjectionToken,
  Provider,
  ValueProvider,
} from '@nestjs/common';

export type InjectionOptions<T> =
  | Omit<ValueProvider<T>, 'provide'>
  | Omit<ClassProvider<T>, 'provide'>
  | Omit<ExistingProvider<T>, 'provide'>
  | Omit<FactoryProvider<T>, 'provide'>;
  
export function InfrastructureProvider<T>(
  repositorySymbol: InjectionToken,
  injectionOptions: InjectionOptions<T>
): Provider<T> {
  return {
    ...injectionOptions,
    provide: repositorySymbol,
  };
}
