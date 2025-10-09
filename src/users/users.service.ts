import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, Not, In } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import * as crypto from 'crypto';
import { UserRole } from './enums/user-role.enum';
import { PaginationService } from '../pagination/pagination.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly paginationService: PaginationService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, role, phoneNumber } = createUserDto;

    if (!Object.values(UserRole).includes(role)) {
      throw new HttpException(`Invalid role provided: ${role}`, 403);
    }

    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new HttpException('Email is already taken', 403);
    }

    const phoneExists = await this.usersRepository.findOne({
      where: { phoneNumber },
    });
    if (phoneExists) {
      throw new HttpException('Phone number is already taken', 403);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      isActive: role !== UserRole.ADMIN && role !== UserRole.SUPER_ADMIN,
      isAdmin: role === UserRole.ADMIN || role === UserRole.SUPER_ADMIN,
    });

    try {
      return await this.usersRepository.insert(user);
    } catch (error) {
      throw new BadRequestException('Error occurred while saving user');
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findUser(email, true);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
  async findUser(identifier: string, isEmail: boolean = false): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: isEmail ? { email: identifier } : { userId: identifier },
    });

    if (!user) {
      throw new NotFoundException(
        `User with ${isEmail ? 'email' : 'ID'} ${identifier} not found`,
      );
    }
    return user;
  }

  async initiatePasswordReset(email: string): Promise<string> {
    const user = await this.findUser(email);

    if (!user) {
      throw new BadRequestException(
        'If the email exists, a reset link will be sent',
      );
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = new Date(Date.now() + 30 * 60 * 1000);

    await this.usersRepository.save(user);

    return resetToken;
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await this.usersRepository.findOne({
      where: {
        passwordResetToken: hashedToken,
        passwordResetExpires: MoreThan(new Date()),
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.passwordResetToken = null;
    user.passwordResetExpires = null;

    await this.usersRepository.save(user);
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findUser(userId);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    } else {
      delete updateUserDto.password;
    }

    Object.assign(user, updateUserDto);
    return await this.usersRepository.save(user);
  }

  async remove(userId: string): Promise<void> {
    const result = await this.usersRepository.delete(userId);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  }

  async findAllWithPagination(
    page: number,
    limit: number,
    role?: UserRole,
    search?: string,
  ): Promise<any> {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    if (role) {
      const normalizedRole = role.toUpperCase();
      if (!Object.values(UserRole).includes(normalizedRole as UserRole)) {
        throw new BadRequestException(`Invalid role: ${role}`);
      }
      queryBuilder.andWhere('user.role = :role', { role: normalizedRole });
    }

    if (search) {
      queryBuilder.andWhere('user.name ILIKE :search', {
        search: `%${search}%`,
      });
    }

    const paginatedResult = await this.paginationService.paginateAndFetch(
      queryBuilder,
      page,
      limit,
    );

    return paginatedResult;
  }

  async findBuyers(excludeUserIds: number[] = []): Promise<User[]> {
    return this.usersRepository.find({
      where: { role: UserRole.BUYER, userId: Not(In(excludeUserIds)) },
    });
  }
  async reactivateAccount(userId: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { userId } });
    if (user) {
      user.isActive = true;
      return this.usersRepository.save(user);
    }
    throw new Error('User not found');
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.userId = :userId', { userId })
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const salt = await bcrypt.genSalt();
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedNewPassword;

    await this.usersRepository.save(user);
  }
}
