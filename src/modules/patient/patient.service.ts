import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../../entities/patient.entity';
import { ValidationService } from '../../common/validation/validation.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class PatientService {
    private readonly logger = new Logger(PatientService.name); // Initialize Logger
    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
        private readonly validationService: ValidationService, // Inject ValidationService
    ) { }

    async create(CreatePatientDto: CreatePatientDto): Promise<Patient> {
        this.validationService.validatePatientData(CreatePatientDto);
        try {
            const patient = this.patientRepository.create(CreatePatientDto);
            return await this.patientRepository.save(patient);
        }
        catch (error) {
            this.logger.error('Failed to create patient', error.stack);
            throw new BadRequestException('Failed to create patient: ' + error.message);
        }
    }

    async findAll(): Promise<Patient[]> {
        return this.patientRepository.find();
    }

    async findOne(id: number): Promise<Patient> {
        const patient = await this.patientRepository.findOne({ where: { id } });
        if (!patient) {
            throw new NotFoundException(`Patient with ID ${id} not found`);
        }
        return patient;
    }

    // Update a patient
    async update(id: number, updateData: Partial<Patient>): Promise<Patient> {
        const patient = await this.findOne(id);
        Object.assign(patient, updateData);
        return this.patientRepository.save(patient);
    }

    // Delete a patient
    async remove(id: number): Promise<void> {
        const patient = await this.findOne(id);
        await this.patientRepository.remove(patient);
    }

}
