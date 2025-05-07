import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { DoctorModule } from '../doctor/doctor.module';
import { PatientModule } from '../patient/patient.module';
import { Appointment } from '../../entities/appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService],
  imports: [TypeOrmModule.forFeature([Appointment]), DoctorModule, PatientModule]
})
export class AppointmentModule {}
