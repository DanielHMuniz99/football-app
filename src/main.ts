import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './i18n';

import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const app = createApp(App);
app.use(router);
app.provide('config', {
  apiUrl: 'http://127.0.0.1:8000'
});
app.use(i18n);
app.mount('#app');
