import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API Rest SIS257')
    .setDescription(
      'segundo parcial Desarrollo de Aplicación Int/Internet II Copa Choque Ruth Simona',
    )
    .setVersion('1.0')
    .addTag('series') // Cambiar el nombre del tag a 'series'
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidoc', app, document);

  await app.listen(process.env.PORT);
  console.log(`App running on ${await app.getUrl()}/apidoc`);
}
bootstrap();

