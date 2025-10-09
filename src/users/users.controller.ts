import {
  Controller,
  Get,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Param,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { RolesGuard } from '../authentication/roles.guard';
import { Roles } from '../authentication/decorators/roles.decorator';
import { UserRole } from './enums/user-role.enum';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users with pagination and search' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched users with pagination',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getAllUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('role') role?: UserRole,
    @Query('search') search?: string,
  ) {
    limit = Math.min(limit, 100);
    const skip = (page - 1) * limit;

    return this.usersService.findAllWithPagination(skip, limit, role, search);
  }

  @Put('activate/:userId')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Activate or reactivate a user account' })
  @ApiResponse({
    status: 200,
    description: 'User account activated successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async activateUser(@Param('userId') userId: string) {
    return await this.usersService.reactivateAccount(userId);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched user details',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOneUserById(@Param('userId') userId: string): Promise<User> {
    const user = await this.usersService.findUser(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }
}
