import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { NewsCategory } from "../entities/news.entity";

export class CreateNewsDto {
    @IsString()
    @IsNotEmpty()
      title?: string;
    @IsEnum(NewsCategory)
    @IsNotEmpty()
    category: NewsCategory;
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
