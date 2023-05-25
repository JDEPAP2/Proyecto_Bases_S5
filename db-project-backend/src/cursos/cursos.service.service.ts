import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { config } from 'dotenv';
import { Cursos } from '../entities/cursos.entity';

@Injectable()
export class CursosService {
 
  constructor(
    @InjectRepository(Cursos)
    private readonly cursosRepository: Repository<Cursos>
  ) {}

  async getCursoById(idCurso: string){
    try{
        const curso = await this.cursosRepository.findOne({
            where: {
                idCurso: idCurso
            }
        })
        if(!curso){
            return {
                success: false,
                message: "No existe el curso",
              };
        }
        return {
            success: true,
            data: curso
          };

    }catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async getCursos(){
    try{
        const cursos = await this.cursosRepository.find()
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

  async getCursosWithLimit(limit: number){
    try{
        const cursos = await this.cursosRepository.find({
            take: limit
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

  async getCountandCursosByLanguage(language:string){
    try{
        const [cursos, cantidad] = await this.cursosRepository.findAndCountBy(
            {
                idioma: language
            }
        )

        if(cursos.length === 0){
            return {
                success: false,
                message: "No hay cursos",
              };
        }
        return {
            success: true,
            message: "En el data hay un arreglo [data, count]",
            data: {
                data: cursos,
                count: cantidad
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