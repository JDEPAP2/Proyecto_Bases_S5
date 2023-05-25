import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArticulosEsp } from './articulos-esp.entity';
import { Proveedores } from './proveedores.entity';


@Entity('Curso')
export class Cursos{
    @PrimaryGeneratedColumn('uuid')
    idCurso: string;

    @ManyToOne(type => ArticulosEsp)
    @JoinColumn({name: 'idArticuloEsp'})
    idArticuloEsp: ArticulosEsp | string;

    @Column()
    tipoContenido: string;

    @Column()
    Contenido: string;

    @Column()
    activo: string;

    @Column()
    idioma: string;

    @Column()
    duracion: number;

    @Column()
    fechaCreacion: Date;

    @Column()
    fechaPublicacion: Date;

    @ManyToOne(type => Proveedores)
    @JoinColumn({name: 'idProveedor'})
    idProveedor: Proveedores | string;

    @Column()
    costo: number;

    @Column()
    responsable: string;

    @Column()
    experto: string;
}