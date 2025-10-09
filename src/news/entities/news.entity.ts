import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum NewsCategory {
  MARKET_TRENDS = 'MARKET_TRENDS',
  PROPERTY_SHOWCASES = 'PROPERTY_SHOWCASES',
  GENERAL = 'GENERAL',
}

@Entity('news')
export class News {
  @PrimaryGeneratedColumn('uuid')
  newsId: string;

  @Column()
  title: string;

  @Column('text')
  descriptionEn: string;

  @Column('enum', { enum: NewsCategory, nullable: true, default: NewsCategory.GENERAL })
  category: NewsCategory;

  @Column('text', { nullable: true })
  descriptionAm: string;

  @Column('text', { nullable: true })
  descriptionTi: string;

  @Column('text', { array: true, default: {} })
  photoUrls: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}