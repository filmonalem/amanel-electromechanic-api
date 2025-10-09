import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { ContactStatus } from '../contact-status.enum';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Phone number must be at least 5 characters long' })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Description must be at least 3 characters long' })
  description: string;

  


  status?: ContactStatus;
}