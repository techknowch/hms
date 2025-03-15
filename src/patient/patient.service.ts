import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from 'src/entities/patient.entity';

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
    ) { }

    async create(patientData: Partial<Patient>): Promise<Patient> {
        const patient = this.patientRepository.create(patientData);
        return this.patientRepository.save(patient);
    }
}
