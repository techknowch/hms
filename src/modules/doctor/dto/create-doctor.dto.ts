import { IsString, IsNumber, IsEmail, IsObject, IsOptional } from 'class-validator';

export class CreateDoctorDto {
    @IsString()
    name: string;

    @IsString()
    specialization: string;

    @IsString()
    qualification: string;

    @IsNumber()
    experience: number;

    @IsString()
    contactNumber: string;

    @IsEmail()
    email: string;

    @IsObject()
    @IsOptional()
    availability?: object;

    @IsString()
    @IsOptional()
    licenseNumber?: string;
}
