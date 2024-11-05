import { eq } from 'drizzle-orm';
import { sessions } from '~/server/database/schema';

export default eventHandler(async (event) => {
  if (!event.context.session) {
    throw createError({
      statusCode: 403,
    });
  }

  // await db.delete(sessions).where(eq(sessions.id, event.context.session.id));
  deleteSessionTokenCookie(event);
});
