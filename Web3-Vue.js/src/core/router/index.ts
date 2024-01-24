import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/wallet-info',
            name: 'Wallet-Info',
            component: () => import('../../features/wallet-info/WalletInfo.vue')
        },
        {
            path: '/swap',
            name: 'Swap',
            component: () => import('../../features/swap/SwapContainer.vue')
        },
        {
            path: '/',
            redirect: '/wallet-info'
        }
    ]
});

export default router;
