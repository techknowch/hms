import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './modules/patient/patient.module';
import { Patient } from './entities/patient.entity';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyMiddleware } from './common/middleware/api-key/api-key.middleware';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'alinaqvi',
      password: 'dev',
      database: 'healthcare_db',
      entities: [Patient],
      synchronize: true
    }),
    ConfigModule.forRoot(), // Load environment variables
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60, // Time-to-live in seconds
          limit: 5, // Maximum number of requests within TTL
        },
      ],
    }),
    PatientModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // Apply ThrottlerGuard globally
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware)
      .forRoutes('*');
  }
}
