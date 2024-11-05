export default defineNuxtRouteMiddleware(async () => {
  const { user, fetchUser } = useUser();
  if (!user.value) await fetchUser();

  if (user.value) {
    return navigateTo({
      name: 'admin',
    });
  }
});
