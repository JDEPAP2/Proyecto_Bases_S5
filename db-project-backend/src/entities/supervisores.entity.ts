import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('supervisor')
export class Supervisores{
    @PrimaryGeneratedColumn('uuid')
    idSupervisor: string;

    @Column()
    nombreSupervisor: string;

    @Column()
    apellidoSupervisor: string;
}
