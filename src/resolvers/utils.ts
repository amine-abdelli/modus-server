import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { UserInputError } from 'apollo-server-errors';
import bcrypt from 'bcryptjs';
import { formatEmail } from 'src/utils/function';
import { oneUserByEmail } from 'prisma/models/user';

export interface Context {
  prisma: PrismaClient
  userId?: string
  res: Response
  req: Request
}

export interface LoginVariables {
  email: string,
  password: string
}

async function authenticateUser({ email, password }: LoginVariables, context: Context) {
  const user = await oneUserByEmail({ email: formatEmail(email) }, context.prisma);
  const valid = await bcrypt.compare(password, user?.password || '');
  if (!user || !valid) {
    console.warn('Incorrect email or password');
    throw new UserInputError('Incorrect email or password');
  }
  return user;
}

function formatUserName(name: string){
  return name.trim().replace(/\s\s+/g, ' ').split(' ').map((word) => {
    return (
    word.charAt(0).toUpperCase() + word.slice(1)
    )
  }).join(' '); 
}

export const prisma = new PrismaClient();

export { authenticateUser, formatUserName };