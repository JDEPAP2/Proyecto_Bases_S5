import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cursos } from './cursos.entity';
import { Empleados } from './Empleados.entity';

@Entity('CursoEmpleado')
export class CursoEmpleados{
    @PrimaryGeneratedColumn('uuid')
    idCursoEmpleado: string;

    @ManyToOne(type => Cursos)
    @JoinColumn({name: 'idCurso'})
    idCurso: Cursos | string;

    @ManyToOne(type => Empleados)
    @JoinColumn({name: 'idEmpleado'})
    idEmpleado: Empleados | string;

    @Column()
    calificacion: number;

    @Column()
    estado: string;

    @Column()
    modalidad: string;

    @Column()
    fechaFin: Date;

    @Column()
    totalHoras: number;

    @Column()
    usuarioUltimaAct: string;

    @Column()
    horaUltimaAct: Date;
}