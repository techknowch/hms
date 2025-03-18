import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { PatientService } from './patient.service';
import { Patient } from '../../entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';

@Controller('patient')
export class PatientController {
    constructor(
        private readonly patientService: PatientService
    ) { }

    @Throttle({
        default: {
            limit: 5,
            ttl: 10000,
        },
    }) // Max 5 requests per 10 seconds for this route

    @Post()
    async create(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
        return this.patientService.create(createPatientDto);
    }

    @Throttle({
        default: {
            limit: 5,
            ttl: 10000,
        },
    }) // Max 5 requests per 10 seconds for this route

    @Get()
    async findAll(): Promise<Patient[]> {
        return this.patientService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Patient> {
        return this.patientService.findOne(id);
    }

    // Update a patient
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateData: Partial<Patient>,
    ): Promise<Patient> {
        return this.patientService.update(id, updateData);
    }

    // Delete a patient
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.patientService.remove(id);
    }

}           
