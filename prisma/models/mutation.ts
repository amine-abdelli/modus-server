import {
  PrismaClient,
} from '@prisma/client';

export interface addOneMoodInterface {
  rate: number
  userId: string
  phrase: string
}

export interface addOneDiaryInterface {
  date: Date
  userId: string
  title?: string
  content: string
}

async function addOneMood({ userId, rate, phrase }: addOneMoodInterface, prisma: PrismaClient) {
    return await prisma.mood.create({
      data: {
        rate,
        userId,
        phrase
      }
    });
}

async function addOneDiary({ userId, date, content, title }: addOneDiaryInterface, prisma: PrismaClient) {
  return await prisma.diary.create({
    data: {
      date, 
      content,
      title,
      userId,
    }
  });
}

async function findMoods({ userId }: any, prisma: PrismaClient) {
  return await prisma.mood.findMany({
    where: {
      userId
    }
  });
}

export { addOneMood, findMoods, addOneDiary };