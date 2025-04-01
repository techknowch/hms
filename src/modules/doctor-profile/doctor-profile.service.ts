import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorProfile } from '../../entities/doctor-profile.entity';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { Doctor } from '../../entities/doctor.entity';

@Injectable()
export class DoctorProfileService {
    constructor(
        @InjectRepository(DoctorProfile)
        private doctorProfileRepository: Repository<DoctorProfile>,
        @InjectRepository(Doctor)
        private doctorRepository: Repository<Doctor>,
    ) {}

    async create(createDoctorProfileDto: CreateDoctorProfileDto): Promise<DoctorProfile> {
        const doctor = await this.doctorRepository.findOne({ where: { id: createDoctorProfileDto.doctorId }});
        if (!doctor) {
            throw new NotFoundException(`Doctor with ID ${createDoctorProfileDto.doctorId} not found`);
        }

        const profile = this.doctorProfileRepository.create({
            ...createDoctorProfileDto,
            doctor,
        });

        return await this.doctorProfileRepository.save(profile);
    }

    async findByDoctorId(doctorId: number): Promise<DoctorProfile> {
        const profile = await this.doctorProfileRepository.findOne({
            where: { doctor: { id: doctorId } },
            relations: ['doctor'],
        });

        if (!profile) {
            throw new NotFoundException(`Profile for doctor with ID ${doctorId} not found`);
        }

        return profile;
    }

    async update(doctorId: number, updateData: Partial<CreateDoctorProfileDto>): Promise<DoctorProfile> {
        const profile = await this.findByDoctorId(doctorId);
        
        Object.assign(profile, updateData);
        
        return await this.doctorProfileRepository.save(profile);
    }

    async remove(doctorId: number): Promise<void> {
        const profile = await this.findByDoctorId(doctorId);
        await this.doctorProfileRepository.remove(profile);
    }
}
