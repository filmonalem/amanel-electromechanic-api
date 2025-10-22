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
            host: 'containers-us-west-12.railway.app',
            port: configService.get<number>('DB_PORT') || 5432,
            username: configService.get('DB_USERNAME') || 'postgres',
            password: 'RZDTwxhmeGAJQecFdGMlkTfzWRRSZDjp  ',
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
