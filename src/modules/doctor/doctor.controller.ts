import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Doctor } from '../../entities/doctor.entity';

@Controller('doctors')
export class DoctorController {
    constructor(private readonly doctorService: DoctorService) {}

    @Post()
    async create(@Body() createDoctorDto: CreateDoctorDto): Promise<Doctor> {
        return await this.doctorService.create(createDoctorDto);
    }

    @Get()
    async findAll(): Promise<Doctor[]> {
        return await this.doctorService.findAll();
    }

    @Get('specialization/:specialization')
    async findBySpecialization(@Param('specialization') specialization: string): Promise<Doctor[]> {
        return await this.doctorService.findBySpecialization(specialization);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Doctor> {
        return await this.doctorService.findOne(+id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateDoctorDto: Partial<CreateDoctorDto>,
    ): Promise<Doctor> {
        return await this.doctorService.update(+id, updateDoctorDto);
    }

    @Patch(':id/availability')
    async updateAvailability(
        @Param('id') id: string,
        @Body() availability: object,
    ): Promise<Doctor> {
        return await this.doctorService.updateAvailability(+id, availability);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return await this.doctorService.remove(+id);
    }
}
