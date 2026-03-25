// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: 'philmon',
//       password: 'f3451146',
//       database: 'website',
//       autoLoadEntities: true, // ✅ safest
//       synchronize: true,
//     })
//   ],
// })
// export class DatabaseModule { }
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // ✅ important
      autoLoadEntities: true,
      synchronize: true, 
      ssl: {
        rejectUnauthorized: false, // ✅ required for Render
      },
    }),
  ],
})
export class DatabaseModule {}