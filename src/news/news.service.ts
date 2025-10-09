import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { PaginationService } from '../pagination/pagination.service';
import { News } from './entities/news.entity';
// import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class NewsService {
  private readonly cacheKeyPrefix = 'news:';

  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    // private readonly redisService: RedisService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(body: CreateNewsDto, files: Express.Multer.File[]): Promise<News> {
    const images = files.filter(file => file.mimetype.startsWith('image/'));

    const news = this.newsRepository.create({
  title: body.title,
  descriptionEn: body.descriptionEn,
  descriptionAm: body.descriptionAm,
  descriptionTi: body.descriptionTi,
  category: body.category,
  photoUrls: images.map((img) => `/uploads/photos/${img.filename}`),
});

    if (Array.isArray(news)) {
      throw new BadRequestException('Expected a single news object, but received an array');
    }

    const savedNews = await this.newsRepository.save(news);

    if (Array.isArray(savedNews)) {
      throw new BadRequestException('Expected a single saved news item, but received an array');
    }

    try {
      await this.invalidateCache('all');
    } catch (error: any) {
      console.error(`Failed to invalidate cache: ${error.message}`);
    }

    await this.cacheNews(savedNews);

    return savedNews;
  }

  async uploadMedia(
    newsId: string,
    filename: string,
    type: 'photo',
  ): Promise<News> {
    if (!filename) {
      throw new BadRequestException('Filename cannot be empty');
    }

    const news = await this.findNewsById(newsId);
    if (!news) {
      throw new NotFoundException(`News with ID ${newsId} not found`);
    }

    if (type === 'photo') {
      if (!Array.isArray(news.photoUrls)) {
        news.photoUrls = [];
      }
      const filePath = `/uploads/photos/${filename}`;
      if (!news.photoUrls.includes(filePath)) {
        news.photoUrls.push(filePath);
      }
    } else {
      throw new BadRequestException('Invalid media type. Must be "photo".');
    }

    console.log(`Saving media for news ${newsId}:`, { type, filename, photoUrls: news.photoUrls });
    const updatedNews = await this.newsRepository.save(news);
    await this.cacheNews(updatedNews);
    return updatedNews;
  }

  async findNewsById(newsId: string): Promise<News> {
    const cacheKey = `${this.cacheKeyPrefix}${newsId}`;
    // const cachedNews = await this.redisService.get(cacheKey);

    // if (cachedNews) {
    //   return JSON.parse(cachedNews);
    // }

    const news = await this.newsRepository.findOne({
      where: { newsId: newsId },
    });

    if (!news) {
      throw new NotFoundException(`News with ID ${newsId} not found`);
    }

    await this.cacheNews(news);
    return news;
  }

  async updateNews(
    newsId: string,
    updateNewsDto: UpdateNewsDto,
  ): Promise<News> {
    const news = await this.findNewsById(newsId);

    if (!Object.keys(updateNewsDto).length) {
      throw new BadRequestException('No values provided to update');
    }

    Object.assign(news, updateNewsDto);
    return this.updateAndCacheNews(news);
  }

  async deleteNews(newsId: string): Promise<void> {
    const news = await this.findNewsById(newsId);
    await this.newsRepository.remove(news);
    await this.invalidateCache(newsId);
    await this.invalidateCache('all');
  }

 async getAllNews(page: number, limit: number): Promise<{ data: News[]; pagination: any }> {
    const queryBuilder = this.newsRepository.createQueryBuilder('news')
      .orderBy('news.createdAt', 'DESC'); 

    const { data, pagination } = await this.paginationService.paginateAndFetch(
      queryBuilder,
      page,
      limit,
    );

    return { data, pagination };
  }

  async searchNews(
    searchTerm: string,
    page: number = 1,
    limit: number = 100,
  ): Promise<{ data: News[]; pagination: any }> {
    const queryBuilder = this.newsRepository.createQueryBuilder('news');

    if (searchTerm) {
      queryBuilder.where(
        `(news.title ILIKE :searchTerm 
        OR news.descriptionEn ILIKE :searchTerm 
        OR news.descriptionAm ILIKE :searchTerm 
        OR news.descriptionTi ILIKE :searchTerm)`,
        { searchTerm: `%${searchTerm}%` },
      );
    }

    const { data, pagination } = await this.paginationService.paginateAndFetch(
      queryBuilder,
      page,
      limit,
    );

    return { data, pagination };
  }

  private async cacheNews(news: News): Promise<void> {
    const cacheKey = `${this.cacheKeyPrefix}${news.newsId}`;
    // await this.redisService.set(cacheKey, JSON.stringify(news), 3600);
  }

  private async updateAndCacheNews(news: News): Promise<News> {
    try {
      const updatedNews = await this.newsRepository.save(news);
      await this.cacheNews(updatedNews);
      await this.invalidateCache('all');
      return updatedNews;
    } catch (error: any) {
      throw new BadRequestException(`Failed to update news: ${error.message}`);
    }
  }

  private async invalidateCache(cacheKeySuffix: string): Promise<void> {
    const cacheKey = `${this.cacheKeyPrefix}${cacheKeySuffix}`;
    // await this.redisService.del(cacheKey);
  }
}