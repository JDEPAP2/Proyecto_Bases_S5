import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Informes } from './informes.entity';
import { Compania } from './compania.entity';
import { Supervisores } from './supervisores.entity';
import { RecursosHum } from './recursos-hum.entity';
import { Ciudades } from './ciudades.entity';


@Entity('Empleado')
export class Empleados{
    @PrimaryGeneratedColumn('uuid')
    idEmpleado: string;

    @Column({unique:true})
    idUsuario: string;

    @Column()
    activo: string;

    @Column()
    genero: string;

    @Column()
    primerNombre: string;

    @Column()
    primerApellido: string;

    @Column()
    grupoPersonal: string;

    @ManyToOne(type => Informes)
    @JoinColumn({name: 'informe'})
    informe: Informes | string;

    @ManyToOne(type => Compania)
    @JoinColumn({name: 'compania'})
    compania: Compania | string;

    @ManyToOne(type => Supervisores)
    @JoinColumn({name: 'supervisor'})
    supervisor: Supervisores | string;

    @ManyToOne(type => RecursosHum)
    @JoinColumn({name: 'recursoHumano'})
    recursoHumano: RecursosHum | string;

    @ManyToOne(type => Ciudades)
    @JoinColumn({name: 'ubicacionE'})
    ubicacionE: Ciudades | string;
}