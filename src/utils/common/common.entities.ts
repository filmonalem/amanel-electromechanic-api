import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class ProductCommonEntity extends BaseEntity {
  
@Column()
productId:string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({nullable:true})
  generic: string;

  @Column()
  brand: string;

  @Column()
  category: string;

  @Column()
  form: string;

  @Column()
  strength: string;

  @Column()
  unit: string;

  @Column()
  isPaid: string;

  @Column({ type: 'float' })
  price: number;

  @Column()
  quantity: number;

  @Column()
  referenceNo: string;

  @Column({ nullable: true }) 
  description: string;
  
  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date
}
