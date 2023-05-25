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
  import { CompaniaService } from './compania.service';

  import { responseDto } from '../globals/response.dto';
  
  import { GlobalsService } from '../globals/globals.service';

  @Controller('companias')
  export class CompaniaController {
    constructor(
      private readonly companiaService :CompaniaService,
      private readonly globalsService: GlobalsService,
    ) {}
  
    @Get('/all')
    async getAllDocuments() {
      const response: responseDto =
        await this.companiaService.getCompanias()
      if (!response.success) await this.globalsService.handleError(response);
      return response;
    }

    @Get('/some/:limit')
    async getSomeDocuments(
      @Param('limit') limit: number,
    ) {
      const response: responseDto =
        await this.companiaService.getCompaniasWithLimit(limit);
      if (!response.success) await this.globalsService.handleError(response);
      return response;
    }
    
  }
  