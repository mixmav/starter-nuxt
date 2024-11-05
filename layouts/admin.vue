<script setup lang="ts">
const { user, logout, loading } = useUser();

useHeadSafe({
  title: 'Admin Dashboard',
});

onMounted(() => {
  if (document) {
    document.addEventListener('scroll', handleScroll);
  }
});

onBeforeUnmount(() => {
  if (document) {
    document.removeEventListener('scroll', handleScroll);
  }
});

const scrollStyle = ref<string | undefined>();
let lastScrollTop = 0;

function handleScroll() {
  const hideOnScrollDown =
    document.documentElement.scrollTop > lastScrollTop // scroll is down
      ? ' !-top-96 '
      : ' !top-4 ';
  if (document.documentElement.scrollTop === 0) {
    scrollStyle.value = 'border-base-300';
  } else if (document.documentElement.scrollTop <= 250) {
    scrollStyle.value = 'shadow-md border-base-content/40 top-4';
  } else if (document.documentElement.scrollTop > 250) {
    scrollStyle.value =
      hideOnScrollDown + 'shadow-md border-base-content/40 top-4';
  }

  lastScrollTop = document.documentElement.scrollTop;
}
</script>

<template>
  <div>
    <div
      :class="[scrollStyle]"
      style="
        transition:
          top 0.4s,
          box-shadow 0.3s,
          background 0.3s,
          border 0.2s;
      "
      class="sticky top-4 z-50 mx-auto flex w-[calc(100%-2rem)] max-w-5xl items-center justify-between rounded-lg border border-base-300 bg-base-200/80 p-4 py-2 backdrop-blur-sm hover:!border-base-content"
    >
      <NuxtLink
        to="/admin"
        class="group relative flex items-center justify-center p-2 tracking-wide transition-all"
      >
        <Icon
          name="fa6-solid:lock"
          class="absolute left-0 top-1/2 -translate-y-1/2 scale-0 text-primary transition-all group-hover:scale-100"
        >
        </Icon
        ><span
          class="relative ml-0 transition-all group-hover:ml-4 group-hover:text-primary"
          >NuxtStarter - admin</span
        ></NuxtLink
      >

      <div class="flex items-center justify-center gap-2">
        <NuxtLink
          v-tooltip="'Home'"
          aria-label="Home"
          to="/"
          class="daisy-btn daisy-btn-ghost daisy-btn-sm"
          ><Icon name="fa6-solid:house"
        /></NuxtLink>
        <button
          v-if="user"
          v-tooltip="'Logout'"
          aria-label="Logout"
          class="daisy-btn daisy-btn-ghost daisy-btn-sm"
          :disabled="loading"
          @click="logout"
        >
          <Icon name="fa6-solid:right-from-bracket" />
        </button>
      </div>
    </div>

    <div class="prose daisy-prose mx-auto mt-12 flex max-w-5xl flex-col p-4">
      <slot />
    </div>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
</template>
