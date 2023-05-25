import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Paises } from './paises.entity';

@Entity('estadoProvincia')
export class Estados{
    @PrimaryGeneratedColumn('uuid')
    idEstadoProvincia: string;

    @ManyToOne(type => Paises)
    @JoinColumn({name: 'idPaisRegion'})
    idPaisRegion: Paises | string;

    @Column({unique:true})
    nombre: string;

    @Column()
    tipoEP: string;
}