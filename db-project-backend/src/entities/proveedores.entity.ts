import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Articulos } from './articulos.entity';

@Entity('Proveedor')
export class Proveedores{
    @PrimaryGeneratedColumn('uuid')
    idProveedor: string;

    @Column()
    nombre: string;
}