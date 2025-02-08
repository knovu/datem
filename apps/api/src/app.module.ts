import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { HealthModule } from './health';
import { UsersModule } from './users';
import { DatabaseModule, GqlModule } from './providers';
import { AuthModule, JwtAuthGuard } from './auth';
import { DeviceInfoMiddleware } from './middlewares';
import { APP_GUARD } from '@nestjs/core';
import { OrganizationsModule } from './organizations';

@Module({
    imports: [
        // Provider Modules
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),
        DatabaseModule,
        GqlModule,

        // API Modules
        HealthModule,
        AuthModule,
        UsersModule,
        OrganizationsModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // Apply the middlewares
        consumer.apply(DeviceInfoMiddleware).forRoutes('*'); // Apply to all routes
    }
}
