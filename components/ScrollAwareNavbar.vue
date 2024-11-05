<script setup lang="ts">
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
    <slot />
  </div>
</template>
