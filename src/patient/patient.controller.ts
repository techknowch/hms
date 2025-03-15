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
import { Patient } from 'src/entities/patient.entity';

@Controller('patient')
export class PatientController {
    constructor(
        private readonly patientService: PatientService
    ) { }

    @Post()
    async create(@Body() patientData: Partial<Patient>): Promise<Patient> {
        return this.patientService.create(patientData);
    }

}
