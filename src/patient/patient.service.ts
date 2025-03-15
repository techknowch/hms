import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from 'src/entities/patient.entity';
import { ValidationService } from 'src/common/validation/validation.service';

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
        private readonly validationService: ValidationService, // Inject ValidationService
    ) { }

    async create(patientData: Partial<Patient>): Promise<Patient> {
        this.validationService.validatePatientData(patientData);
        const patient = this.patientRepository.create(patientData);
        return this.patientRepository.save(patient);
    }
}
