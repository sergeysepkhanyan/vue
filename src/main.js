import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css';
import axios from 'axios';
import store from './store/index';
import setupInterceptors from './services/setup-interceptors';
import TokenService from './services/token.service';

axios.defaults.headers['Authorization'] = `Bearer ${TokenService.getLocalAccessToken()}`;

const app = createApp(App);
setupInterceptors(store);

app.use(router);
app.use(store);

app.mount('#app')