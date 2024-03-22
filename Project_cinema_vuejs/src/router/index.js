import { createRouter, createWebHashHistory } from 'vue-router';
import AdminRouter from './modules/AdminRouter.js';
import UserRouter from './modules/UserRouter.js';
import PublicRouter from './modules/PublicRouter.js';

const routes = [...PublicRouter,...AdminRouter,...UserRouter]

const router = createRouter({
      history: createWebHashHistory(),
      routes
  
});

export default router;
