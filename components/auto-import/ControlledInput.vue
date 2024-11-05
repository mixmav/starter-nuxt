<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    icon?: string;
    name?: string;
    type?: string;
    label?: string;
    placeholder?: string;
    charCount?: number;
    autofocus?: boolean;
  }>(),
  {
    type: 'text',
  },
);

const inputRef = ref<HTMLInputElement | null>(null);
const model = defineModel<string>();

onMounted(() => {
  if (props.autofocus && inputRef.value) {
    inputRef.value.focus();
  }
});
</script>

<template>
  <label class="daisy-form-control w-full">
    <div v-if="props.label" class="daisy-label">
      <span class="daisy-label-text">{{ props.label }}</span>
    </div>
    <label
      class="daisy-input daisy-input-bordered flex items-center gap-2 focus-within:daisy-input-primary"
    >
      <Icon v-if="props.icon" :name="props.icon" />
      <input
        ref="inputRef"
        v-model="model"
        :type="props.type"
        class="grow"
        :placeholder="props.placeholder"
      />
    </label>
    <div v-if="props.charCount" class="daisy-label justify-end">
      <span class="daisy-label-text">{{ props.label }}</span>
    </div>
  </label>
</template>
