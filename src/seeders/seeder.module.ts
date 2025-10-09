import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { SuperAdminSeeder } from './super-admin.seeder';
import { ModuleRef } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [SuperAdminSeeder],
  exports: [SuperAdminSeeder],
})
export class SeederModule implements OnModuleInit {
  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    const seeder = this.moduleRef.get(SuperAdminSeeder, { strict: false });
    await seeder.seed();
  }
}
