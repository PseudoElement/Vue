<script lang="ts" setup>
import AppButton from '../../shared/button/AppButton.vue';
import SwapForm from './components/swap-form/SwapForm.vue';
import TradeList from './components/trade-list/TradeList.vue';
import { StoreState } from '../../core/store/models/store-types';
import { useStore } from 'vuex';
import { computed, watch } from 'vue';
import { SwapContainerService } from './services/swap-container-service';

//hooks
const store = useStore<StoreState>();

//services
const swapContainerSrv = new SwapContainerService();

//refs

//computeds
const fromToken = computed(() => store.state.swapForm.from);
const toToken = computed(() => store.state.swapForm.to);

//funcs
const swap = async (): Promise<void> => {
    console.log('HASH - ');
};

//watchers

watch(
    [fromToken, toToken],
    ([fromChanged, toChanged]) => {
        if (!swapContainerSrv.needCalculateTrades(fromChanged, toChanged)) {
            return;
        }
    },
    { deep: true }
);
</script>

<template>
    <div class="swap-container">
        <div class="swap-container__title">SWAP CONTAINER</div>
        <div class="swap-container__body">
            <SwapForm />
            <AppButton @click="swap">Swap</AppButton>
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

    &__title {
    }
}
</style>
