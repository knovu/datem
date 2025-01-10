import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, RequestMethod, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const config: ConfigService = app.get(ConfigService);
    const port = config.get<number>('port') as number;
    const isProduction = config.get<boolean>('isProduction') as boolean;

    app.setGlobalPrefix('api', {
        exclude: [
            { path: 'health', method: RequestMethod.ALL },
            { path: 'graphql', method: RequestMethod.ALL },
        ],
    });

    app.enableVersioning({
        type: VersioningType.URI,
    });

    app.enableCors({
        origin: [/localhost.*$/, /\.apollographql\.com.*$/],
        credentials: true,
    });

    app.set('trust proxy', isProduction);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true, // Enable automatic transformation
        }),
    );

    const swaggerConfig = new DocumentBuilder()
        .setTitle('API')
        .setDescription('Swagger API endpoints')
        .setVersion('1.0.0')
        .addBearerAuth()
        .addSecurityRequirements('Bearer')
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('api-docs', app, document);

    return await app.listen(port).then(() => app.getUrl());
}

bootstrap()
    .then((url) => {
        Logger.log(`✅ Server ready on ${url}`, 'Bootstrap');
    })
    .catch((error) => {
        Logger.error(error, 'Bootstrap');
    });
