import Vue from 'vue';
import App from '@/App';
import router from '@/router';

// plugins
import { createVui } from './plugins/vui';

// styles
import '@/assets/styles/index.scss';

Vue.config.productionTip = false;

const vui = createVui(null);

new Vue({
  router,
  vui,
  render: (h) => h(App),
}).$mount('#app');
