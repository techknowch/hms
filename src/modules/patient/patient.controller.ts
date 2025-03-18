import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    NotFoundException
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from '../../entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';

@Controller('patient')
export class PatientController {
    constructor(
        private readonly patientService: PatientService
    ) { }

    @Post()
    async create(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
        return this.patientService.create(createPatientDto);
    }

    @Get()
    async findAll(): Promise<Patient[]> {
        return this.patientService.findAll();
    }

}           
