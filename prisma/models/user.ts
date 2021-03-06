import {
  PrismaClient,
} from '@prisma/client';
import { isDefinitionNode } from 'graphql';

export interface CreateUserArgs {
  email: string,
  password: string
}
async function createOneUser({email, password}: CreateUserArgs, prisma: PrismaClient) {
  console.log("TRYING TO CREATE A USER");
  return prisma.user.create({
    data: {email, password},
    select: {
      email: true,
      id: true,
      lastPasswordReset: true,
      last_activity: true,
      password: true
    },
  });
}

export interface OneUserByIdArgs {
  id: string | undefined
}
async function oneUserById({ id }: OneUserByIdArgs, prisma: PrismaClient) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      moods: true,
    },
  });
}

export interface OneUserByEmailArgs {
  email: string | undefined
}
async function oneUserByEmail({ email }: OneUserByEmailArgs, prisma: PrismaClient) {
  return prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      moods: true,
    },
  });
}

export interface UpdateUserByIdArgs {
  id: string,
  data: {
    password?: string,
    lastPasswordReset?: Date,
    last_activity?: Date,
    name?: string
  }
}
async function updateOneUserById({ id, data }: UpdateUserByIdArgs, prisma: PrismaClient) {
  return prisma.user.update({
    where: {
      id,
    },
    data,
  });
}

interface deleteOneUserByIdArgs {
  id: string
}
async function deleteOneUserById({ id }: deleteOneUserByIdArgs, prisma: PrismaClient) {
  await prisma.mood.deleteMany({
    where: {
      userId: id,
    }
  })
  return await prisma.user.delete({
    where: {
      id
    }
  })
}

async function createUserName({ name, id }: any, prisma: PrismaClient) {
  return await prisma.user.update({
    where: {
      id
    },
    data: {
      name
    }
  });
}

export { createOneUser, oneUserById, oneUserByEmail, updateOneUserById, deleteOneUserById, createUserName };