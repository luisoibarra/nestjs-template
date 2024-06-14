import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpConfig } from './config/models/http-config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvConfig } from './config/models/env-config';
import { ConfigConstants } from './config/config-constants';
import { CustomExceptionFilter } from './common/filters/custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Global Routing \\
  // URI Versioning /v1/...
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: configService.get<EnvConfig>(
      ConfigConstants.ENVIRONMENT_KEY,
    )?.version,
  });

  // Global Pipes \\
  // Exception filter that converts the exception thrown to custom response
  app.useGlobalFilters(new CustomExceptionFilter());

  // Global Pipes \\
  // Validates all incoming objects using class-validator
  app.useGlobalPipes(new ValidationPipe());

  // Global Interceptors \\
  // Properly serialize classes according annotations
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Swagger Configuration \\
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Definition')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Get Configuration Object and Extract HttpConfig configuration
  const httpConfig = configService.get<HttpConfig>(ConfigConstants.HTTP_KEY)!;
  await app.listen(httpConfig.port);
}
bootstrap();
