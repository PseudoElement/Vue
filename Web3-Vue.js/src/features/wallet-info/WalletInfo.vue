<script setup lang="ts">
import AppButton from '../../shared/button/AppButton.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
import type { StoreState } from '@/src/core/store/models/store-types';
import { WalletService } from '../../core/services/wallet/wallet-service';

const store = useStore<StoreState>();

//computeds
const chainId = computed(() => store.state.wallet.chainId);
const walletAddress = computed(() => store.state.wallet.address);
const isConnected = computed(() => store.state.wallet.isConnected);
const walletSrv = new WalletService();

//funcs
const onConnectButtonClick = (): void => {
    if (isConnected.value) {
        walletSrv.disconnectWallet();
    } else {
        walletSrv.connectWallet();
    }
};

//lifecycle hooks
//
</script>

<template>
    <div class="wallet-info-container">
        <h2>WALLET INFO</h2>
        <h3>{{ walletAddress ? 'Your wallet: ' + `${walletAddress}.` : "You haven't connected wallet yet." }}</h3>
        <h3 v-if="chainId">Chain id: {{ chainId }}.</h3>
        <AppButton @click="onConnectButtonClick()"> {{ !walletAddress ? 'Connect Wallet' : 'Disconnect' }} </AppButton>
    </div>
</template>

<style lang="scss" scoped>
@import './WalletInfo.scss';
</style>
