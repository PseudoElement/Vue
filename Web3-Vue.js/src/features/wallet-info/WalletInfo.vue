<script setup lang="ts">
import AppButton from '../../shared/button/AppButton.vue';
import { WallectConnectionService } from '../../core/services/wallet-connection-service';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import type { StoreState } from '../../core/store/models/store-types';
import { WalletMutations } from '../../core/store/wallet/mutations';

onMounted(() => {});

const store = useStore<StoreState>();

const walletAddress = computed(() => store.state.wallet.address);

const tryConnectWallet = (): void => {
    const onLogin = (address: string | null) => {
        store.commit(WalletMutations.SET_WALLET_ADDRESS, {
            address
        });

        console.log(store.state.wallet.address);
    };

    WallectConnectionService.connectWallet(onLogin);
};
</script>

<template>
    <div class="wallet-info-container">
        WALLET INFO
        <h1>{{ walletAddress ? 'Your wallet: ' + walletAddress : "You haven't connected wallet yet." }}</h1>
        <AppButton @click="tryConnectWallet()"> Connect Wallet </AppButton>
    </div>
</template>

<style lang="scss" scoped>
@import './WalletInfo.scss';
</style>
