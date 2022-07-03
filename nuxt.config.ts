import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  css: [
    '@/node_modules/picnic/picnic.css',
  ],
  nitro: {
    plugins: ['~/server/plugins/content.ts']
  },
  markdown: {
    remarkPlugins: ['remark-math'],
    rehypePlugins: ['rehype-mathjax']
  },
  content: {
    highlight: {
      theme: 'vitesse-light'
    }
  }
})
