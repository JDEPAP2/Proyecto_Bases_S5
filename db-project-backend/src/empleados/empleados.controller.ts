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
import { responseDto } from '../globals/response.dto';
  
import { GlobalsService } from '../globals/globals.service';
import { EmpleadosService } from './empleados.service';

  @Controller('empleados')
  export class EmpleadosController {
    constructor(
      private readonly empleadosService: EmpleadosService,
      private readonly globalsService: GlobalsService,
    ) {}
  
    @Get('/all')
    async getAllEmpleados() {
      const response: responseDto =
        await this.empleadosService.getEmpleados()
      if (!response.success) await this.globalsService.handleError(response);
      return response;
    }

    @Get('some/:limit')
    async getSomeEmpleados(
      @Param('limit') limit: number,
    ) {
      const response: responseDto =
        await this.empleadosService.getEmpleadosWithLimit(limit);
      if (!response.success) await this.globalsService.handleError(response);
      return response;
    }

    @Get('empleado/:id')
    async getEmpleado(
      @Param('id') id: string,
    ) {
      const response: responseDto =
        await this.empleadosService.getEmpleadoById(id);
      if (!response.success) await this.globalsService.handleError(response);
      return response;
    }

    @Get('country/')
    async getByCountry(
      @Body('country') country: string,
    ) {
      const response: responseDto =
        await this.empleadosService.getEmpleadosByCountry(country);
      if (!response.success) await this.globalsService.handleError(response);
      return response;
    }

    @Get('prom-country/')
    async getPromByCountry(
      @Body('country') country: string,
    ) {
      const response: responseDto =
        await this.empleadosService.getPromEmpleadosByCountry(country);
      if (!response.success) await this.globalsService.handleError(response);
      return response;
    }

  }
  