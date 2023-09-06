import { DataType, Project } from '@dakker/server/domain';
import { InfrastructureProvider, InjectionOptions } from './provider';
import { Provider } from '@nestjs/common';

export interface ProjectService {
  createProject(command: CreateProjectCommand): Promise<CreateProjectResult>;
}

export type CreateProjectCommand = {
  name: string;
  isActivated: boolean;
  fields: CreateProjectFieldParam[]
};

export type CreateProjectFieldParam = {
    name: string;
    dataType: DataType;
}

export type CreateProjectResult = {
  id: string;
  name: string;
  accessKey: string;
  isActivated: boolean;
  userId: string;
};

const ProjectService = Symbol('ProjectService');

export function ProjectServiceProvider(
  param: InjectionOptions<ProjectService>
): Provider<ProjectService> {
  return InfrastructureProvider(ProjectService, param);
}

export interface ProjectRepository {
  saveProject(
    name: string,
    isActivated: boolean,
    fields: SaveProjectFieldParam[]
  ): Promise<Project>;
}

export type SaveProjectFieldParam = {
  name: string;
  dataType: DataType;
};

export const ProjectRepository = Symbol('ProjectRepository');

export function ProjectRepositoryProvider(
  param: InjectionOptions<ProjectRepository>
): Provider<ProjectRepository> {
  return InfrastructureProvider(ProjectRepository, param);
}
