import { Inject } from '@nestjs/common';
import {
  CreateProjectCommand,
  CreateProjectResult,
  ProjectRepository,
  ProjectService,
} from '../interfaces/project.interface';

export class ProjectServiceImpl implements ProjectService {
  constructor(
    @Inject(ProjectRepository) private readonly projectRepo: ProjectRepository
  ) {}

  async createProject(
    command: CreateProjectCommand
  ): Promise<CreateProjectResult> {
    const savedProject = await this.projectRepo.saveProject(
      command.name,
      command.isActivated,
      command.fields
    );

    return {
      accessKey: savedProject.accesskey,
      id: savedProject.id,
      isActivated: savedProject.isActivated,
      name: savedProject.name,
      userId: (await savedProject.user).id,
    };
  }
}
