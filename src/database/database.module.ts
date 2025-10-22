import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ ensures .env is loaded
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');

        // ✅ Option 1: Use DATABASE_URL if available
        if (databaseUrl) {
          const parsed = new URL(databaseUrl);
          return {
            type: 'postgres',
            host: parsed.hostname,
            port: parseInt(parsed.port) || 5432,
            username: parsed.username,
            password: parsed.password,
            database: parsed.pathname.replace('/', ''),
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: configService.get('NODE_ENV') !== 'production',
            ssl: { rejectUnauthorized: false },
            extra: {
              connectionTimeoutMillis: 10000,
            },
            retryAttempts: 10,
            retryDelay: 5000,
          };
        }

        // ✅ Option 2: Fallback if DATABASE_URL not defined
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get<number>('DB_PORT') || 5432,
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: configService.get('NODE_ENV') !== 'production',
          ssl: { rejectUnauthorized: false },
          extra: {
            connectionTimeoutMillis: 10000,
          },
          retryAttempts: 10,
          retryDelay: 5000,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
