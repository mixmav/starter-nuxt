<script setup>
import { Toaster } from 'vue-sonner';
const { title, description } = useAppConfig();

useSeoMeta({
  twitterTitle: title,
  twitterDescription: description,
  // twitterImage: '',
  twitterCard: 'summary',
});

useHeadSafe({
  link: [
    {
      rel: 'apple-touch-icon',
      href: '/img/icons/web/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
  ],
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${title}` : title;
  },
});
const { user } = useUser();

const router = useRouter();

const hasAuthMiddleware = computed(() => {
  const middleware = router.currentRoute.value.meta.middleware;
  if (!middleware) {
    return false;
  }
  const middlewareArray = Array.isArray(middleware) ? middleware : [middleware];
  return middlewareArray.includes('auth');
});

const hasGuestMiddleware = computed(() => {
  const middleware = router.currentRoute.value.meta.middleware;
  if (!middleware) {
    return false;
  }
  const middlewareArray = Array.isArray(middleware) ? middleware : [middleware];
  return middlewareArray.includes('guest');
});

watch(
  () => user.value,
  (newUser) => {
    if (newUser) {
      if (hasGuestMiddleware.value) {
        navigateTo('/admin');
      }
    } else {
      if (hasAuthMiddleware.value) {
        navigateTo('/auth/login');
      }
    }
  },
);

const globalStore = useGlobalStore();
</script>

<template>
  <div>
    <Transition name="scale">
      <div
        v-if="globalStore.loading.value"
        class="fixed right-4 top-4 z-[9999] flex items-center justify-center rounded-full bg-base-200 p-2 shadow-md"
        aria-hidden="true"
      >
        <div class="daisy-loading daisy-loading-spinner text-primary"></div>
      </div>
    </Transition>
    <NuxtLoadingIndicator color="#3454D1" />
    <NuxtRouteAnnouncer />
    <Toaster
      :toast-options="{
        unstyled: true,
        style: {
          zIndex: 9999,
        },
        classes: {
          toast:
            'daisy-alert text-primary-content bg-primary bg-opacity-50 border border-primary opacity-90 hover:opacity-100 ',
        },
      }"
      position="bottom-right"
    />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
