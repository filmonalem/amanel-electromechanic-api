import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { News } from './entities/news.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { RedisService } from 'src/redis/redis.service';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([News])],
  controllers: [NewsController],
  providers: [NewsService,PaginationService],
})
export class NewsModule {}
