import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { Doctor } from '../../entities/doctor.entity';
import { ValidationService } from '../../common/validation/validation.service';

@Module({
    imports: [TypeOrmModule.forFeature([Doctor])],
    controllers: [DoctorController],
    providers: [DoctorService, ValidationService],
    exports: [DoctorService]
})
export class DoctorModule {}
