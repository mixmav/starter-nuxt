export const useAPI = () => {
  const globalStore = useGlobalStore();
  const nuxtApp = useNuxtApp();

  const loading = ref(false);

  const fetch = $fetch.create({
    onRequest: () => {
      globalStore.incrementLoading();
      loading.value = true;
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        nuxtApp.$toast('Please login to continue');
        await nuxtApp.runWithContext(() => navigateTo('/auth/login'));
      }

      nuxtApp.$toast.error(
        response._data.message || response.statusText || 'Something went wrong',
      );
    },
    parseResponse(responseText) {
      // This is for when the response comes as a 200 but is still an error. Done on purpose.
      const res = JSON.parse(responseText);
      if (res.error) {
        nuxtApp.$toast.error(res.error?.message || 'Something went wrong');

        if (res.error?.statusCode === 401) {
          nuxtApp.$toast('Please login to continue');
          nuxtApp.runWithContext(() => navigateTo('/auth/login'));
        }
      }

      return res;
    },

    onResponse: () => {
      globalStore.decrementLoading();
      setTimeout(() => {
        loading.value = false;
      }, 1000);
    },
  });

  return {
    loading,
    fetch,
  };
};
