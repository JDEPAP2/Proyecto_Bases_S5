import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Area')
export class Area{
    @PrimaryGeneratedColumn('uuid')
    idArea: string;

    @Column({unique: true})
    name: string;

    @Column()
    vicepresidencia: string;

}