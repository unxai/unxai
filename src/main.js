import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 引入路由
import './index.css'; // 导入Tailwind CSS样式

const app = createApp(App);
app.use(router); // 使用路由
app.mount('#app');