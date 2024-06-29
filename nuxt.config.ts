// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  
  devtools: { enabled: true },
  
  // modules: ['@nuxtjs/tailwindcss'],
  
  // modules: ['usebootstrap'],
  // Adiciona o Bootstrap e o BootstrapVue como plugins
  // plugins: [
  //   '@/plugins/bootstrap-vue.js',
  // ],

  css: [
    //  'bootstrap/dist/css/bootstrap.css',
    //  'bootstrap-vue/dist/bootstrap-vue.css',
     '@/assets/main.css',
     '@/assets/main.js',
  ],

  // build: {
  //   transpile: ['bootstrap-vue']
  // }
  
})