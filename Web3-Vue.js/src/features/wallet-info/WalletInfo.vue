<script setup lang="ts">
import AppButton from '../../shared/button/AppButton.vue';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import type { StoreState } from '@/src/core/store/models/store-types';
import { WalletService } from '../../core/services/wallet-service';

const store = useStore<StoreState>();
const chainId = computed(() => store.state.wallet.chainId);
const walletAddress = computed(() => store.state.wallet.address);
const isConnected = computed(() => store.state.wallet.isConnected);
const walletSrv = new WalletService();

const onConnectButtonClick = (): void => {
    if (isConnected.value) {
        walletSrv.disconnectWallet();
    } else {
        walletSrv.connectWallet();
    }
};

onMounted(() => {
    walletSrv.connectWallet();
});
</script>

<template>
    <div class="wallet-info-container">
        WALLET INFO
        <h2>{{ walletAddress ? 'Your wallet: ' + walletAddress : "You haven't connected wallet yet." }}</h2>
        <h2 v-if="chainId">Chain id: {{ chainId }}</h2>
        <AppButton @click="onConnectButtonClick()"> {{ !walletAddress ? 'Connect Wallet' : 'Disconnect' }} </AppButton>
    </div>
</template>

<style lang="scss" scoped>
@import './WalletInfo.scss';
</style>
