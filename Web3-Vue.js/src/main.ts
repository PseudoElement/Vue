import App from '@/App.vue';
import { createApp } from 'vue';
import router from './core/router';
import { store } from './core/store/store';

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
