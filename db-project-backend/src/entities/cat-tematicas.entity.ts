import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categoriaTematica')
export class CatTematicas{
    @PrimaryGeneratedColumn('uuid')
    idCatTem: string;

    @Column()
    descripcionCatTem: string;
}