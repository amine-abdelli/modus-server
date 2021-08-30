import jwt, { SignOptions } from 'jsonwebtoken';
import express, { CookieOptions } from 'express';
import { PrismaClient } from '@prisma/client';
import { oneUserById } from 'prisma/models/user';
import {
  ApolloError,
  AuthenticationError
} from 'apollo-server-errors';

const TOKEN_SIGNATURE = process.env.TOKEN_SIGNATURE_KEY!;

function generateTokenSettings() {
  return {
    expiresIn: 3600000,
    emittedAt: Date.now(),
  };
}

export interface Token {
  expiresIn: number
  emittedAt: number
  userId: string
}

export const COOKIE_SETTINGS: CookieOptions = {
  // cookie is valid for all subpaths of my domain
  path: '/',
  // this cookie won't be readable by the browser
  httpOnly: true,
  // and won't be usable outside of my domain
  sameSite: 'none',
  // HTTPS?
  secure: true,
};

function createToken(user: { id: string }, tokenOptions: SignOptions = {}): string{
  const tokenSettings = { ...generateTokenSettings(), ...tokenOptions}
  return jwt.sign({
    userId: user.id,
    ...tokenSettings,
  }, TOKEN_SIGNATURE)
}

function getTokenPayload(token: string): Token {
  try {
    return jwt.verify(token, TOKEN_SIGNATURE) as Token;
  } catch (error) {
    console.error(error);
    throw new ApolloError(error);
  }
}

function isTokenExpired(expiresIn: number, emittedAt: number) {
  return Date.now() > ((expiresIn * 1000) + emittedAt);
}

async function getUserId(req: express.Request, res: express.Response, prisma: PrismaClient) {
  const token = req.cookies.session;
  if (token) {
    const { userId, expiresIn, emittedAt } = getTokenPayload(token);
    if (isTokenExpired(expiresIn, emittedAt)) {
      res.clearCookie('session');
      console.warn('Session expired');
      throw new AuthenticationError('Session expired');
    }
    const user = await oneUserById({ id: userId }, prisma);
    if (!user) {
      res.clearCookie('session');
      console.warn('Session expired');
      throw new AuthenticationError('Session expired');
    }
    return userId;
  }
  return '';
}

export { createToken, getUserId, isTokenExpired, getTokenPayload };