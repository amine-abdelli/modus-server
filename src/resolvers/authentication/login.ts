import { Context } from "src/graphql/utils/context";
import { formatEmail } from "src/utils/function";
import { createToken, COOKIE_SETTINGS } from "src/utils/authUtils";
import { updateOneUserById } from '../../../prisma/models/user';
import { authenticateUser } from '../../resolvers/utils';
interface LoginArgs {
  email: string,
  password: string,
}
async function login(parent: any, { email, password }: LoginArgs, context: Context) {
  try {
    const user = await authenticateUser({
      email: formatEmail(email),
      password,
    }, context);
    console.log(user);
    
    const token = createToken(user);
    context.res.cookie('session', token, COOKIE_SETTINGS);
    await updateOneUserById(
      { id: user.id, data: { last_activity: new Date() } },
      context.prisma,
    );
    console.info('Authentication success', { email });
    return {
      user,
    };
  } catch (e) {
    console.log();
    (e);
    throw e;
  }
}

export { login };