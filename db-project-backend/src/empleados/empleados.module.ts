import { Module } from '@nestjs/common';
import { EmpleadosController } from './empleados.controller';
import { GlobalsService } from '../globals/globals.service';
import { ConfigService } from '@nestjs/config';
import { EmpleadosService } from './empleados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleados } from 'src/entities/empleados.entity';
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
