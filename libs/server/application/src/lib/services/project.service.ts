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
    return {
      accessKey: '',
      id: '',
      isActivated: false,
      name: '',
      userId: '',
    };
  }
}
