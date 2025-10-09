// src/utility/multer.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';

@Injectable()
export class MulterService {
  static multerOptions = {
    storage: diskStorage({
      destination: (req, file, callback) => {
        const isVideo = file.mimetype.startsWith('video/');
        const uploadPath = isVideo ? './uploads/videos' : './uploads/photos';

        if (!existsSync(uploadPath)) {
          mkdirSync(uploadPath, { recursive: true });
        }

        console.log(`Multer destination for ${file.originalname}: ${uploadPath}`);
        callback(null, uploadPath);
      },
      filename: (req, file, callback) => {
        const fileExt = extname(file.originalname).toLowerCase();
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${uniqueSuffix}${fileExt}`;
        console.log(`Multer filename for ${file.originalname}: ${filename}`);
        callback(null, filename);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!file) {
        console.log('Multer: No file uploaded');
        return callback(new BadRequestException('No file uploaded'), false);
      }

      const allowedMimetypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'video/mp4',
        'video/mpeg',
        'video/quicktime',
      ];

      if (!allowedMimetypes.includes(file.mimetype)) {
        console.log(`Multer rejected file ${file.originalname}: Invalid mimetype ${file.mimetype}`);
        return callback(
          new BadRequestException(`Invalid file type: ${file.mimetype}. Allowed: images and videos`),
          false,
        );
      }

      console.log(`Multer accepted file ${file.originalname}: ${file.mimetype}`);
      callback(null, true);
    },
    limits: {
      fileSize: 20 * 1024 * 1024, // 20MB limit
      files: 10, // Max 10 files
    },
  };
}