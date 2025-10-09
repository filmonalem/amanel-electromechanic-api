// src/license/license.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { LicenseService } from './license.service';

@Injectable()
export class LicenseGuard implements CanActivate {
  constructor(private readonly licenseService: LicenseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const licenseKey = request.headers['license-key'];

    if (!licenseKey) return false;

    return this.licenseService.validateLicense(licenseKey);
  }
}
