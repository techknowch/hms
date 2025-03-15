import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './patient/patient.module';
import { Patient } from './entities/patient.entity';
import { ValidationService } from './common/validation/validation.service';

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
    PatientModule],
  controllers: [AppController],
  providers: [AppService, ValidationService],
})
export class AppModule { }
