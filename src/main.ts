import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser = require('cookie-parser');
import { AppModule } from './app.module';
import { ConfigService } from './config.service';;
const busboy = require('connect-busboy');

const MB_MULTIPLIER = 1024 * 1024;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { });

  const options = new DocumentBuilder()
    .setTitle('CONTENTS API')
    // .setBasePath('/')
    .setVersion('1.0')
    .build();

  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document);

  const configService: ConfigService = app.get(ConfigService);

  app.use(cookieParser());
  app.use(busboy({
    highWaterMark: 4 * MB_MULTIPLIER,
    limits: {
      filesize: 2048 * MB_MULTIPLIER,
      files: 1
    }
  }));

  // await app.listen(configService.get('PORT'));
}

bootstrap();
process.on("unhandledRejection", (unhandledError: unknown) => {
  const unhandledErrorPrefix = "Unhandled async error: \n";
  if (unhandledError instanceof Error) {
    const { stack, message } = unhandledError;
    console.error(unhandledErrorPrefix + message, stack);
  }
});