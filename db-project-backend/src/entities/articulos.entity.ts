import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AreasCono } from './areas-cono.entity';

@Entity('articulo')
export class Articulos{
    @PrimaryGeneratedColumn('uuid')
    idArticulo: string;

    @ManyToOne(type => AreasCono)
    @JoinColumn({name: 'idCatTem'})
    idCatTem: AreasCono | string;

    @Column()
    nombreIdArticulo: string;

}