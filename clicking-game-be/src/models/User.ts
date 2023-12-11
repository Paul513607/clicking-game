import { Length, Min } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Length(1, 255)
    @Column()
    public name!: string;

    @Column()
    @Min(0)
    public score!: number;

    @Column()
    public duration!: number; // in seconds
}