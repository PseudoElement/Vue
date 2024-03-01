<script setup lang="ts">
import InlineSvg from '../../../../shared/inline-svg/InlineSvg.vue';
import { AbstractOnChainTrade } from '@/src/core/dexes/abstract/abstract-dex-trade';
import { TRADES_UI_CONFIG } from '../../../../core/constants/trades/trades-ui-config';
import { computed } from 'vue';

const { trade } = defineProps<{ trade: AbstractOnChainTrade }>();

const config = TRADES_UI_CONFIG[trade.type];

//computeds
const amount = computed(() => {
    const sliced = String(trade.outputAmount).slice(0, 6);
    return sliced || 0;
});
const icon = computed(async () => {
    const module = await import(`${config.icon}`);
    console.log(module);
    return module.default;
});
</script>

<template>
    <div class="trade" :background-color="config.bgColor">
        <div class="trade-icon">
            <InlineSvg :src="import('../../../../assets/logo.svg')" />
        </div>
        <div class="trade-info">
            <h3>{{ config.label }}</h3>
            <h4>Amount: {{ amount }}</h4>
            <h4>Rank: {{ config.rank }}</h4>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.trade {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    width: 250px;
    height: 100px;
    border-radius: 25px;
    border: none;

    &-info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        // align-items: flex-end;
    }

    &-icon {
    }
}
</style>
