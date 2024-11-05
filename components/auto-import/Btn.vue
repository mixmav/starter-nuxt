<!-- This is essentially a DaisyUI button that handles loading states -->
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    loading?: boolean;
    disabled?: boolean;
    icon?: string;
  }>(),
  {
    loading: false,
  },
);
</script>

<template>
  <button
    :disabled="props.loading || props.disabled"
    type="button"
    class="daisy-btn daisy-btn-primary relative transition-all"
    :class="{ 'pl-10': props.loading || props.icon }"
  >
    <div
      aria-hidden="true"
      class="absolute left-4 top-1/2 flex -translate-y-1/2 items-center justify-center"
    >
      <Icon
        v-if="props.icon"
        v-show="!props.loading && props.icon"
        :name="props.icon"
      />
      <div
        v-if="props.loading"
        class="daisy-loading daisy-loading-dots daisy-loading-sm"
      ></div>
    </div>
    <slot />
  </button>
</template>
