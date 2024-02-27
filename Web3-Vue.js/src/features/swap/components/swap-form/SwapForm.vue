<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { SELECT_SOURCE_CHAINS, SELECT_TARGET_CHAINS } from './constants/select-options';
import InputSelect from '../../../../shared/inputs/input-select/InputSelect.vue';
import InputText from '../../../../shared/inputs/input-text/InputText.vue';
import AppLoader from '../../../../shared/loader/AppLoader.vue';

import { AssetType, AssetTypeWithoutAmount, ChainOption, TokenOption } from './models/swap-form-types';
import { OpenOceanApiService } from '../../../../core/services/open-ocean/open-ocean-api-service';
import { Utils } from '../../../../core/utils/utils';
import { OpenOceanParser } from '../../../../core/services/open-ocean/open-ocean-parser';
import BigNumber from 'bignumber.js';
import { Web3Service } from '../../../../core/services/web3-service/web3-service';
import { useStore } from 'vuex';
import { StoreState } from '@/src/core/store/models/store-types';
import { SelectOption } from '@/src/shared/inputs/input-select/model';
import { WalletService } from '../../../../core/services/wallet/wallet-service';
import { BlockchainName } from '../../../../core/constants/blockchain-names';
import { BLOCKCHAIN_IDS } from '../../../../core/constants/blockchain-ids';
import { SwapFormService } from '../../../../core/services/swap-form-service';

//hooks
const store = useStore<StoreState>();

//refs
const fromTokenList = ref<TokenOption[]>([]);
const toTokenList = ref<TokenOption[]>([]);
const isFromTokenListLoading = ref<boolean>(false);
const isToTokenListLoading = ref<boolean>(false);
const isBalanceLoading = ref<boolean>(false);
const toAmount = ref<BigNumber | null>(null);
const selectedTokenBalance = ref<number | null>(null);

//computeds
const fromBlockchain = computed(() => store.state.swapForm.from.blockchain);
const fromToken = computed(() => store.state.swapForm.from.symbol);
const fromAddress = computed(() => store.state.swapForm.from.address);
const toBlockchain = computed(() => store.state.swapForm.to.blockchain);
const walletAddress = computed(() => store.state.wallet.address);
const to = computed<AssetTypeWithoutAmount>(() => store.state.swapForm.to);
const showBalance = computed<boolean>(() => !!fromToken.value && !isBalanceLoading.value);
const showFromTokenSelect = computed<boolean>(() => !isFromTokenListLoading.value && !!fromTokenList.value.length);
const showToTokenSelect = computed<boolean>(() => !isToTokenListLoading.value && !!toTokenList.value.length);
const balanceShortened = computed<string>(() => Utils.shortenAmount(selectedTokenBalance.value));

//funcs
const setFromBlockchain = (option: SelectOption): void => {
    SwapFormService.setFromBlockchain((option as ChainOption).value);
};

const setToBlockchain = (option: SelectOption): void => {
    SwapFormService.setToBlockchain((option as ChainOption).value);
};

const setFromAmount = (value: string): void => {
    SwapFormService.setFromAmount(new BigNumber(value));
};

const setFromToken = async (token: SelectOption): Promise<void> => {
    await SwapFormService.setFromToken(token as TokenOption);
    await SwapFormService.setFromDecimals();
};

const removeFromToken = (): void => {
    SwapFormService.removeFromToken();
};

const setToToken = async (token: SelectOption): Promise<void> => {
    await SwapFormService.setToToken(token as TokenOption);
    await SwapFormService.setToDecimals();
};

const setSelectedTokenBalance = (amount: BigNumber): void => {
    selectedTokenBalance.value = amount.toNumber();
};

const setFromTokenList = async (): Promise<void> => {
    isFromTokenListLoading.value = true;
    const chainId = Utils.getChainIdByName(fromBlockchain.value!);
    const openOceanTokens = await OpenOceanApiService.getTokenList(chainId);
    if (openOceanTokens) {
        fromTokenList.value = OpenOceanParser.mapTokens(openOceanTokens);
    } else {
        fromTokenList.value = [];
    }
    isFromTokenListLoading.value = false;
};

const setToTokenList = async (): Promise<void> => {
    isToTokenListLoading.value = true;
    const chainId = Utils.getChainIdByName(to.value.blockchain!);
    const openOceanTokens = await OpenOceanApiService.getTokenList(chainId);
    if (openOceanTokens) {
        toTokenList.value = OpenOceanParser.mapTokens(openOceanTokens);
    } else {
        toTokenList.value = [];
    }
    isToTokenListLoading.value = false;
};

const onChangeFromBlockchain = async (blockchain: BlockchainName): Promise<void> => {
    const chainId = BLOCKCHAIN_IDS[blockchain];
    await WalletService.switchChain(chainId);
    await setFromTokenList();
    removeFromToken();
};

const receiveFromTokenBalance = async (): Promise<void> => {
    try {
        isBalanceLoading.value = true;
        const balance = await Web3Service.getBalance(walletAddress.value!, fromAddress.value!);
        setSelectedTokenBalance(balance);
    } finally {
        isBalanceLoading.value = false;
    }
};

//watchers
watch(fromBlockchain, async (blockchain) => {
    if (!blockchain) return;
    await onChangeFromBlockchain(blockchain);
});
watch(toBlockchain, async () => await setToTokenList());
watch(fromToken, async () => {
    await receiveFromTokenBalance();
});

//lifecycle hooks
onMounted(async () => {});
</script>

<template>
    <div class="swap-form">
        <section class="swap-form__from">
            <InputSelect
                :options="SELECT_SOURCE_CHAINS"
                :value="fromBlockchain"
                :title="'Select source chain'"
                @select-value="setFromBlockchain"
            />

            <InputSelect
                v-if="showFromTokenSelect"
                v-model="fromToken"
                :options="fromTokenList"
                :title="'Select source token'"
                :show-value="true"
                @select-value="setFromToken"
            />
            <div class="swap-form__from-not-selected-chain" v-else-if="!isFromTokenListLoading">Select source chain.</div>
            <div class="swap-form__from-loader" v-else>
                <p>Tokens loading...</p>
                <AppLoader />
            </div>

            <div class="swap-form__from-amount">
                <InputText :id="'fromAmount'" :label="'Input amount'" :debounce="200" @on-input="setFromAmount" />

                <p v-if="showBalance">Balance: {{ `${balanceShortened} ${fromToken}` }}</p>
                <div v-else-if="isBalanceLoading" class="swap-form__from-loader">
                    <p>Balance loading...</p>
                    <AppLoader />
                </div>
            </div>
        </section>

        <section class="swap-form__to">
            <InputSelect
                :options="SELECT_TARGET_CHAINS"
                :value="to.blockchain"
                :title="'Select target chain'"
                @select-value="setToBlockchain"
            />

            <InputSelect
                v-if="showToTokenSelect"
                :options="toTokenList"
                :value="to.symbol"
                :title="'Select target token'"
                :show-value="true"
                @select-value="setToToken"
            />
            <div class="swap-form__to-not-selected-chain" v-else-if="!isToTokenListLoading">Select target chain.</div>
            <div class="swap-form__to-loader" v-else>
                <p>Tokens loading...</p>
                <AppLoader />
            </div>

            <InputText v-model="toAmount" :id="'toAmount'" :label="'Output amount'" :disabled="true" />
        </section>
    </div>
</template>

<style lang="scss" scoped>
.swap-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 30px;
    box-shadow: 0 0 150px 20px red inset;
    padding: 20px;
    border-radius: 20px;

    &__from,
    &__to {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        width: 100%;
        gap: 10px;

        &-amount {
            display: flex;
            flex-direction: column;
            align-items: baseline;
            gap: 10px;
            font-size: 20px;
        }

        &-loader,
        &-not-selected-chain {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            font-size: 20px;
            height: 20px;
        }

        &-not-selected-chain {
            width: 250px;
        }

        &-loader {
            white-space: nowrap;
        }
    }
}
</style>
