import './style.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// 라우터를 앱에 연결해 메뉴 선택에 따라 개별 피벗 예제를 표시합니다.
createApp(App).use(router).mount('#app');
