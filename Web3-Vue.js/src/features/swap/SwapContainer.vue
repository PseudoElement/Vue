<script lang="ts" setup>
import AppButton from '../../shared/button/AppButton.vue';
import SwapForm from './components/swap-form/SwapForm.vue';
import { StoreState } from '../../core/store/models/store-types';
import { useStore } from 'vuex';
import { computed } from 'vue';
import { UniswapV2Trade } from '../../core/dexes/uniswap-v2/uniswap-v2-trade';
import { TokenInfo, TokenInfoWithoutAmount } from '@/src/core/dexes/models/token-types';

//hooks
const store = useStore<StoreState>();

//refs

//computeds
const fromToken = computed(() => store.state.swapForm.from as TokenInfo);
const toToken = computed(() => store.state.swapForm.to as TokenInfoWithoutAmount);

//funcs
const swap = async (): Promise<void> => {
    const trade = new UniswapV2Trade(fromToken.value, toToken.value);
    const hash = await trade.swap();

    console.log('HASH - ', hash);
};

//watchers
</script>

<template>
    <div class="swap-container">
        <div class="swap-container__title">SWAP CONTAINER</div>
        <div class="swap-container__body">
            <SwapForm />
        </div>
        <AppButton @click="swap">Swap</AppButton>
    </div>
</template>

<style lang="scss" scoped>
.swap-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 15px;

    &__title {
    }
}
</style>
