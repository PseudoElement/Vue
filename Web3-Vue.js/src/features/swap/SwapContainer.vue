<script lang="ts" setup>
import AppButton from '../../shared/button/AppButton.vue';
import SwapForm from './components/swap-form/SwapForm.vue';
import TradeList from './components/trade-list/TradeList.vue';
import { SwapContainerService } from './services/swap-container-service';

//hooks

//services
const swapContainerSrv = new SwapContainerService();

//refs

//computeds

//funcs
const swap = async (): Promise<void> => {
    const hash = await swapContainerSrv.swap();
    console.log('HASH - ', hash);
};

//watchers
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
