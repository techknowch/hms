// src/common/validation.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidationService {
    validatePatientData(data: any): void {
        const { name, age, gender, medicalHistory } = data;

        // Validate name
        if (!name || typeof name !== 'string' || name.length < 2) {
            throw new BadRequestException('Name must be a string with at least 2 characters.');
        }

        // Validate age
        if (!age || typeof age !== 'number' || age < 0 || age > 120) {
            throw new BadRequestException('Age must be a number between 0 and 120.');
        }

        // Validate gender
        const validGenders = ['Male', 'Female', 'Other'];
        if (!gender || !validGenders.includes(gender)) {
            throw new BadRequestException(`Gender must be one of: ${validGenders.join(', ')}.`);
        }

        // Validate medicalHistory (optional)
        if (medicalHistory && typeof medicalHistory !== 'string') {
            throw new BadRequestException('Medical history must be a string.');
        }
    }
}