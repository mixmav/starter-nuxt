<script setup lang="ts">
import ScrollAwareNavbar from '~/components/ScrollAwareNavbar.vue';
useHeadSafe({
  title: 'Default Layout',
});
</script>

<template>
  <div>
    <ScrollAwareNavbar>
      <NuxtLink
        to="/"
        class="group relative flex items-center justify-center p-2 tracking-wide transition-all"
      >
        <Icon
          name="fa6-solid:shuttle-space"
          class="absolute left-0 top-1/2 -translate-y-1/2 scale-0 text-primary transition-all group-hover:scale-100"
        >
        </Icon
        ><span
          class="relative ml-0 transition-all group-hover:ml-4 group-hover:text-primary"
          >NuxtStarter</span
        ></NuxtLink
      >

      <div class="flex items-center justify-center gap-2">
        <NuxtLink
          v-tooltip="'Admin'"
          aria-label="Home"
          to="/admin"
          class="daisy-btn daisy-btn-ghost daisy-btn-sm"
          ><Icon name="fa6-solid:lock"
        /></NuxtLink>
      </div>
    </ScrollAwareNavbar>

    <div class="prose daisy-prose mx-auto mt-12 flex max-w-5xl flex-col p-4">
      <slot />
    </div>
  </div>
</template>
