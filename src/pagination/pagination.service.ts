import { Injectable } from '@nestjs/common';
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class PaginationService {
  private readonly defaultLimit: number = 100;

  paginate<T  extends ObjectLiteral>(
    query: SelectQueryBuilder<T>,
    page: number,
    limit: number = this.defaultLimit,
  ): SelectQueryBuilder<T> {
    page = this.ensureValidNumber(page, 1);
    limit = this.ensureValidNumber(limit, this.defaultLimit);

    const offset = (page - 1) * limit;
    query.skip(offset).take(limit);
    return query;
  }

  private ensureValidNumber(value: any, defaultValue: number): number {
    const numberValue = Number(value);
    return isNaN(numberValue) || numberValue < 1 ? defaultValue : numberValue;
  }

  getPaginationMetadata(total: number, page: number, limit: number) {
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      total,
      currentPage: page,
      totalPages,
      hasNextPage,
      hasPreviousPage,
      next: hasNextPage ? page + 1 : null,
      previous: hasPreviousPage ? page - 1 : null,
    };
  }

  async paginateAndFetch<T  extends ObjectLiteral> (
    query: SelectQueryBuilder<T >,
    page: number,
    limit: number = this.defaultLimit,
  ) {
    this.paginate(query, page, limit);
    const [data, total] = await query.getManyAndCount();
    const paginationMetadata = this.getPaginationMetadata(total, page, limit);

    return {
      data,
      pagination: paginationMetadata,
    };
  }
}
