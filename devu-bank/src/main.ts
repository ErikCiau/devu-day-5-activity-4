import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()

  config.setTitle('DevU Bank Api RestFull Example')
  config.setDescription('My DevUBank API')
  config.setVersion('1.0')
  config.addTag('DevU by Banregio')
  const configBuild = config.build()

  const document = SwaggerModule.createDocument(app, configBuild)
  SwaggerModule.setup('api', app, document)
  app.enableCors()

  await app.listen(3000);
}
bootstrap();
