import { Device as DeviceSchema } from '@prisma/client';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user';
import { Project } from './project';

// export type Device = DeviceSchema;

@Entity()
@Unique(['name', 'project'])
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  name: string;

  @Column({ type: 'uuid', unique: true })
  @Generated('uuid')
  securityKey: string;

  @Column()
  isActivated: boolean;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Project, (project) => project.id)
  project: Project;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
