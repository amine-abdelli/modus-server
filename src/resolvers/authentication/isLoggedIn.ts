import { User } from "@prisma/client";
import { ApolloError } from "apollo-server-errors";
import { oneUserById, updateOneUserById } from "prisma/models/user";
import { getTokenPayload } from "src/utils/authUtils";
import { Context } from '../../graphql/utils/context';

interface isLoggedInArgs {
  id: string
}

async function isLoggedIn(parent: any, args: isLoggedInArgs, context: Context) {
  if(!context.req.cookies.session_id) throw new ApolloError('User must be logged in');
  const { userId } = getTokenPayload(context.req.cookies.session_id);
  if(userId !== args.id) throw new ApolloError('You\'re not allowed to proceed !')
  const user: Omit<User, 'password'> | null = await oneUserById({ id: userId }, context.prisma);
  if(!user) {
    throw new ApolloError('You\'re not logged in !')
  }
  await updateOneUserById({ id: userId, data: { last_activity: new Date() } }, context.prisma)
  return user;
}

export { isLoggedIn };