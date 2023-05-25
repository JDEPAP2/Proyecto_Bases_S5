import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CursoEmpleados } from 'src/entities/curso-empleados.entity';
import { EmpleadosService } from 'src/empleados/empleados.service';
import { CursosService } from 'src/cursos/cursos.service.service';

@Injectable()
export class CursoEmpleadosService {
  constructor(
    @InjectRepository(CursoEmpleados)
    private readonly cursosEmpleadosRepository: Repository<CursoEmpleados>,
    // private readonly empleadosService: EmpleadosService,
  ) {}

  async getCursosEmpleadosByEmpleado(idEmpleado: string){
    try{
        const cursos = await this.cursosEmpleadosRepository.find({
            where: {idEmpleado:idEmpleado}
        })
        if(cursos.length === 0){
            return {
                success: false,
                message: "No hay cursos",
              };
        }
        return {
            success: true,
            data: cursos
          };

    }catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async getCursosEmpleadosByCursos(idCurso: string){
    try{
        const empleados = await this.cursosEmpleadosRepository.find({
            where: {idCurso:idCurso}
        })
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

  async getPromedioCursosEmpleado(idEmpleado: string){
    try{
        const promedio = await this.cursosEmpleadosRepository.average("calificacion",
        {
            idEmpleado: idEmpleado
        })

        if(!promedio){
            return {
                success: false,
                message: "No hay empleados",
              };
        }

        return {
            success: true,
            data: promedio
          };

    }catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async getBestEmpleadosWithLimit(limit: number){
    try{
        const cursosEmpleados = await this.cursosEmpleadosRepository.find(
          {
            order: {
              calificacion: "ASC"
            },
            take: limit
          }
        )


        if(cursosEmpleados.length === 0){
            return {
                success: false,
                message: "No hay cursos empleados",
              };
        }

        // const empleados = cursosEmpleados.map(async empleado =>{
        //   console.log(empleado.idEmpleado.toString())
        //   return this.empleadosService.getEmpleadoById(empleado.idEmpleado.toString());
        // })

        return {
            success: true,
            data: {
                cursosEmpleados: cursosEmpleados
            }
          };

    }catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async getCountAndCursosEmpleadosAprobados(idEmpleado: string, aprobados: boolean){
    try{
        const [cursosEmpleados, cantidad] = await this.cursosEmpleadosRepository.findAndCountBy(
            {
                idEmpleado: idEmpleado,
                estado: aprobados? "Aprobado": "No Aprobado"
            }
        );

        if(cursosEmpleados.length === 0){
            return {
                success: false,
                message: "No hay empleados",
              };
        }

      //   const cursos = cursosEmpleados.map(async (empleado: CursoEmpleados) =>{
      //     console.log("------------",empleado.idEmpleado.toString())
      //     return this.cursosService.getCursoById(empleado.idEmpleado.toString());
      // })


        return {
            success: true,
            data: {
                count: cantidad,
                cursosEmpleados: cursosEmpleados
            }
          };

    }catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
    
  }

  async getBestCursosByCountry(country: string, limit:number = 5){
    try{
        const cursosEmpleados = await this.cursosEmpleadosRepository.find(
          {
            relations:['idEmpleado'],
            where:{
              idEmpleado:{
                  ubicacionE:{
                      idEstadoProvincia:{
                          idPaisRegion:{
                              nombre: country
                          }
                      }
                  }
              }
          },
          order:{
            idCurso: "ASC",
          },
          take: limit,
        },
        )

        if(cursosEmpleados.length === 0){
            return {
                success: false,
                message: "No hay cursos con estas especificaciones",
              };
        }

        // const cursos = cursosEmpleados.map(async (empleado: CursoEmpleados) =>{
        //     console.log("------------",empleado.idEmpleado.toString())
        //     return this.cursosService.getCursoById(empleado.idEmpleado.toString());
        // })

        return {
            success: true,
            data: {
                cursosEmpleados: cursosEmpleados
            }
          };

    }catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
}

  async getBestCursosByCountryWithModal(country: string, modalidad:string ,limit:number = 5){
    try{
        const cursosEmpleados = await this.cursosEmpleadosRepository.find({
          relations:['idEmpleado'],
          where:{
            idEmpleado:{
                ubicacionE:{
                    idEstadoProvincia:{
                        idPaisRegion:{
                            nombre: country
                        }
                    }
                }
            },
            modalidad:modalidad
          },
          order:{
            idCurso: "ASC",
          },
          take: limit,
        })

        if(cursosEmpleados.length === 0){
            return {
                success: false,
                message: "No hay cursos con estas especificaciones",
              };
        }
        
      //   const cursos = cursosEmpleados.map(async (empleado: CursoEmpleados) =>{
      //     console.log("------------",empleado.idEmpleado.toString())
      //     return this.cursosService.getCursoById(empleado.idEmpleado.toString());
      // })


        return {
            success: true,
            data: {
                cursosEmpleados: cursosEmpleados
            }
          };

    }catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
}


}
