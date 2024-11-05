import { verifyRequestOrigin } from '../utils';
import {
  deleteSessionTokenCookie,
  setSessionTokenCookie,
  validateSessionToken,
} from '../utils/auth';

export default defineEventHandler(async (event) => {
  if (event.method !== 'GET') {
    const originHeader = getHeader(event, 'Origin') ?? null;
    const hostHeader = getHeader(event, 'Host') ?? null;
    if (
      !originHeader ||
      !hostHeader ||
      !verifyRequestOrigin(originHeader, [hostHeader])
    ) {
      return event.node.res.writeHead(403).end();
    }
  }

  const sessionId = getCookie(event, 'auth_session') ?? null;
  if (!sessionId) {
    event.context.session = null;
    event.context.user = null;
    return;
  }
  const { session, user } = await validateSessionToken(sessionId);

  if (session) {
    // session is valid, extend the expiration date
    setSessionTokenCookie(event, sessionId);
  }
  if (!session) {
    deleteSessionTokenCookie(event);
  }

  event.context.session = session;
  event.context.user = user;
});

declare module 'h3' {
  interface H3EventContext {
    user: User | null;
    session: Session | null;
  }
}
