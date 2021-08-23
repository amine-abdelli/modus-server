import {
  PrismaClient,
} from '@prisma/client';

export interface AddOneMoodArgs {
  rate: number
  userId: string
  phrase: string
}

async function addOneMood({ userId, rate, phrase }: AddOneMoodArgs, prisma: PrismaClient) {
    return await prisma.mood.create({
      data: {
        rate,
        userId,
        phrase
      }
    });
}

interface deleteOneUserByIdArgs {
  id: string
}

async function deleteOneUserById({ id }: deleteOneUserByIdArgs, prisma: PrismaClient) {
  return await prisma.user.delete({
    where: {
      id
    }
  })
}

async function findMoods({ userId }: any, prisma: PrismaClient) {
  return await prisma.mood.findMany({
    where: {
      userId
    }
  });
}

export { addOneMood, findMoods, deleteOneUserById };