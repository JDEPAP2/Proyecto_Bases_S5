import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Area } from './area.entity';

@Entity('Informe')
export class Informes{
    @PrimaryGeneratedColumn('uuid')
    idInforme: string;

    @Column()
    categoriaInforme: string;

    @Column()
    nombreTrabajo: string;   

    @ManyToOne(type => Area)
    @JoinColumn({name: 'idArea'})
    idArea: Area | string;

}