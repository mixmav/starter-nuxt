<script setup lang="ts">
import { useConfetti } from '~/composables/useConfetti';

const { realistic } = useConfetti();
const handleClick = () => {
  realistic();
};
</script>

<template>
  <div>
    <h1>Hello</h1>
    <button class="daisy-btn daisy-btn-primary" @click="handleClick">
      <Icon name="fa6-solid:champagne-glasses" />Confetti
    </button>
  </div>
</template>
