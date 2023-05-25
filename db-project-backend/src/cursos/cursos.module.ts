import { Module } from '@nestjs/common';
import { CursosController } from './cursos.controller';
import { GlobalsService } from '../globals/globals.service';
import { ConfigService } from '@nestjs/config';
import { CursosService } from './cursos.service.service';
import { Cursos } from 'src/entities/cursos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalsModule } from 'src/globals/globals.module';

@Module({
  imports: [
    GlobalsModule,
    TypeOrmModule.forFeature([Cursos])
  ],
    controllers: [CursosController],
    exports: [CursosService],
    providers: [ CursosService]
  })
export class CursosModule {}
