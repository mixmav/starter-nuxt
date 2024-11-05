import type { H3Event, EventHandlerRequest, EventHandler } from 'h3';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { sessions, users } from '../database/schema';
import { eq, type InferSelectModel } from 'drizzle-orm';

import { sha256 } from '@oslojs/crypto/sha2';
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from '@oslojs/encoding';

// const config = useRuntimeConfig();

const client = createClient({
  url: 'file:./dev.sqlite',
  // url: config.TURSO_CONNECTION_URL,
  // authToken: config.TURSO_AUTH_TOKEN,
});
export const db = drizzle(client);

export const defineAuthEventHandler = <T extends EventHandlerRequest, D>(
  handler: (event: H3Event<T> & { context: { user: User } }) => D | Promise<D>,
): EventHandler<T, D> =>
  defineEventHandler<T>(
    async (event: H3Event<T> & { context: { user: User | null } }) => {
      try {
        if (!event.context.user) {
          throw createError({ statusCode: 401, message: 'Unauthorized' });
        }

        const response = await handler(
          event as H3Event<T> & { context: { user: User } },
        );

        return response;
      } catch (error) {
        return { error };
      }
    },
  );

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(
  token: string,
  userId: number,
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };
  await db.insert(sessions).values(session);
  return session;
}

export async function validateSessionToken(
  token: string,
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await db
    .select({ user: users, session: sessions })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.id, sessionId));
  if (result.length < 1) {
    return { session: null, user: null };
  }
  const { user, session } = result[0];
  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessions).where(eq(sessions.id, session.id));
    return { session: null, user: null };
  }
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await db
      .update(sessions)
      .set({
        expiresAt: session.expiresAt,
      })
      .where(eq(sessions.id, session.id));
  }
  return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}

export function setSessionTokenCookie(
  event: H3Event<EventHandlerRequest>,
  token: string,
  expiresAt?: Date,
): void {
  if (!expiresAt) {
    expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 15); // 15 days
  }
  if (import.meta.dev) {
    appendHeader(
      event,
      'Set-Cookie',
      `auth_session=${token}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Path=/`,
    );
  } else {
    appendHeader(
      event,
      'Set-Cookie',
      `auth_session=${token}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Path=/; Secure;`,
    );
  }
}

export function deleteSessionTokenCookie(
  event: H3Event<EventHandlerRequest>,
): void {
  if (import.meta.dev) {
    appendHeader(
      event,
      'Set-Cookie',
      'auth_session=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/',
    );
  } else {
    appendHeader(
      event,
      'Set-Cookie',
      'auth_session=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/; Secure;',
    );
  }
}

export type User = InferSelectModel<typeof users>;
export type Session = InferSelectModel<typeof sessions>;

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };
