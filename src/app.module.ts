import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './modules/patient/patient.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { DoctorProfileModule } from './modules/doctor-profile/doctor-profile.module';
import { Patient } from './entities/patient.entity';
import { Doctor } from './entities/doctor.entity';
import { DoctorProfile } from './entities/doctor-profile.entity';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyMiddleware } from './common/middleware/api-key/api-key.middleware';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { Appointment } from './entities/appointment.entity';


@Module({
  imports: [
    DoctorProfileModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'alinaqvi',
      password: 'alinaqvi',
      database: 'hms',
      entities: [Patient, Doctor, DoctorProfile, Appointment],
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
    PatientModule,
    DoctorModule,
    AppointmentModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // Apply ThrottlerGuard globally
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware)
      .forRoutes('*');
  }
}
