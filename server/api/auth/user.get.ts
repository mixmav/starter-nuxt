import { users } from '@/server/database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  if (!event.context.user) return null;

  // const user = await db
  //   .select({
  //     id: users.id,
  //     name: users.name,
  //     username: users.username,
  //   })
  //   .from(users)
  //   .where(eq(users.id, event.context.user.id))
  //   .get();

  // if (!user) return null;

  // return user;
  return {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
  }
});
