import { createRouter, createWebHistory } from 'vue-router';

import CameraDirect from './pages/CameraDirect.vue'
import HomePage from './pages/HomePage.vue'
import UserPage from './pages/UserPage.vue'
import AccountPage from './pages/AccountPage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/camera-direct', component: CameraDirect},
        { path: '/user/:id', name: 'user', component: UserPage},
        { path: '/account/:id', name: 'account', component: AccountPage}
    ]
});

export default router;