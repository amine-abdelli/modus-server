import { Context } from "src/graphql/utils/context";
import { oneUserById } from '../../../prisma/models/user';
import { addOneDiary, addOneDiaryInterface } from "prisma/models/mutation";
import { ApolloError } from "apollo-server-errors";

async function createDiary(parent: any, { userId, content, title, date }: addOneDiaryInterface, context: Context) {
  try {
    console.info('Trying to create a diary');
    const user = await oneUserById({ id: userId }, context.prisma);
    if(!user) {
      throw new ApolloError('User doesn\'t exist !');
    }
    await addOneDiary({ userId, content, title, date }, context.prisma);
    console.info('Diary created successfully !');   
    return {
      user,
    };
  } catch (e) {
    console.log();
    (e);
    throw e;
  }
}

export { createDiary };