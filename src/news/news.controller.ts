import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  Query,
  BadRequestException,
  UploadedFiles,
  UseInterceptors,
  Logger,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';
import { UserRole } from '../users/enums/user-role.enum';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { RolesGuard } from '../authentication/roles.guard';
import { Roles } from '../authentication/decorators/roles.decorator';
import { MulterService } from '../utility/multer';

@ApiTags('News')
@ApiBearerAuth()
@Controller('news')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NewsController {
  private readonly logger = new Logger(NewsController.name);

  constructor(private readonly newsService: NewsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new news item with images' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'News created successfully', type: News })
  @ApiResponse({ status: 400, description: 'Invalid files or data. Allowed: JPEG, PNG, GIF, WebP images' })
  @UseInterceptors(FilesInterceptor('files', 10, MulterService.multerOptions))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createNewsDto: CreateNewsDto,
  ) {
    try {
      this.logger.log(`Received ${files?.length || 0} files for news creation`);
      if (!files || files.length === 0) {
        throw new BadRequestException('At least one image is required');
      }
      files.forEach(file => {
        this.logger.log(`Processing file: ${file.filename}, mimetype: ${file.mimetype}, path: ${file.path}`);
      });
      const news = await this.newsService.create(createNewsDto, files);
      return { message: 'News posted successfully', data: news };
    } catch (error: any) {
      this.logger.error(`Failed to create news: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Failed to create news: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':id/media')
  @ApiOperation({ summary: 'Upload additional images for a news item' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'Media uploaded successfully', type: News })
  @ApiResponse({ status: 400, description: 'No files provided. Allowed: JPEG, PNG, GIF, WebP images' })
  @UseInterceptors(FilesInterceptor('files', 10, MulterService.multerOptions))
  async uploadMedia(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Query('type') type: 'photo' = 'photo',
  ) {
    this.logger.log(`Uploading ${files?.length || 0} files for news ${id}, type: ${type}`);
    if (!files || files.length === 0) {
      throw new BadRequestException('At least one file is required');
    }
    for (const file of files) {
      const fileName = `${id}-${file.filename}`;
      this.logger.log(`Uploading file: ${fileName}, mimetype: ${file.mimetype}, path: ${file.path}`);
      await this.newsService.uploadMedia(id, fileName, type);
    }
    const news = await this.newsService.findNewsById(id);
    return { message: 'Media uploaded successfully', data: news };
  }

  @Get()
  @ApiOperation({ summary: 'Get all news with pagination and optional search' })
  @ApiResponse({ status: 200, description: 'List of news items', type: [News] })
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('searchTerm') searchTerm: string,
  ) {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    if (pageNum < 1 || limitNum < 1) {
      throw new BadRequestException('Page and limit must be greater than 0');
    }
    if (searchTerm) {
      return this.newsService.searchNews(searchTerm, pageNum, limitNum);
    }
    return this.newsService.getAllNews(pageNum, limitNum);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a news item by ID' })
  @ApiResponse({ status: 200, description: 'News item details', type: News })
  @ApiResponse({ status: 404, description: 'News not found' })
  async findOne(@Param('id') id: string) {
    return this.newsService.findNewsById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a news item' })
  @ApiResponse({ status: 200, description: 'News updated successfully', type: News })
  @ApiResponse({ status: 404, description: 'News not found' })
  async update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    const news = await this.newsService.updateNews(id, updateNewsDto);
    return { message: 'News updated successfully', data: news };
  }

 @Delete(':id')
@ApiOperation({ summary: 'Delete a news item' })
@ApiResponse({ status: 200, description: 'News deleted successfully' })
@ApiResponse({ status: 404, description: 'News not found' })
async remove(@Param('id') id: string) {
  await this.newsService.deleteNews(id);
  return { message: 'News deleted successfully' };
}

}