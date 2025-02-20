import { createSSRApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { setupUniUI } from './plugins/uni-ui';

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  
  setupUniUI(app);
  app.use(pinia);
  
  return { app };
}
