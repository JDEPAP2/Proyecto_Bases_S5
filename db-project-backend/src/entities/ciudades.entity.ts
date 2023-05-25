import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Estados } from './estados.entity';


@Entity('Ciudad')
export class Ciudades{
    @PrimaryGeneratedColumn('uuid')
    idCiudad: string;

    @ManyToOne(type => Estados)
    @JoinColumn({name: 'idEstadoProvincia'})
    idEstadoProvincia: Estados | string;

    @Column({unique:true})
    nombre: string;

}