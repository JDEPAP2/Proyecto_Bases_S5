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
import { CursosService } from '../cursos/cursos.service.service';

  @Controller('cursos')
  export class CursosController {
    constructor(
      private readonly cursosService: CursosService,
      private readonly globalsService: GlobalsService,
    ) {}
  
    @Get('/all')
    async getAllCursos() {
      const response: responseDto =
        await this.cursosService.getCursos()
      if (!response.success) await this.globalsService.handleError(response);
      return response;
    }

    @Get('some/:limit')
    async getSomeCursos(
      @Param('limit') limit: number,
    ) {
      const response: responseDto =
        await this.cursosService.getCursosWithLimit(limit);
      if (!response.success) await this.globalsService.handleError(response);
      return response;
    }

    @Get('curso/:id')
    async getCurso(
      @Param('id') id: string,
    ) {
      const response: responseDto =
        await this.cursosService.getCursoById(id);
      if (!response.success) await this.globalsService.handleError(response);
      return response;
    }

    @Get('language/')
    async getByLanguage(
      @Body('language') language: string,
    ) {
      const response: responseDto =
        await this.cursosService.getCountandCursosByLanguage(language);
      if (!response.success) await this.globalsService.handleError(response);
      return response;
    }
    
  }
  