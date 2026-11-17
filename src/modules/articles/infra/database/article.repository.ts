import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { Article } from '../../model/article.model';
import { ArticleRequest } from '../http/request/article.request';

@Injectable()
export class ArticleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Article[]> {
    return this.prisma.article.findMany({
      orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
    });
  }

  async findById(id: string): Promise<Article | null> {
    return this.prisma.article.findUnique({ where: { id } });
  }

  async create(
    id: string,
    publishedAt: Date,
    data: ArticleRequest,
  ): Promise<void> {
    await this.prisma.article.create({
      data: { id, publishedAt, ...data },
    });
  }

  async update(id: string, data: ArticleRequest): Promise<void> {
    await this.prisma.article.update({ where: { id }, data: { ...data } });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.article.delete({ where: { id } });
  }
}
