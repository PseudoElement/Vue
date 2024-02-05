<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { SELECT_SOURCE_CHAINS, SELECT_TARGET_CHAINS } from './constants/select-options';
import InputSelect from '../../../../shared/inputs/input-select/InputSelect.vue';
import InputText from '../../../../shared/inputs/input-text/InputText.vue';
import AppLoader from '../../../../shared/loader/AppLoader.vue';

import { AssetType, TokenOption } from './models/swap-form-types';
import { OpenOceanApiService } from '../../../../core/services/open-ocean/open-ocean-api-service';
import { Utils } from '../../../../core/utils/utils';
import { OpenOceanParser } from '../../../../core/services/open-ocean/open-ocean-parser';
import BigNumber from 'bignumber.js';
import { Web3Service } from '../../../../core/services/web3-service';
import { useStore } from 'vuex';
import { StoreState } from '@/src/core/store/models/store-types';
import { SelectOption } from '@/src/shared/inputs/input-select/model';
import { WalletService } from '../../../../core/services/wallet-service';
import { BlockchainName } from '../../../../core/constants/blockchain-names';
import { BLOCKCHAIN_IDS } from '../../../../core/constants/blockchain-ids';
import { SwapFormService } from '../../../../core/services/swap-form-service';

const store = useStore<StoreState>();

//refs
const fromTokenList = ref<TokenOption[]>([]);
const toTokenList = ref<TokenOption[]>([]);
const isFromTokenListLoading = ref<boolean>(false);
const isToTokenListLoading = ref<boolean>(false);
const fromAmount = ref<BigNumber>(new BigNumber(0));
const toAmount = ref<BigNumber | null>(null);
const selectedTokenBalance = ref<number | null>(null);

//services
const web3Srv = new Web3Service();
const walletSrv = new WalletService();
const swapFormSrv = new SwapFormService();

//computeds
const fromBlockchain = computed(() => from.value.blockchain);
const toBlockchain = computed(() => to.value.blockchain);
const fromToken = computed(() => from.value.token);
const walletAddress = computed(() => store.state.wallet.address);
const from = computed<AssetType>(() => store.state.swapForm.from);
const to = computed<AssetType>(() => store.state.swapForm.to);

//funcs
const setFromAmount = (value: string): void => {
    fromAmount.value = new BigNumber(value);
};

const setFromToken = (token: SelectOption): void => {
    swapFormSrv.setFromToken(token as TokenOption);
};

const setToToken = (token: SelectOption): void => {
    swapFormSrv.setToToken(token as TokenOption);
};

const setSelectedTokenBalance = (amount: BigNumber): void => {
    selectedTokenBalance.value = amount.toNumber();
};

const setFromTokenList = async (): Promise<void> => {
    isFromTokenListLoading.value = true;
    const chainId = Utils.getChainIdByName(from.value.blockchain);
    const openOceanTokens = await OpenOceanApiService.getTokenList(chainId);
    fromTokenList.value = OpenOceanParser.mapTokens(openOceanTokens);
    isFromTokenListLoading.value = false;
};

const setToTokenList = async (): Promise<void> => {
    isToTokenListLoading.value = true;
    const chainId = Utils.getChainIdByName(to.value.blockchain);
    const openOceanTokens = await OpenOceanApiService.getTokenList(chainId);
    toTokenList.value = OpenOceanParser.mapTokens(openOceanTokens);
    isToTokenListLoading.value = false;
};

const onChangeFromBlockchain = async (blockchain: BlockchainName): Promise<void> => {
    const chainId = BLOCKCHAIN_IDS[blockchain];
    await walletSrv.switchChain(chainId);
    await setFromTokenList();
    setFromToken(fromTokenList.value[0]);
};

const receiveFromTokenBalance = async (): Promise<void> => {
    const balance = await web3Srv.getBalance(walletAddress.value as string, from.value.address!, from.value.blockchain);
    setSelectedTokenBalance(balance);
};

//watchers
watch(fromBlockchain, async (blockchain) => await onChangeFromBlockchain(blockchain));
watch(toBlockchain, async () => await setToTokenList());
watch(fromToken, async () => await receiveFromTokenBalance());

//lifecycle hooks
onMounted(async () => {
    await setFromTokenList();
    await setToTokenList();
    await onChangeFromBlockchain(fromBlockchain.value);
});
</script>

<template>
    <div class="swap-form">
        <section class="swap-form__from">
            <InputSelect
                v-model="from.blockchain"
                :options="SELECT_SOURCE_CHAINS"
                :default-value="from.blockchain"
                :title="'Select source chain'"
            />

            <InputSelect
                v-if="!isFromTokenListLoading && fromTokenList.length"
                :options="fromTokenList"
                :title="'Select source token'"
                :show-value="true"
                @select-value="setFromToken"
            />
            <div class="swap-form__from-loader" v-else>
                <p>Tokens loading...</p>
                <AppLoader />
            </div>

            <div class="swap-form__from-amount">
                <InputText v-model="fromAmount" :id="'fromAmount'" :label="'Input amount'" :debounce="200" @on-input="setFromAmount" />
                <p>Balance: {{ `${selectedTokenBalance} ${from.token}` }}</p>
            </div>
        </section>
        <section class="swap-form__to">
            <InputSelect v-model="to.blockchain" :options="SELECT_TARGET_CHAINS" :default="to.blockchain" :title="'Select target chain'" />

            <InputSelect
                v-if="!isToTokenListLoading && toTokenList.length"
                :options="toTokenList"
                :title="'Select target token'"
                :show-value="true"
                @select-value="setToToken"
            />
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
    box-shadow: 0 0 150px 20px black inset;
    padding: 20px;
    border-radius: 20px;

    &__from,
    &__to {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        gap: 10px;

        &-amount {
            font-size: 20px;

            p {
                margin: 5px;
            }
        }

        &-loader {
            width: 250px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            font-size: 20px;
            height: 31px;
        }
    }
}
</style>
