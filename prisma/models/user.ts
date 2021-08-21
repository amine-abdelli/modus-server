import {
  PrismaClient,
} from '@prisma/client';

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
  return prisma.user.findUnique({
    where: {
      id,
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
  });
}

export interface UpdateUserByIdArgs {
  id: string,
  data: {
    password?: string,
    lastPasswordReset?: Date,
    last_activity?: Date,
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

export { createOneUser, oneUserById, oneUserByEmail, updateOneUserById };