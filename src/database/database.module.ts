import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const databaseUrl = configService.get('DATABASE_URL');
        if (databaseUrl) {
          const parsedUrl = new URL(databaseUrl);
          return {
            type: 'postgres',
            host: parsedUrl.hostname,
            port: parsedUrl.port ? parseInt(parsedUrl.port) : 5432,
            username: parsedUrl.username,
            password: parsedUrl.password,
            database: parsedUrl.pathname.split('/')[1],
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: configService.get('NODE_ENV') !== 'production',
            ssl: { rejectUnauthorized: false },
            extra: {
              max: 20,
              idleTimeoutMillis: 30000,
              connectionTimeoutMillis: 2000,
            },
            retryAttempts: 5,
            retryDelay: 3000,
          };
        } else {
          return {
            type: 'postgres',
            host:
              configService.get('DB_HOST') ||
              'dpg-cqj8l8unttvs73bkjvv0-a.oregon-postgres.render.com',
            port: configService.get<number>('DB_PORT') || 5432,
            username: configService.get('DB_USERNAME') || 'Philmon',
            password: configService.get('DB_PASSWORD') || 'f3451146',
            database: configService.get('DB_NAME') || 'loop',
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: configService.get('NODE_ENV') !== 'production',
            ssl: { rejectUnauthorized: false },
            extra: {
              max: 20,
              idleTimeoutMillis: 30000,
              connectionTimeoutMillis: 2000,
            },
            retryAttempts: 5,
            retryDelay: 3000,
          };
        }
      },
    }),
  ],
})
export class DatabaseModule {}
