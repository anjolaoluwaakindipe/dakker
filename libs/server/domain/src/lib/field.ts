import { Field as FieldSchema } from '@prisma/client';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { DataType } from './dataType';
import { User } from './user';
import { Project } from './project';
import { DataPoint } from './dataPoint';

// export type Field = FieldSchema;

@Entity()
@Unique(['name', 'project'])
export class Field {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: DataType,
    default: DataType.FLOAT,
  })
  dataType: DataType;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Project, (project) => project.id)
  project: Project;

  @OneToMany(() => DataPoint, (dataPoint) => dataPoint.id)
  dataPoints: DataPoint[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
