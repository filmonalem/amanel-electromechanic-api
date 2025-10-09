import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './authentication/authentication.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { SeederModule } from './seeders/seeder.module';
import { RateLimiterModule } from 'nestjs-rate-limiter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DatabaseModule } from './database/database.module';
import { LicenseModule } from './license/license.module';
import { ContactModule } from './contact/contact.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    MailerModule,
    SeederModule,
    RateLimiterModule.register({
      points: 10,
      duration: 1,
      keyPrefix: 'device',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads/',
    }),
    AuthModule,
    DatabaseModule,
    LicenseModule,
    ContactModule,
    NewsModule,
  ],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
