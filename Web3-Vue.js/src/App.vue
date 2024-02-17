<script setup lang="ts">
import { onMounted } from 'vue';
import AppHeader from './features/header/AppHeader.vue';
import { WalletService } from './core/services/wallet/wallet-service';

//srv

//lifecycle hooks
onMounted(async () => {
    await WalletService.connectWallet();
    await WalletService.connectWeb3();
});
//
</script>

<template>
    <AppHeader />
    <main>
        <RouterView />
    </main>
</template>

<style lang="scss" scoped>
@import './App.scss';

body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    p {
        margin: 0;
        padding: 0;
    }
}
</style>
