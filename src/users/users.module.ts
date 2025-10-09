import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PaginationService } from '../pagination/pagination.service';
import { CacheModule } from '@nestjs/cache-manager';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CacheModule.register({
      ttl: 5,
      max: 100,
    }),
  ],
  providers: [UsersService, PaginationService],
  controllers: [UsersController],
  exports: [UsersService, PaginationService],
})
export class UsersModule {}
