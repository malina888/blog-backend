import { PrismaService } from '../../src/core/prisma/prisma.service';

const prisma = new PrismaService();

const articles = [
  {
    id: '5e1f0a2b-0001-4000-8000-000000000001',
    title: 'Hello, world',
    content: 'This is the first article on my blog.',
    publishedAt: new Date('2026-09-01T08:00:00.000Z'),
  },
  {
    id: '5e1f0a2b-0002-4000-8000-000000000002',
    title: 'Setting up a development environment',
    content: 'Docker, Node.js and a database running on my machine.',
    publishedAt: new Date('2026-10-01T08:00:00.000Z'),
  },
  {
    id: '5e1f0a2b-0003-4000-8000-000000000003',
    title: 'What I learned about databases',
    content: 'Tables, migrations and seed data explained simply.',
    publishedAt: new Date('2026-11-01T08:00:00.000Z'),
  },
  {
    id: '5e1f0a2b-0004-4000-8000-000000000004',
    title: 'My first API endpoint',
    content: 'Building a read API with Nest.js and Prisma.',
    publishedAt: new Date('2026-11-01T08:00:00.000Z'),
  },
];

export async function main() {
  for (const article of articles) {
    const { id, ...data } = article;

    await prisma.article.upsert({
      where: { id },
      update: data,
      create: article,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    console.error(e);
    process.exit(1);
  });
