import { createRouter, createWebHistory } from 'vue-router';

import CameraDirect from './pages/CameraDirect.vue'
import HomePage from './pages/HomePage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/camera-direct', component: CameraDirect}
    ]
});

export default router;