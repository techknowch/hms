import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from '../../entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { ValidationService } from '../../common/validation/validation.service';

@Injectable()
export class DoctorService {
    constructor(
        @InjectRepository(Doctor)
        private doctorRepository: Repository<Doctor>,
        private validationService: ValidationService,
    ) {}

    async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
        const doctor = this.doctorRepository.create(createDoctorDto);
        return await this.doctorRepository.save(doctor);
    }

    async findAll(): Promise<Doctor[]> {
        return await this.doctorRepository.find();
    }

    async findOne(id: number): Promise<Doctor> {
        const doctor = await this.doctorRepository.findOne({ where: { id } });
        if (!doctor) {
            throw new NotFoundException(`Doctor with ID ${id} not found`);
        }
        return doctor;
    }

    async update(id: number, updateDoctorDto: Partial<CreateDoctorDto>): Promise<Doctor> {
        const doctor = await this.findOne(id);
        Object.assign(doctor, updateDoctorDto);
        return await this.doctorRepository.save(doctor);
    }

    async remove(id: number): Promise<void> {
        const doctor = await this.findOne(id);
        await this.doctorRepository.remove(doctor);
    }

    async findBySpecialization(specialization: string): Promise<Doctor[]> {
        return await this.doctorRepository.find({
            where: { specialization, isActive: true }
        });
    }

    async updateAvailability(id: number, availability: object): Promise<Doctor> {
        const doctor = await this.findOne(id);
        doctor.availability = availability;
        return await this.doctorRepository.save(doctor);
    }
}
