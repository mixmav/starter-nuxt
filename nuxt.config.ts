import type { NuxtPage } from '@nuxt/schema';

const title = 'NuxtStarter';
const description =
  'A starter with my favorite tools for quickly scaffolding a Nuxt project.';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  components: [
    // only auto-import components in the auto-import directory
    {
      path: '~/components',
      pattern: ['auto-import/*.vue', 'auto-import/*/*.vue'],
      pathPrefix: false,
    },
  ],

  imports: {
    dirs: ['stores'],
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  appConfig: {
    title: title,
    description: description,
  },
  build: {
    transpile: ['vue-sonner'],
  },

  routeRules: {
    '/admin/**': {
      ssr: false,
    },
    '/auth/**': {
      ssr: false,
    },
  },

  site: {
    url:
      process.env.NODE_ENV === 'production'
        ? 'your-production-url.com'
        : 'http://localhost:3000',
    name: title,
    description: description,
    defaultLocale: 'en-AU',
  },
  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 256,
    },
    mode: 'svg',
  },

  turnstile: {
    siteKey:
      process.env.NODE_ENV === 'development'
        ? '1x00000000000000000000AA'
        : process.env.TURNSTILE_SITE_KEY,
  },

  runtimeConfig: {
    turnstile: {
      secretKey:
        process.env.NODE_ENV === 'development'
          ? '1x0000000000000000000000000000000AA'
          : process.env.TURNSTILE_SECRET_KEY!,
    },

    TURSO_CONNECTION_URL: process.env.TURSO_CONNECTION_URL!,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN!,

    // r2: {
    //   ACCOUNT_ID: process.env.R2_ACCOUNT_ID!,
    //   ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID!,
    //   SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY!,
    //   BUCKET_NAME: process.env.R2_BUCKET_NAME!,
    //   CUSTOM_DOMAIN: process.env.R2_CUSTOM_DOMAIN!,
    // },
  },
  sitemap: {
    credits: false,
    exclude: ['/admin/**', '/auth/**'],
  },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxtjs/turnstile',
    'shadcn-nuxt',
    '@nuxt/fonts',
    '@vueuse/nuxt',
  ],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },

  experimental: {
    typedPages: true,
  },

  hooks: {
    'pages:extend'(pages) {
      function removePagesMatching(pages: NuxtPage[] = []) {
        const pagesToRemove: NuxtPage[] = [];
        for (const page of pages) {
          if (
            page.file &&
            !page.file.endsWith('/index.vue') &&
            !/\.page\.vue$/.test(page.file)
          ) {
            // Remove all pages that are not .page.vue, but leave the index.vue files intact.
            pagesToRemove.push(page);
          } else {
            removePagesMatching(page.children);
          }
        }

        for (const page of pagesToRemove) {
          const index = pages.indexOf(page);
          if (index !== -1) {
            pages.splice(index, 1);
          }
        }
      }

      removePagesMatching(pages);

      pages.forEach((page) => {
        if (page.path) {
          page.path = page.path.replace(/\.page/, '');
          page.name = page.name?.replace(/\.page/, '');
        }
      });
    },
  },
});
