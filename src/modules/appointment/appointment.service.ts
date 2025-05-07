import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../../entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { PatientService } from '../patient/patient.service';
import { DoctorService } from '../doctor/doctor.service';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,
        private readonly patientService: PatientService,
        private readonly doctorService: DoctorService
    ) {}

    async create(dto: CreateAppointmentDto): Promise<Appointment> {
        const patient = await this.patientService.findOne(dto.patientId);
        const doctor = await this.doctorService.findOne(dto.doctorId);
        const endTime = new Date(dto.startTime);
        endTime.setMinutes(endTime.getMinutes() + dto.durationMinutes);
        return this.appointmentRepository.save({
            patient,
            doctor,
            startTime: dto.startTime,
            endTime,
            status: 'scheduled'
        });
    }
}
