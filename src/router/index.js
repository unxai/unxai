import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('@/views/Home.vue') },
  { path: '/dreams', component: () => import('@/views/DreamList.vue') },
  { path: '/dreams/new', component: () => import('@/views/DreamDetail.vue') },
  { path: '/dreams/:id', component: () => import('@/views/DreamDetail.vue') },
  { path: '/analysis', component: () => import('@/views/DreamAnalysis.vue') },
  { path: '/gallery', component: () => import('@/views/DreamGallery.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;