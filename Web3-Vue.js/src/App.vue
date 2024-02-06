<script setup lang="ts">
import { onMounted } from 'vue';
import AppHeader from './features/header/AppHeader.vue';
import { Web3Service } from './core/services/web3-service';
import { WalletService } from './core/services/wallet/wallet-service';

//srv
const web3Srv = new Web3Service();
const walletSrv = new WalletService();

//lifecycle hooks
onMounted(async () => {
    await walletSrv.connectWallet();
    await web3Srv.connectWeb3();
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

    a {
        text-decoration: none !important;
        color: black !important;
    }
}
</style>
./core/services/wallet/wallet-service
