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
import { DataPoint } from './dataPoint';
import { Device } from './device';
import { Field } from './field';
import { User } from './user';

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
  user: Promise<User>;

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
