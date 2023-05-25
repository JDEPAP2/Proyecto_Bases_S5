import { Module } from '@nestjs/common';
import {CompaniaController} from './compania.controller';
import { CompaniaService } from './compania.service';
import { GlobalsService } from '../globals/globals.service';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compania } from 'src/entities/compania.entity';
import { GlobalsModule } from 'src/globals/globals.module';

@Module({
  imports: [
    GlobalsModule,
    TypeOrmModule.forFeature([Compania])
  ],
  exports: [CompaniaService],
  controllers: [CompaniaController],
  providers: [CompaniaService]
})
export class CompaniaModule {}
