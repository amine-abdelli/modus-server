import { Context } from "src/graphql/utils/context";
import { COOKIE_SETTINGS } from "src/utils/authUtils";


async function logout(parent: any, args: void, context: Context) {
  context.res.clearCookie('session_id', COOKIE_SETTINGS);
  console.info('Logout success');
}

export { logout };
