// src/license/license.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { License } from './entities/license.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class LicenseService {
  constructor(
    @InjectRepository(License)
    private readonly licenseRepository: Repository<License>,
  ) {}

  generateLicenseKey(): string {
    return 'LIC-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  async createLicense(user: User): Promise<License> {
    const license = new License();
    license.key = this.generateLicenseKey();
    license.validFrom = new Date();
    license.validTo = new Date(
      new Date().setFullYear(new Date().getFullYear() + 1),
    );
    license.user = user;

    return this.licenseRepository.save(license);
  }

  async validateLicense(key: string): Promise<boolean> {
    const license = await this.licenseRepository.findOne({ where: { key } });
    if (!license) return false;

    const now = new Date();
    return license.validFrom <= now && license.validTo >= now;
  }

  async activateLicense(key: string): Promise<License> {
    const license = await this.licenseRepository.findOne({ where: { key } });
    if (!license) throw new Error('License not found');

    license.isActive = true;
    return this.licenseRepository.save(license);
  }
}
