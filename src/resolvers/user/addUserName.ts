import { Context } from "src/graphql/utils/context";
import { createUserName, oneUserById } from '../../../prisma/models/user';
import { ApolloError } from "apollo-server-errors";
import { formatUserName } from "../utils";

interface addUserNameArgs {
  name: string,
  id: string
}

async function addUserName(parent: any, { name: username, id }: addUserNameArgs, context: Context) {
  try {
    const name = formatUserName(username);
    console.info('Trying to add a user name !')
    const user = await oneUserById({ id }, context.prisma)
    if(!user) {
      throw new ApolloError('User doesn\'t exist !')
    }
    await createUserName({ name, id }, context.prisma)
    console.info('Name added successfully !')
    return {
      user,
    };
  } catch (e) {
    console.log();
    (e);
    throw e;
  }
}

export { addUserName };