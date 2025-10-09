import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class License {
  @PrimaryGeneratedColumn()
  licenseId: string;

  @Column()
  key: string;

  @Column()
  validFrom: Date;

  @Column()
  validTo: Date;

  @Column({ default: false })
  isActive: boolean;
  @ManyToOne(() => User, (user) => user.licenses)
  user: User;
}
