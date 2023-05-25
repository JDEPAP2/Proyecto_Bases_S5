import { Module } from '@nestjs/common';
import { EmpleadosController } from './empleados.controller';
import { GlobalsService } from '../globals/globals.service';
import { ConfigService } from '@nestjs/config';
import { EmpleadosService } from './empleados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleados } from 'src/entities/Empleados.entity';
import { CursoEmpleadosService } from 'src/cursoempleados/cursoempleados.service';
import { CursoEmpleados } from 'src/entities/curso-empleados.entity';
import { CursosService } from 'src/cursos/cursos.service.service';
import { CursoempleadosModule } from 'src/cursoempleados/cursoempleados.module';
import { GlobalsModule } from 'src/globals/globals.module';

@Module({
    imports: [
      GlobalsModule,
      CursoempleadosModule,
      TypeOrmModule.forFeature([Empleados])
    ],
    providers: [EmpleadosService],
    controllers: [EmpleadosController],
    exports: [EmpleadosService],
    
  })
export class EmpleadosModule {}
