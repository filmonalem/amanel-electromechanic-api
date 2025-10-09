import { PartialType } from '@nestjs/swagger';
import { CreateNewsDto } from './create-news.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateNewsDto extends PartialType(CreateNewsDto) {
    @IsString()
    @IsNotEmpty()
      title?: string;
    @IsString()
    @IsNotEmpty()
  descriptionEn?: string;
   @IsString()
    @IsNotEmpty()
  descriptionAm?: string;
   @IsString()
    @IsNotEmpty()
  descriptionTi?: string;
}
