import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: buildDataSourceOptions,
}); 

export function buildDataSourceOptions(
  configService: ConfigService,
): DataSourceOptions {
  return {
    type: 'mysql',
    host: configService.get('DATABASE_HOST'),
    username: configService.get('DATABASE_USERNAME'),
    password: configService.get('DATABASE_PASSWORD'),
    port: configService.get('DATABASE_PORT'),
    database: configService.get('DATABASE_NAME'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    migrations: [__dirname+ '/../migrations/**/*{.ts,.js}'],
  };
}