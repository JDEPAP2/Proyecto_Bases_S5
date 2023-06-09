import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Area } from './area.entity';

@Entity('paisRegion')
export class Paises{
    @PrimaryGeneratedColumn('uuid')
    idPaisRegion: string;

    @Column({unique:true})
    nombre: string;

    @Column()
    tipoPR: string;

}