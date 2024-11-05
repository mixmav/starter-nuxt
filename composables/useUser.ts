import type { InferSelectModel } from 'drizzle-orm';
import type { users } from '~/server/database/schema';

type User = Pick<InferSelectModel<typeof users>, 'id' | 'name' | 'username'>;

export const useUser = createSharedComposable(() => {
  const user = useState<User | null>('user', () => null);
  const { $toast } = useNuxtApp();
  const { fetch, loading } = useAPI();

  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });
    user.value = null;
    $toast.success('Logged out');
  };
  const fetchUser = async () => {
    const data = await fetch('/api/auth/user');
    user.value = data;
    loading.value = false;
  };

  return { user, fetchUser, loading, logout };
});
