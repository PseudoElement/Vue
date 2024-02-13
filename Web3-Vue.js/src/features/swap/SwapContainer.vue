<script lang="ts" setup>
import { SwapService } from '../../core/services/swap/swap-service';
import AppButton from '../../shared/button/AppButton.vue';
import SwapForm from './components/swap-form/SwapForm.vue';
import { ERC20_TOKEN_ABI } from '../../core/constants/abi/erc20-token-abi';
import { StoreState } from '../../core/store/models/store-types';
import { useStore } from 'vuex';
import { computed } from 'vue';
import { Web3Service } from '../../core/services/web3-service/web3-service';
import { AmountParser } from '../../core/services/amount-parser/amount-parser';

//hooks
const store = useStore<StoreState>();

//refs

//computeds
const walletAddress = computed(() => store.state.wallet.address);
const fromAmount = computed(() => store.state.swapForm.from.amount);
const fromDecimals = computed(() => store.state.swapForm.from.decimals);

//funcs
const swap = async (): Promise<void> => {
    const amountWei = AmountParser.toWei(fromAmount.value, fromDecimals.value!);
    const methodName = 'transfer';
    const methodArgs = [walletAddress.value!, amountWei];
    const data = Web3Service.encodeTxData(ERC20_TOKEN_ABI, methodName, methodArgs);
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
