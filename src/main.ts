import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.use(helmet());

  // adding swagger documentation
  const config = new DocumentBuilder()
    .setTitle('KoinTube Api')
    .setDescription('The kointube API description')
    .setVersion('1.0')
    .addTag('kointube')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({});

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
}
bootstrap();
