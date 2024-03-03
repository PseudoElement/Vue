<script setup lang="ts">
import { AbstractOnChainTrade } from '@/src/core/dexes/abstract/abstract-dex-trade';
import { TRADES_UI_CONFIG } from '../../../../core/constants/trades/trades-ui-config';
import { computed } from 'vue';
import { useStore } from 'vuex';
import { StoreState } from '../../../../core/store/models/store-types';
import { Injector } from '../../../../core/services/injector/injector';

const { trade } = defineProps<{ trade: AbstractOnChainTrade }>();

const store = useStore<StoreState>();

const config = TRADES_UI_CONFIG[trade.type];

//computeds
const toAmount = computed(() => {
    const sliced = trade.outputAmountString.slice(0, 7);

    if (trade.outputAmountString.length > 6) {
        return `${sliced}...`;
    }

    return sliced;
});
const toSymbol = computed(() => trade.to.symbol);
const selectedTrade = computed(() => store.state.trade.selectedTrade);
const isSelectedTrade = computed(() => selectedTrade.value?.type === trade.type);

//funcs
const selectTrade = (): void => {
    Injector.storeCommit('selectTrade', trade);
};

//
</script>

<template>
    <div class="trade" :style="{ backgroundColor: config.bgColor }" :class="{ selected: isSelectedTrade }" @click="selectTrade">
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

.selected {
    box-shadow: 0 2px 1px 2px #ff6eee;

    &:hover {
        box-shadow: 0 1px 1px 2px #ff6eee;
    }
}
</style>
