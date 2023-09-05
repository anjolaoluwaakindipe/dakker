import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DataPoint{

    @PrimaryGeneratedColumn("uuid")
    id: string

}