import { IsEmail } from 'class-validator';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { License } from 'src/license/entities/license.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  gender: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.BUYER })
  role: UserRole;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ nullable: true })
passwordResetToken: string | null;

@Column({ nullable: true })
passwordResetExpires: Date | null;


  @Column({ nullable: true, type: 'timestamp' })
  lastLogin: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isAdmin: boolean;
  @OneToMany(() => License, (license) => license.user)
  licenses: License[];
}
