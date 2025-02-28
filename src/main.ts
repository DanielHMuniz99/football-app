import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import router from './router';

// import { BootstrapVue } from 'bootstrap-vue';
// import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

const app = createApp(App);
app.use(router);
// app.use(BootstrapVue);
// app.use(IconsPlugin);
app.mount('#app');
