import { APP_GUARD } from '@nestjs/core';
import { AuthModule, JwtAuthGuard } from './auth';
import { config } from './config';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, GqlModule } from './providers';
import { DeviceInfoMiddleware } from './middlewares';
import { HealthModule } from './health';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { OrganizationsModule } from './organizations';
import { UsersModule } from './users';

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
    providers: [
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
