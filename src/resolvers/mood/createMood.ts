import { Context } from "src/graphql/utils/context";
import { oneUserById } from '../../../prisma/models/user';
import { addOneMood } from "prisma/models/mutation";
import { ApolloError } from "apollo-server-errors";

interface addOneMoodArgs {
  userId: string,
  rate: number,
  phrase: string,
}

async function createMood(parent: any, { userId, rate, phrase }: addOneMoodArgs, context: Context) {
  try {
    console.info('Trying to add a mood')
    const user = await oneUserById({ id: userId }, context.prisma)
    if(!user) {
      throw new ApolloError('User doesn\'t exist !')
    }
    await addOneMood({ userId, rate, phrase }, context.prisma)
    console.info('Mood added successfully !')
    return {
      user,
    };
  } catch (e) {
    console.log();
    (e);
    throw e;
  }
}

export { createMood };