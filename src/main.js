import Vue from 'vue';
import feather from 'vue-icon';
import { VueHammer } from 'vue2-hammer';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import './sass/main.scss';
import store from './store';

// Plugins
Vue.use(feather, 'v-icon');
Vue.use(VueHammer);
VueHammer.config.swipe = {
  direction: 6 // Fix conflicting with vertical scrolling
};

// Config
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
