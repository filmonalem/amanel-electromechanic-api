import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: 'dpg-cqj8l8unttvs73bkjvv0-a.oregon-postgres.render.com',
        port: 5432,
        username: configService.get('DB_USERNAME') || 'Philmon',
        password: configService.get('DB_PASSWORD') || 'f3451146',
        database: configService.get('DB_NAME') || 'loop',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: configService.get('NODE_ENV') !== 'production',
        ssl: { rejectUnauthorized: false }, // Required for Render
        extra: {
          max: 20, // pool size
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 2000,
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
