import {
  ProjectRepository,
  SaveProjectFieldParam,
  UnitOfWorkService,
} from '@dakker/server/application';
import { Field, Project } from '@dakker/server/domain';
import { Inject, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class ProjectRepositoryImpl implements ProjectRepository {
  constructor(
    @Inject(UnitOfWorkService)
    private readonly uowService: UnitOfWorkService<EntityManager>
  ) {}

  async saveProject(
    name: string,
    isActivated: boolean,
    fields: SaveProjectFieldParam[]
  ): Promise<Project> {
    return await this.uowService
      .getTransactionManager()
      .getRepository(Project)
      .save({
        name,
        isActivated,
        fields: fields.map<Field>((field) => {
          const newField = new Field();
          (newField.name = field.name), (newField.dataType = field.dataType);
          return newField;
        }),
      });
  }
}
