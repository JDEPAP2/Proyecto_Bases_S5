import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CatTematicas } from './cat-tematicas.entity';

@Entity('AreaConocimiento')
export class AreasCono{
    @PrimaryGeneratedColumn('uuid')
    idAreaCon: string;

    @ManyToOne(type => CatTematicas)
    @JoinColumn({name: 'idCatTem'})
    idCatTem: CatTematicas | string;

    @Column()
    nombre: string;

    @Column()
    propositoFormacion: string;   

}