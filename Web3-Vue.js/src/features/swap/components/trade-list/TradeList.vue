<script setup lang="ts">
import Trade from '../trade-element/Trade.vue';
import { useStore } from 'vuex';
import { StoreState } from '../../../../core/store/models/store-types';
import { computed, watch } from 'vue';
import { SwapContainerService } from '../../services/swap-container-service';
import { CalculationService } from '../../../../core/dexes/services/on-chain-calculation-service';
import { Injector } from '../../../../core/services/injector/injector';
import { TokenInfo, TokenInfoWithoutAmount } from '../../../../core/dexes/models/token-types';

//hooks
const store = useStore<StoreState>();

//services
const swapContainerSrv = new SwapContainerService();
const calculationSrv = new CalculationService();
const arr = [1, 2, 3];

//refs

//computeds
const fromToken = computed(() => store.state.swapForm.from);
const toToken = computed(() => store.state.swapForm.to);
const trades = computed(() => store.state.trade.trades);
const hasAvailableTrades = computed(() => trades.value.length > 0);

//funcs
const calculateTrades = async (): Promise<void> => {
    const availableTrades = await calculationSrv.getAvailableOnChainTrades(
        fromToken.value as TokenInfo,
        toToken.value as TokenInfoWithoutAmount
    );
    Injector.storeCommit('setTrades', availableTrades);
};

//watchers

watch(
    [fromToken, toToken],
    async ([fromChanged, toChanged]) => {
        if (!swapContainerSrv.needCalculateTrades(fromChanged, toChanged)) {
            return;
        }
        await calculateTrades();
    },
    { deep: true }
);
</script>

<template>
    <div class="trade-list">
        <h1 style="text-align: center">Provider list</h1>
        <div class="trade-list__trades">
            <Trade v-if="hasAvailableTrades" v-for="trade in trades" :trade="trade" />
            <p v-else>No available trades. Try to recalculate!</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.trade-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 900px;
    padding: 10px;
    box-shadow: 0 0 15px 3px gray;
    border-radius: 20px;
}
</style>
