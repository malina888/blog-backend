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
}
