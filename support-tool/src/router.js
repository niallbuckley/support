import { createRouter, createWebHistory } from 'vue-router';

// import User from './components/User'
import CameraDirect from './pages/CameraDirect.vue'
import HelloWorld from './components/HelloWorld.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // { path: '/user/:id', component: User },
        { path: '/', component: HelloWorld},
        { path: '/camera-direct', component: CameraDirect}
    ]
});

export default router;