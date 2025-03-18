import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from 'src/entities/patient.entity';
import { ValidationService } from 'src/common/validation/validation.service';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
        private readonly validationService: ValidationService, // Inject ValidationService
    ) { }

    async create(CreatePatientDto: CreatePatientDto): Promise<Patient> {
        this.validationService.validatePatientData(CreatePatientDto);
        const patient = this.patientRepository.create(CreatePatientDto);
        return this.patientRepository.save(patient);
    }
}
