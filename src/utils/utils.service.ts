// import { BadRequestException, Injectable } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class UtilsService {
//   private readonly saltRounds = 10;
//   constructor() {}

//   generateUniqueCode(name: any): any {
//     const nameChar = name.name.charAt(0).toUpperCase();
//     const brandChar = name.brand.charAt(0).toUpperCase();
//     const categoryChar = name.category.charAt(0).toUpperCase();
//     const genericChar = name.generic.charAt(0).toUpperCase();
//     const strengthChar = name.strength.charAt(0).toUpperCase();
//     return `Med-${nameChar}${brandChar}${categoryChar}${genericChar}${strengthChar}`;
//   }

//   generateReferenceNo(prefix: string): string {
//     const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
//     const randomNum = Math.floor(Math.random() * 1000);
//     return `${prefix}${date}-${randomNum}`;
//   }

//   async hashPassword(password: string): Promise<string> {
//     const salt = await bcrypt.genSalt(this.saltRounds);
//     return bcrypt.hash(password, salt);
//   }

//   async comparePassword(
//     plainPassword: string,
//     hashedPassword: string,
//   ): Promise<boolean> {
//     return bcrypt.compare(plainPassword, hashedPassword);
//   }

//  private calculateTotals(
//   products: { price: number; quantity: number }[],
//   paidAmount: number,
// ): { totalPrice: number; remainPrice: number; isPaid: string } {
//   if (!products || !Array.isArray(products) || products.length === 0) {
//     throw new BadRequestException('Products array is empty or invalid');
//   }

//   const totalPrice = products.reduce((sum, product, index) => {
//     const price = Number(product.price);
//     const quantity = Number(product.quantity);

//     if (isNaN(price) || price <= 0) {
//       throw new BadRequestException(`Invalid price for product at index ${index}`);
//     }
//     if (isNaN(quantity) || quantity <= 0) {
//       throw new BadRequestException(`Invalid quantity for product at index ${index}`);
//     }

//     return sum + price * quantity;
//   }, 0);

//   if (isNaN(totalPrice) || totalPrice <= 0) {
//     throw new BadRequestException('Calculated total price is invalid');
//   }

//   const remainPrice = totalPrice - paidAmount; // Fixed: totalPrice - paidAmount
//   const isPaid = remainPrice <= 0 ? 'cash' : 'credit';
//   return { totalPrice, remainPrice, isPaid };
// }

//   calculateTotalPrice(
//     price: number,
//     quantity: number,
//     taxRate = 0,
//     discount = 0,
//   ): number {
//     const subtotal = price * quantity;
//     const tax = subtotal * taxRate;
//     const discountAmount = subtotal * discount;
//     const total = subtotal + tax - discountAmount;
//     return parseFloat(total.toFixed(2));
//   }

//   async calculatePrice(data: any) {
//     let total = 0;
//     let remainPrice = 0;
//     data.map((payment: any) => {
//       total += payment.totalPrice;
//       remainPrice += payment.remainPrice;
//     });
//     return {
//       totalPrice: total,
//     };
//   }
// }
// src/utils/utils.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilsService {
  private readonly saltRounds = 10;

  constructor() {}

  generateUniqueCode(name: any): any {
    const nameChar = name.name.charAt(0).toUpperCase();
    const brandChar = name.brand.charAt(0).toUpperCase();
    const categoryChar = name.category.charAt(0).toUpperCase();
    const genericChar = name.generic.charAt(0).toUpperCase();
    const strengthChar = name.strength.charAt(0).toUpperCase();
    return `Med-${nameChar}${brandChar}${categoryChar}${genericChar}${strengthChar}`;
  }

  generateReferenceNo(prefix: string): string {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomNum = Math.floor(Math.random() * 1000);
    return `${prefix}${date}-${randomNum}`;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async calculatePrice(products: any[]): Promise<{ totalPrice: number }> {
    if (!products || !Array.isArray(products) || products.length === 0) {
      throw new BadRequestException('Products array is empty or invalid');
    }

    console.log('Products for price calculation:', JSON.stringify(products, null, 2));

    const totalPrice = products.reduce((sum, product, index) => {
      if (!product) {
        throw new BadRequestException(`Product at index ${index} is null or undefined`);
      }

      // Explicitly convert to number and check type
      const price = parseFloat(product.price);
      const quantity = parseInt(product.quantity, 10);

      if (isNaN(price) || price <= 0) {
        throw new BadRequestException(
          `Invalid price for product at index ${index}: ${product.name || 'unknown'} (price: ${product.price}, type: ${typeof product.price})`
        );
      }
      if (isNaN(quantity) || quantity <= 0) {
        throw new BadRequestException(
          `Invalid quantity for product at index ${index}: ${product.name || 'unknown'} (quantity: ${product.quantity}, type: ${typeof product.quantity})`
        );
      }

      const subtotal = price * quantity;
      console.log(
        `Product: ${product.name || 'unknown'}, Price: ${price}, Quantity: ${quantity}, Subtotal: ${subtotal}`
      );

      return sum + subtotal;
    }, 0);

    console.log('Calculated totalPrice:', totalPrice);

    if (isNaN(totalPrice) || totalPrice <= 0) {
      throw new BadRequestException(`Calculated total price is invalid: ${totalPrice}`);
    }

    return { totalPrice };
  }

  private calculateTotals(
    products: { price: number; quantity: number }[],
    paidAmount: number,
  ): { totalPrice: number; remainPrice: number; isPaid: string } {
    if (!products || !Array.isArray(products) || products.length === 0) {
      throw new BadRequestException('Products array is empty or invalid');
    }

    const totalPrice = products.reduce((sum, product, index) => {
      const price = Number(product.price);
      const quantity = Number(product.quantity);

      if (isNaN(price) || price <= 0) {
        throw new BadRequestException(`Invalid price for product at index ${index}`);
      }
      if (isNaN(quantity) || quantity <= 0) {
        throw new BadRequestException(`Invalid quantity for product at index ${index}`);
      }

      return sum + price * quantity;
    }, 0);

    if (isNaN(totalPrice) || totalPrice <= 0) {
      throw new BadRequestException('Calculated total price is invalid');
    }

    const remainPrice = totalPrice - paidAmount;
    const isPaid = remainPrice <= 0 ? 'cash' : 'credit';
    return { totalPrice, remainPrice, isPaid };
  }

  calculateTotalPrice(
    price: number,
    quantity: number,
    taxRate = 0,
    discount = 0,
  ): number {
    const subtotal = price * quantity;
    const tax = subtotal * taxRate;
    const discountAmount = subtotal * discount;
    const total = subtotal + tax - discountAmount;
    return parseFloat(total.toFixed(2));
  }
}