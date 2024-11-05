<script setup lang="ts">
definePageMeta({
  middleware: ['guest'],
  layout: 'admin',
});
const { $toast } = useNuxtApp();
const loading = ref(false);
const token = ref();
const username = ref('');
const password = ref('');
const turnstile = ref();

const { fetchUser } = useUser();

const login = async () => {
  if (!token.value) {
    $toast.error('Please complete the captcha.');
    return;
  }
  loading.value = true;
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        token: token.value,
        username: username.value,
        password: password.value,
      },
      onResponseError: (ctx) => {
        throw new Error(ctx?.response?._data?.message || 'An error occurredd');
      },
    });
    $toast.success('Logged in successfully');
    await fetchUser();
  } catch (error: unknown) {
    if (error instanceof Error) {
      $toast.error(error.message || 'An error occurred');
    } else {
      $toast.error('An unexpected error occurred');
    }
    turnstile.value.reset();
  } finally {
    loading.value = false;
    token.value = undefined;
  }
};

const usernameInput = ref<HTMLInputElement | null>(null);

onMounted(() => {
  setTimeout(() => {
    if (usernameInput.value) {
      usernameInput.value.focus();
    }
  }, 100);
});
</script>

<template>
  <div>
    <div role="alert" class="daisy-alert bg-primary text-primary-content">
      <Icon name="fa6-solid:triangle-exclamation" />
      <span>You must be logged in to access this page.</span>
    </div>
    <form
      method="post"
      action="/api/login"
      class="mt-8 flex flex-col gap-4"
      @submit.prevent="login"
    >
      <label
        class="daisy-input daisy-input-bordered flex items-center gap-2 focus-within:daisy-input-primary"
      >
        <Icon name="fa6-solid:user" />

        <input
          ref="usernameInput"
          v-model="username"
          required
          autofocus
          placeholder="Username"
          class="grow"
        />
      </label>

      <label
        class="daisy-input daisy-input-bordered flex items-center gap-2 focus-within:daisy-input-primary"
      >
        <Icon name="fa6-solid:key" />
        <input
          v-model="password"
          required
          autofocus
          placeholder="Password"
          type="password"
          class="grow"
        />
      </label>
      <button :disabled="loading || !token" class="daisy-btn daisy-btn-primary">
        <div v-if="loading" class="daisy-loading daisy-loading-spinner" />
        Log in
      </button>
      <ClientOnly>
        <div class="w-full">
          <NuxtTurnstile ref="turnstile" v-model="token" />
        </div>
      </ClientOnly>
    </form>
  </div>
</template>
