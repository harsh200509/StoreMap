import { PrismaClient } from '@prisma/client';
import { PrismaNeonHttp } from '@prisma/adapter-neon';

function createPrisma() {
  const connectionString =
    process.env.DATABASE_URL ??
    'postgresql://neondb_owner:npg_tk5ZWGuq1oAg@ep-blue-mode-awwhlulu-pooler.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require';

  // PrismaNeonHttp takes the connection string directly (since adapter-neon >= 6)
  const adapter = new PrismaNeonHttp(connectionString, {
    fullResults: false,
    arrayMode: false,
  });

  return new PrismaClient({ adapter, log: ['error'] });
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma ?? createPrisma();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
