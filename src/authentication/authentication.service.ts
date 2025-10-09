import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LoginDto } from './dto/login.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    return this.usersService.validateUser(email, password);
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    const payload: any = {
      userId: user.userId,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
      isAdmin: user.isAdmin,
    };

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '1h' }),
      user: payload,
    };
  }

  async signup(signupDto: SignupDto) {
    await this.usersService.create(signupDto);
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    try {
      await this.usersService.changePassword(
        changePasswordDto.userId,
        changePasswordDto.currentPassword,
        changePasswordDto.newPassword,
      );

      return { message: 'Password changed successfully' };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException('User not found');
      }
      throw new BadRequestException('Failed to change password');
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    try {
      const resetToken = await this.usersService.initiatePasswordReset(
        forgotPasswordDto.email,
      );

      await this.mailService.sendPasswordReset(
        forgotPasswordDto.email,
        resetToken,
      );

      return {
        message: 'If the email exists, a password reset link has been sent.',
      };
    } catch (error) {
      return {
        message: 'If the email exists, a password reset link has been sent.',
      };
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    if (resetPasswordDto.newPassword !== resetPasswordDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    await this.usersService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.newPassword,
    );

    return { message: 'Password reset successfully' };
  }

  async deactivateAccount(userId: string) {
    await this.usersService.reactivateAccount(userId);
    return { message: 'Account deactivated successfully' };
  }
}
