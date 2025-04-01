import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorProfileController } from './doctor-profile.controller';
import { DoctorProfileService } from './doctor-profile.service';
import { DoctorProfile } from '../../entities/doctor-profile.entity';
import { Doctor } from '../../entities/doctor.entity';

@Module({
    imports: [TypeOrmModule.forFeature([DoctorProfile, Doctor])],
    controllers: [DoctorProfileController],
    providers: [DoctorProfileService],
    exports: [DoctorProfileService],
})
export class DoctorProfileModule {}
