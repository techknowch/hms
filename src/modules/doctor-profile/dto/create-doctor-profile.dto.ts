import { IsString, IsNumber, IsArray, IsOptional, ValidateNested, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

class EducationDto {
    @IsString()
    degree: string;

    @IsString()
    institution: string;

    @IsNumber()
    year: number;
}

class WorkHistoryDto {
    @IsString()
    institution: string;

    @IsString()
    position: string;

    @IsNumber()
    startYear: number;

    @IsOptional()
    @IsNumber()
    endYear?: number;
}

class SocialMediaLinkDto {
    @IsString()
    platform: string;

    @IsUrl()
    url: string;
}

export class CreateDoctorProfileDto {
    @IsNumber()
    doctorId: number;

    @IsString()
    biography: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    languages?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    certifications?: string[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => EducationDto)
    education?: EducationDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => WorkHistoryDto)
    workHistory?: WorkHistoryDto[];

    @IsOptional()
    @IsString()
    profilePicture?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SocialMediaLinkDto)
    socialMediaLinks?: SocialMediaLinkDto[];

    @IsOptional()
    @IsNumber()
    consultationFee?: number;
}
