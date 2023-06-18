import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './core/response.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path';

const docsEndpoint = '/api';
const title = 'SEMPITERNO API';
const description = 'API Integra las 5 respuestas de la prueba.';

function configureSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(docsEndpoint, app, document);
}

async function bootstrap() {

  const app_port = process.env.HOST_PORT ? Number(process.env.HOST_PORT) : 3000;
  const ms_port = process.env.MS_PORT_MICRO ? Number(process.env.MS_PORT_MICRO) : 3001;

  const logger = new Logger();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors({ origin: '*' });
  app.useStaticAssets(join(__dirname, '..', 'public')); // deja accesible la carpeta publica
  const moduleRef = app.select(AppModule);
  const reflector = moduleRef.get(Reflector);
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));

  configureSwagger(app);

  // La ruta en que se sirve la documentación
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.startAllMicroservices();
  await app.listen(app_port);
  logger.log(
    `🚀 Procedure base service running on port ${app_port}}`,
  );
}
bootstrap();
