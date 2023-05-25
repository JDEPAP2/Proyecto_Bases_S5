import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmpleadosModule } from './empleados/empleados.module';
import { CursosModule } from './cursos/cursos.module';
import { DatabaseModule } from './database/database.module';
import {ConfigModule} from "@nestjs/config";
import { CompaniaModule } from './compania/compania.module';
import { GlobalsModule } from './globals/globals.module';
import { CursoempleadosModule } from './cursoempleados/cursoempleados.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    GlobalsModule,
    CompaniaModule,
    EmpleadosModule,
    CursosModule,
    CursoempleadosModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
