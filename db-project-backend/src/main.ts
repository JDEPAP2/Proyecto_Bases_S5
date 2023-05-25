import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     // transform: true,
  //     // transformOptions: {
  //     //   enableImplicitConversion: true,
  //     // },
  //   }),
  // );
  const config = new DocumentBuilder()
    .setTitle('Bases de Datos API')
    .setDescription('API Bases de datos 5 semestre')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(3000);
}
bootstrap();
