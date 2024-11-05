import VueTippy from 'vue-tippy';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTippy, {
    directive: 'tooltip', // => v-tooltip
    defaultProps: {
      placement: 'auto',
      allowHTML: false,
    },
  });
});
