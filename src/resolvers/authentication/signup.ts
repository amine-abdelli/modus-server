import bcrypt from 'bcryptjs'
import { formatEmail } from '../../utils/function';
import { createToken, COOKIE_SETTINGS } from '../../utils/authUtils';
import { createOneUser } from '../../../prisma/models/user';
import { Context } from '../utils';

export interface SignupArgs {
  email: string,
  rawPassword: string,
}
async function signup(parent: any, { email, rawPassword }: SignupArgs, context: Context) {
  try {
    const password = await bcrypt.hash(rawPassword, 10);
    const user = await createOneUser({
      email: formatEmail(email),
      password,
    }, context.prisma);
    const token = createToken(user);
    context.res.cookie('session', token, COOKIE_SETTINGS);
    console.log('Signup success', { email });
    return {
      user,
    };
  } catch (e) {
    console.log();
    (e);
    throw e;
  }
}

export { signup };
