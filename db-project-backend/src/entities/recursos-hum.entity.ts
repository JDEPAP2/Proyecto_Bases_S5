import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('RecursoHumano')
export class RecursosHum{
    @PrimaryGeneratedColumn('uuid')
    usuarioHR: string;

    @Column()
    primerNombreHR: string;

    @Column()
    apellidoHR: string;
}