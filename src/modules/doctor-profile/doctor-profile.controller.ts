import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorProfileService } from './doctor-profile.service';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { DoctorProfile } from '../../entities/doctor-profile.entity';

@Controller('doctor-profiles')
export class DoctorProfileController {
    constructor(private readonly doctorProfileService: DoctorProfileService) {}

    @Post()
    async create(@Body() createDoctorProfileDto: CreateDoctorProfileDto): Promise<DoctorProfile> {
        return await this.doctorProfileService.create(createDoctorProfileDto);
    }

    @Get('doctor/:doctorId')
    async findByDoctorId(@Param('doctorId') doctorId: string): Promise<DoctorProfile> {
        return await this.doctorProfileService.findByDoctorId(+doctorId);
    }

    @Patch('doctor/:doctorId')
    async update(
        @Param('doctorId') doctorId: string,
        @Body() updateDoctorProfileDto: Partial<CreateDoctorProfileDto>,
    ): Promise<DoctorProfile> {
        return await this.doctorProfileService.update(+doctorId, updateDoctorProfileDto);
    }

    @Delete('doctor/:doctorId')
    async remove(@Param('doctorId') doctorId: string): Promise<void> {
        return await this.doctorProfileService.remove(+doctorId);
    }
}
