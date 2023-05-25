import { Module } from '@nestjs/common';
import { CursoEmpleadosService } from './cursoempleados.service';
import { CursoEmpleadosController } from './cursoempleados.controller';
import { CursoEmpleados } from 'src/entities/curso-empleados.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
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
