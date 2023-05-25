import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { config } from 'dotenv';
import { Empleados } from '../entities/Empleados.entity';
import { CursoEmpleados } from '../entities/curso-empleados.entity';
import { CursoEmpleadosService } from '../cursoempleados/cursoempleados.service';

@Injectable()
export class EmpleadosService {
 
  constructor(
    @InjectRepository(Empleados)
    private readonly empleadosRepository: Repository<Empleados>,
    private readonly cursosEmpleadosService: CursoEmpleadosService,
  ) {}


  async getEmpleadoById(idEmpleado: string){
    try{
        const empleado = await this.empleadosRepository.findOne({
            where: {
                idEmpleado: idEmpleado
            }
        })
        if(!empleado){
            return {
                success: false,
                message: "No existe el empleado",
              };
        }
        return {
            success: true,
            data: empleado
          };

    }catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async getEmpleados(){
    try{
        const empleados = await this.empleadosRepository.find()
        if(empleados.length === 0){
            return {
                success: false,
                message: "No hay empleados",
              };
        }
        return {
            success: true,
            data: empleados
          };

    }catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async getEmpleadosWithLimit(limit: number){
    try{
        const empleados = await this.empleadosRepository.find({
            take: limit
        })
        if(empleados.length === 0){
            return {
                success: false,
                message: "No hay cursos",
              };
        }
        return {
            success: true,
            data: empleados
          };

    }catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async getPromEmpleadosByCountry(country:string){
    try{
      const empleados = await this.empleadosRepository.createQueryBuilder('empleado')
      .leftJoin('empleado.ubicacionE', 'ciudad')
      .leftJoin('ciudad.idEstadoProvincia', 'estadoProvincia')
      .leftJoin('estadoProvincia.idPaisRegion', 'paisRegion')
      .where('paisRegion.nombre = :country', { country })
      .getMany();

        if(empleados.length === 0){
            return {
                success: false,
                message: "No hay empleados",
              };
        }
        
        let sumatoriaTotal = 0;
        empleados.forEach(async empleado => {
            const promedioEmpleado = await this.cursosEmpleadosService.getPromedioCursosEmpleado(empleado.idEmpleado)
            if(promedioEmpleado.data !== 0){
                sumatoriaTotal += promedioEmpleado.data;
            }
        })
        const promedio = sumatoriaTotal/empleados.length;
        
        return {
            success: true,
            message: {
                prom: promedio,
                data: empleados
            },
        };

    }catch (err) {
        return {
            success: false,
            message: err.message,
          };
        }
    }
  

  async getEmpleadosByCountry(country:string){
    try{
      const empleados = await this.empleadosRepository.createQueryBuilder('empleado')
      .leftJoin('empleado.ubicacionE', 'ciudad')
      .leftJoin('ciudad.idEstadoProvincia', 'estadoProvincia')
      .leftJoin('estadoProvincia.idPaisRegion', 'paisRegion')
      .where('paisRegion.nombre = :country', { country })
      .getMany();

        if(empleados.length === 0){
            return {
                success: false,
                message: "No hay empleados en esta ciudad",
            };
        }

    }catch (err) {
        return {
            success: false,
            message: err.message,
          };
      };
    }
  }






