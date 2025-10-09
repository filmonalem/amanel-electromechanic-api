import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../users/enums/user-role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SuperAdminSeeder {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async seed() {
    const email = process.env.SUPER_ADMIN_EMAIL || 'superadmin@gmail.com';
    const password = process.env.SUPER_ADMIN_PASSWORD || 'superadd@123';

    try {
      const existingSuperAdmin = await this.entityManager.findOne(User, {
        where: { email },
      });

      if (existingSuperAdmin) {
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const superAdmin = this.entityManager.create(User, {
        email,
        password: hashedPassword,
        phoneNumber: '251925439814',
        role: UserRole.SUPER_ADMIN,
        gender: 'male',
        fullName: 'Super Admin',
        isActive: true,
        isAdmin: true,
      });

      await this.entityManager.save(User, superAdmin);
    } catch ( error: any) {
      throw new InternalServerErrorException(
        'Error seeding super admin: ' + error.message,
      );
    }
  }
}
