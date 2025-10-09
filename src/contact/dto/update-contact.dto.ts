import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './create-contact.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ContactStatus } from '../contact-status.enum';

export class UpdateContactDto
  extends PartialType(CreateContactDto)
  implements Partial<CreateContactDto>
{
  @IsEnum(ContactStatus)
  @IsOptional()
  status?: ContactStatus;
}
