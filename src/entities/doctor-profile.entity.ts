import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Doctor } from './doctor.entity';

@Entity()
export class DoctorProfile {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Doctor)
    @JoinColumn()
    doctor: Doctor;

    @Column()
    biography: string;

    @Column('simple-array', { nullable: true })
    languages: string[];

    @Column('simple-array', { nullable: true })
    certifications: string[];

    @Column({ type: 'json', nullable: true })
    education: {
        degree: string;
        institution: string;
        year: number;
    }[];

    @Column({ type: 'json', nullable: true })
    workHistory: {
        institution: string;
        position: string;
        startYear: number;
        endYear?: number;
    }[];

    @Column({ nullable: true })
    profilePicture: string;

    @Column({ type: 'json', nullable: true })
    socialMediaLinks: {
        platform: string;
        url: string;
    }[];

    @Column({ nullable: true })
    consultationFee: number;
}
