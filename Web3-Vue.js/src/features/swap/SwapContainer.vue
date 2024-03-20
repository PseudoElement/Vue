<script lang="ts" setup>
import { StoreState } from '@/src/core/store/models/store-types';
import { computed } from 'vue';
import { useStore } from 'vuex';
import AppButton from '../../shared/button/AppButton.vue';
import SwapForm from './components/swap-form/SwapForm.vue';
import TradeList from './components/trade-list/TradeList.vue';
import SwapError from './components/swap-error/SwapError.vue';
import { SwapContainerService } from './services/swap-container-service';

//hooks
const store = useStore<StoreState>();

//services
const swapContainerSrv = new SwapContainerService();

//refs

//computeds
const fromBlockchain = computed(() => store.state.trade.selectedTrade?.from.blockchain);
const toBlockchain = computed(() => store.state.trade.selectedTrade?.to.blockchain);
const isSwapDisabled = computed(() => !fromBlockchain.value || !toBlockchain.value || fromBlockchain.value !== toBlockchain.value);
const swapError = computed(() => store.state.errors.swapError);

//funcs
const swap = async (): Promise<void> => {
    const hash = await swapContainerSrv.swap();
    console.log('HASH - ', hash);
};

//watchers
</script>

<template>
    <div class="swap-container">
        <h2 class="swap-container__info">ONLY ON-CHAIN SWAPS ARE AVAILABLE!</h2>
        <div class="swap-container__title">SWAP CONTAINER</div>
        <div class="swap-container__body">
            <SwapForm />
            <AppButton @click="swap" :disabled="isSwapDisabled">Swap</AppButton>
            <SwapError v-show="!!swapError" :error="swapError" />
        </div>
        <TradeList />
    </div>
</template>

<style lang="scss" scoped>
.swap-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 15px;

    &__body {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 20px;
    }

    &__info {
        color: red;
        padding: 20px;
        border-radius: 20px;
        box-shadow: 0 0 30px 0px black inset;
    }
}
</style>
