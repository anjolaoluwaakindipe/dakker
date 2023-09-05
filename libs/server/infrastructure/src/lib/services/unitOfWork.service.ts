import { UnitOfWorkService } from '@dakker/server/application';
import { Injectable, Scope } from '@nestjs/common';
import { EntityManager, QueryRunner } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class UnitOfWorkServiceImpl implements UnitOfWorkService<EntityManager> {
  constructor(private entityManager: EntityManager) {}

  getTransactionManager(): EntityManager {
    return this.entityManager;
  }
  doTransaction<R>(fn: () => Promise<R>): Promise<R> {
    const previousManager = this.entityManager;
    const result = this.entityManager.transaction(
      async (transactionEntityManager) => {
        this.entityManager = transactionEntityManager;
        return await fn();
      }
    );
    this.entityManager = previousManager;
    return result;
  }
}
