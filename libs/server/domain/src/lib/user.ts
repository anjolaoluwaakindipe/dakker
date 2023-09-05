import { User as UserSchema } from '@prisma/client';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Device } from './device';
import { Project } from './project';
import { Field } from './field';
// export type User = UserSchema;

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  email: string;
  @Column()
  firstname: string;
  @Column()
  lastname: string;
  @Column()
  passwordHash: string;
  @Column({ nullable: true })
  phoneNumber: string | null;
  @OneToMany(() => Device, (device) => device.id)
  devices: Device[];
  @OneToMany(() => Project, (project) => project.id)
  projects: Project[];
  @OneToMany(() => Field, (field) => field.id)
  fields: Field[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
