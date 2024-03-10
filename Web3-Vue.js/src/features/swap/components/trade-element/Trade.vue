<script setup lang="ts">
import { TRADES_UI_CONFIG } from '../../../../core/constants/trades/trades-ui-config';
import { computed, onUpdated, ref } from 'vue';
import { useStore } from 'vuex';
import { StoreState } from '../../../../core/store/models/store-types';
import { Injector } from '../../../../core/services/injector/injector';
import { ResolvedTrade } from '../../../../core/dexes/services/models/calculation-service-types';

const { trade: wrappedTrade } = defineProps<{ trade: ResolvedTrade }>();

const store = useStore<StoreState>();

const config = TRADES_UI_CONFIG[wrappedTrade.trade.type];

//refs
const isActive = ref<boolean>(wrappedTrade.isActive);

//computeds
const toAmount = computed(() => {
    const sliced = wrappedTrade.trade.outputAmountString.slice(0, 7);

    if (wrappedTrade.trade.outputAmountString.length > 6) {
        return `${sliced}...`;
    }

    return sliced;
});
const toSymbol = computed(() => wrappedTrade.trade.to.symbol);
const selectedTrade = computed(() => store.state.trade.selectedTrade);
const isSelectedTrade = computed(() => selectedTrade.value?.type === wrappedTrade.trade.type);

//funcs
const selectTrade = (): void => {
    if(!wrappedTrade.isActive) return;
    Injector.storeCommit('selectTrade', wrappedTrade.trade);
};

//lifehooks
onUpdated(() => {
    isActive.value = wrappedTrade.isActive;
});
</script>

<template>
    <div class="trade" :style="{ backgroundColor: config.bgColor}" :class="{ selected: isSelectedTrade, inactive: !isActive }" @click="selectTrade">
        <div class="trade-icon">
            <img :src="config.icon" alt="Trade icon" width="60" height="60" />
        </div>
        <div class="trade-info">
            <h4 class="trade-info__title">{{ config.label }}</h4>
            <p class="trade-info__content">Amount: {{ `${toAmount} ${toSymbol}` }}</p>
            <p class="trade-info__content">Rank: {{ config.rank }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.trade {
    position: relative;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    width: 300px;
    height: 100px;
    border-radius: 25px;
    border: none;
    box-shadow: 0 2px 1px 2px gray;
    transition: all 0.1s;

    cursor: pointer;

    &:hover {
        opacity: 0.8;
        top: 1px;
        box-shadow: 0 1px 1px 2px gray;
    }

    &-info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        gap: 4px;

        &__title {
            text-decoration: underline;
            align-self: flex-end;
        }

        &__content {
            letter-spacing: 0px;
            font-weight: lighter;
        }
    }

    &-icon {
        width: 60px;
        height: 60px;
    }
}

.inactive{
    opacity: 0.5;
}

.selected {
    box-shadow: 0 2px 1px 2px #ff6eee;

    &:hover {
        box-shadow: 0 1px 1px 2px #ff6eee;
    }
}
</style>