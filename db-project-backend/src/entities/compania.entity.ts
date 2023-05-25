import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ciudades } from './ciudades.entity';

@Entity('compania')
export class Compania{
    @PrimaryGeneratedColumn('uuid')
    idCompania: string;

    @Column({unique:true})
    nombre: string;

    @ManyToOne(type => Ciudades)
    @JoinColumn({name: 'ubicacionC'})
    ubicacionC: Ciudades | string;

}