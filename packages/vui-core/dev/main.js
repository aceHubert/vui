import Vue from 'vue';
import App from './App';
import Vui from '@vui/core';
import router from './router';

Vue.config.performance = true;

Vue.use(Vui);

const vui = new Vui({
  theme: {
    dark: true,
    disable: true,
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#1976d2',
      },
    },
  },
});

const vm = new Vue({
  data: () => ({ isLoaded: document.readyState === 'complete' }),
  vui,
  router,
  render(h) {
    return this.isLoaded ? h(App) : undefined;
  },
}).$mount('#app');

// Prevent layout jump while waiting for styles
vm.isLoaded ||
  window.addEventListener('load', () => {
    vm.isLoaded = true;
  });
