import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/home/index.vue';
import PaymentsView from '@/views/payments/index.vue';
import UsersView from '@/views/users/index.vue';
import UserEdit from '@/views/users/edit.vue';
import Login from '@/views/auth/Login.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/users',
            name: 'users',
            component: UsersView,
        },
        {
            path: '/users/edit',
            name: 'user-edit',
            component: UserEdit,
        },
        {
            path: '/payments/:userId',
            name: 'payments',
            component: PaymentsView,
            props: true
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
});

export default router