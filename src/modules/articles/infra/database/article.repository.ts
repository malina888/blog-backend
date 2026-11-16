import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { Article } from '../../model/article.model';

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
    article: Omit<Article, 'createdAt' | 'updatedAt'>,
  ): Promise<void> {
    await this.prisma.article.create({ data: article });
  }

  async update(
    id: string,
    article: Pick<Article, 'title' | 'content'>,
  ): Promise<void> {
    await this.prisma.article.update({ where: { id }, data: article });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.article.delete({ where: { id } });
  }
}
