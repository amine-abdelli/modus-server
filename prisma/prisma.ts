import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

const globalAny: any = global;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!globalAny.prisma) {
    globalAny.prisma = new PrismaClient(
      // { log: ['query', 'info', 'warn', 'error'] }
    );
  }

  prisma = globalAny.prisma;
}

export default prisma as PrismaClient;
