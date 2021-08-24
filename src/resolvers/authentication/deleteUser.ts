import bcrypt from 'bcryptjs'
import { formatEmail } from '../../utils/function';
import { createToken, COOKIE_SETTINGS } from '../../utils/authUtils';
import { createOneUser } from '../../../prisma/models/user';
import { authenticateUser, Context } from '../utils';
import { deleteOneUserById } from 'prisma/models/user';

export interface deleteUserArgs {
  email: string,
  password: string,
}
async function deleteUser(parent: any, { email, password }: deleteUserArgs, context: Context) {
  try {
    console.info('Trying to delete a user', { email });
    const { id } = await authenticateUser({
      email: formatEmail(email),
      password
    }, context);
    await deleteOneUserById({ id }, context.prisma);
    console.log('User deletion successful', { email });
    return {
      message: `${email} has been succesfully deleted`,
    };
  } catch (e) {
    console.log();
    (e);
    throw e;
  }
}

export { deleteUser };
