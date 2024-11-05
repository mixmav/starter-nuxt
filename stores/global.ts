export const useGlobalStore = createSharedComposable(() => {
  const loadingCount = ref(0);

  const incrementLoading = () => loadingCount.value++;
  const decrementLoading = () => {
    if (loadingCount.value > 0) {
      loadingCount.value--;
    }
  };

  const loading = computed(() => loadingCount.value > 0);

  return { loading, incrementLoading, decrementLoading };
});
