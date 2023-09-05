import { Project as ProjectSchema } from '@prisma/client';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user';
import { Device } from './device';
import { DataPoint } from './dataPoint';
import { Field } from './field';

// export type Project = ProjectSchema;

@Entity()
@Unique(['name', 'user'])
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'uuid', unique: true })
  @Generated('uuid')
  accesskey: string;

  @Column()
  isActivated: boolean;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @OneToMany(() => Device, (device) => device.id)
  devices: Device[];

  @OneToMany(() => Field, (field) => field.id)
  fields: Field[];

  @OneToMany(() => DataPoint, (dataPoint) => dataPoint.id)
  dataPoints: DataPoint[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
