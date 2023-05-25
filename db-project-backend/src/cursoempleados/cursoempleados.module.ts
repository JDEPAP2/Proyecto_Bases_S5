import { Module } from '@nestjs/common';
import { CursoEmpleadosService } from './cursoempleados.service';
import { ConfigService } from '@nestjs/config';
import { GlobalsService } from 'src/globals/globals.service';
import { CursoEmpleadosController } from './cursoempleados.controller';
import { CursoEmpleados } from 'src/entities/curso-empleados.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cursos } from 'src/entities/cursos.entity';
import { Empleados } from 'src/entities/Empleados.entity';
import { EmpleadosService } from 'src/empleados/empleados.service';
import { CursosService } from 'src/cursos/cursos.service.service';
import { EmpleadosModule } from 'src/empleados/empleados.module';
import { CursosModule } from 'src/cursos/cursos.module';
import { GlobalsModule } from 'src/globals/globals.module';

@Module({
    imports: [
       GlobalsModule,
      TypeOrmModule.forFeature([CursoEmpleados])
    ],
    controllers: [CursoEmpleadosController],
    providers: [CursoEmpleadosService],
    exports: [CursoEmpleadosService],
  })
export class CursoempleadosModule {}
