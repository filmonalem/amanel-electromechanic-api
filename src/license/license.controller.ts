// src/license/license.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { LicenseService } from './license.service';
import { CreateLicenseDto } from './dto/create-license.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { RolesGuard } from 'src/authentication/roles.guard';

@Controller('license')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class LicenseController {
  constructor(
    private readonly licenseService: LicenseService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Inject UserRepository
  ) {}

  @Post()
  async createLicense(@Body() createLicenseDto: CreateLicenseDto) {
    // Fetch the user from the database
    const user = await this.userRepository.findOne({
      where: { userId: createLicenseDto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Create the license for the user
    return this.licenseService.createLicense(user);
  }

  @Get('validate/:key')
  async validateLicense(@Param('key') key: string) {
    return this.licenseService.validateLicense(key);
  }

  @Patch('activate/:key')
  async activateLicense(@Param('key') key: string) {
    return this.licenseService.activateLicense(key);
  }
}
