import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  // experimental: {
  //   payloadExtraction: true
  // },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL
    }
  },
  modules: ['@pinia/nuxt', '@nuxtjs/eslint-module', '@bg-dev/nuxt-naiveui', '@vueuse/nuxt'],
  css: ['~/assets/styles/main.scss'],
  vite: {
    plugins: [
      svgLoader({
        // Your settings.
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "~/assets/styles/variables.scss" as *; @use "~/assets/styles/mixins.scss" as *;'
        }
      }
    }
  }
})
