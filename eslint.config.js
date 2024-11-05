// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import tailwindcss from 'eslint-plugin-tailwindcss';

export default withNuxt([
  {
    plugins: {
      tailwindcss,
    },
    rules: {
      'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/html-self-closing': 'off',
      'vue/require-default-prop': 'off',
    },
    settings: {
      tailwindcss: {
        callees: ['cn', 'clsx'],
        whitelist: [],
      },
    },
  },
  ...tailwindcss.configs['flat/recommended'],
]);
