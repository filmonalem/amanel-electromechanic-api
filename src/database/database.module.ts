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
        host:
          configService.get('DB_HOST') ||
          'dpg-cqj8l8unttvs73bkjvv0-a.oregon-postgres.render.com',
        port: configService.get<number>('DB_PORT') || 5432,
        username: configService.get('DB_USERNAME') || 'loop_db_user',
        password: configService.get('DB_PASSWORD') || 'f3451146',
        database: configService.get('DB_NAME') || 'loop',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: configService.get('NODE_ENV') !== 'production',

        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
          },
        },

        poolSize: 10,
      }),
    }),
  ],
})
export class DatabaseModule {}
