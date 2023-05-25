import {
    Body,
    Controller,
    Delete,
    Get,
    Ip,
    Param,
    Post,
    Query,
  } from '@nestjs/common';


import { responseDto } from 'src/globals/response.dto';
  
import { GlobalsService } from 'src/globals/globals.service';
import { CursoEmpleadosService } from './cursoempleados.service';
import { EmpleadosService } from 'src/empleados/empleados.service';
import { CursosService } from 'src/cursos/cursos.service.service';

  @Controller('curso-empleado')
  export class CursoEmpleadosController {
    constructor(
      private readonly cursoEmpleadoService: CursoEmpleadosService,
      private readonly globalsService: GlobalsService,
    ) {}
  
    @Get('/allEmpleados/:idEmpleado')
    async getAllCursosE(
        @Param('idEmpleado') idEmpleado: string
    ) {
      const response: responseDto =
        await this.cursoEmpleadoService.getCursosEmpleadosByEmpleado(idEmpleado)
      if (!response.success) await this.globalsService.handleError(response);
      return response;
    }

    @Get('/allCursos/:idCurso')
    async getAllEmpleasosC(
        @Param('idCurso') idCurso: string
    ) {
      const response: responseDto =
        await this.cursoEmpleadoService.getCursosEmpleadosByCursos(idCurso)
      if (!response.success) await this.globalsService.handleError(response);
      return response;
    }

    @Get('best/')
    async getSomeCursosE(
      @Body('limit') limit: number,
    ) {
      const response: responseDto =
        await this.cursoEmpleadoService.getBestEmpleadosWithLimit(limit);
      if (!response.success) await this.globalsService.handleError(response);
      return response;
    }

    @Get('count-state/')
    async getCountState(
      @Body('idEmpleado') idEmpleado: string,
      @Body('state') state: boolean,
    ) {
      const response: responseDto =
        await this.cursoEmpleadoService.getCountAndCursosEmpleadosAprobados(idEmpleado, state);
      if (!response.success) await this.globalsService.handleError(response);
      return response;
    }

    @Get('country/')
    async getByCountry(
      @Body('country') country: string,
      @Body('limit') limit: number,
    ) {
      const response: responseDto =
        await this.cursoEmpleadoService.getBestCursosByCountry(country,limit);
      if (!response.success) await this.globalsService.handleError(response);
      return response;
    }

    @Get('country-modal/')
    async getByCountryAndModal(
      @Body('country') country: string,
      @Body('modal') modal: string,
      @Body('limit') limit: number,
    ) {
      const response: responseDto =
        await this.cursoEmpleadoService.getBestCursosByCountryWithModal(country,modal,limit)
      if (!response.success) await this.globalsService.handleError(response);
      return response;
    }

  }
  