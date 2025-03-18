import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreatePatientDto {
    @IsString()
    name: string;

    @IsInt()
    age: number;

    @IsString()
    gender: string;

    @IsString()
    @IsOptional()
    medicalHistory?: string;
}