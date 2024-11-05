# 🚀 My Nuxt Starter

This is the template I use to jumpstart new projects with tools and configurations that save me time and make development more fun.

---

## 📦 What's Inside

This template includes both Nuxt-specific features and general-purpose tools, grouped into categories for clarity:

### Nuxt-Specific

1. **Custom config for routing and auto-imports**

   - Routes are only generated for `.page.vue` files so you can keep route-specific components in the same folder as the page. (except `index.vue`, which is always a route.)
   - Auto imports for components only happen in the `components/auto-imports` directory.

2. **`useFetchy` (useFetch wrapper)** – Extends `useFetch` behaviour for better error handling and loading states, without losing any of the original end-to-end type safety. (credits [barish.me](https://barish.me/blog/nuxt-usefetch/))
3. **`$api` ($fetch wrapper)** – Wrapper around `$fetch` to add some defaults and error handling.
4. **Nuxt Image, Nuxt Icon, Nuxt Font, Nuxt SEO** – For optimized images, icons, fonts, and SEO.
5. **Web Crypto Nuxt plugin** – Enables serverless runtimes to use the Web Crypto API for password hashing and session tokens.
6. **Simple custom authentication** with client and server utilities:
   - **Client**: Includes `useUser` composable, auth and guest middlewares, and layouts.
   - **Server**: Middleware to add auth context and `defineAuthEventHandler` to protect routes.

### Design and UI

1. **Tailwind CSS + daisyUI** – Tailwind setup with DaisyUI component library (prefixed with `daisy-` for easy styling).
2. **Shadcn UI** – More advanced and fully accessible UI components.
3. **vue-sonner for toasts** – Quick and accessible toast notifications, available via `$toast` in templates or `useNuxtApp().$toast` in scripts.
4. **vue-tippy for tooltips** – DaisyUI styled tooltips available via the `v-tooltip` directive.
5. **Cloudflare Turnstile** – A free CAPTCHA service for protecting forms.

### Dev Tools

1. **Turso DB with SQLite fallback for dev** – Lightweight DB with a SQLite fallback for local development.
2. **Prettier + ESLint** – Set up with good defaults, including TailwindCSS support.
3. **Cloudflare R2 support** – For file (object) storage, with a test upload route and `useUploadFiles` composable.

---

## 🛠️ Getting Started

Clone the repo, install dependencies, and you’re ready to go:

```bash
# Clone and install
git clone https://github.com/mixmav/starter-nuxt.git
cd starter-nuxt
npm i

# Run the app
npm run dev
```
