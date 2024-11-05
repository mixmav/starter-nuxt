import { verify } from '@node-rs/argon2';

import { users } from '@/server/database/schema';
import { eq } from 'drizzle-orm';
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from '~/server/utils/auth';

export default eventHandler(async (event) => {
  const { token, username, password } = await readBody(event);
  if (!token) {
    throw createError({
      statusCode: 422,
      message: 'Captcha is invalid.',
    });
  }
  const tokenVerified = await verifyTurnstileToken(token);
  if (!tokenVerified.success) {
    throw createError({
      statusCode: 401,
      message: 'Captcha is invalid.',
    });
  }
  if (
    typeof username !== 'string' ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    throw createError({
      message: 'Invalid username',
      statusCode: 400,
    });
  }
  if (typeof password !== 'string' || password.length > 255) {
    throw createError({
      message: 'Invalid password',
      statusCode: 400,
    });
  }
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.username, username.toLowerCase()))
    .get();
  if (!existingUser) {
    // If the user is not found, return an error message to avoid username enumeration attacks.
    throw createError({
      message: 'Incorrect username or password',
      statusCode: 400,
    });
  }
  const validPassword = await verify(existingUser.password, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  if (!validPassword) {
    throw createError({
      message: 'Incorrect username or password',
      statusCode: 400,
    });
  }
  const sessionToken = generateSessionToken();
  await createSession(sessionToken, existingUser.id);
  setSessionTokenCookie(event, sessionToken);
  return {
    status: 200,
  };
});
