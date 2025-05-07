import { IsNotEmpty, IsDateString, IsInt } from 'class-validator';

export class CreateAppointmentDto {
  @IsInt()
  patientId: number;

  @IsInt()
  doctorId: number;

  @IsDateString()
  startTime: Date;

  @IsNotEmpty()
  durationMinutes: number; // Used to calculate endTime
}