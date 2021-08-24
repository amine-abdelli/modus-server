import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import httpContext from 'express-http-context';
import { getUserId } from '../../utils/authUtils';
import prisma from '../../../prisma/prisma'

export interface Context {
  prisma: PrismaClient
  userId?: string
  res: Response
  req: Request
}

export async function createContext(context: Context) {
  let userId;
  try {
    userId = context.req.cookies && await getUserId(context.req, context.res, prisma);    
  } catch (e) {
    userId = '';
  }
  httpContext.set('userId', userId);
  return {
    ...context,
    prisma,
    userId,
  };
}
