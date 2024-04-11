import { createRouter, createWebHistory } from 'vue-router';

import User from './components/User'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/user/:id', component: User },
        //{ path: '/account/:accountId', component: Account },
    ]
});

export default router;