import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Articulos } from './articulos.entity';

@Entity('articuloEspecifico')
export class ArticulosEsp{
    @PrimaryGeneratedColumn('uuid')
    idArticuloEsp: string;

    @ManyToOne(type => Articulos)
    @JoinColumn({name: 'idArticulo'})
    idArticulo: Articulos | string;

    @Column()
    tituloArticulo: string;

    @Column()
    tipoArticulo: string;
    
    @Column()
    descripcion: string;
}