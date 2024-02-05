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
import { BlockchainName } from '../../../../core/constants/blockchain-names';
import BigNumber from 'bignumber.js';
import { Web3Service } from '../../../../core/services/web3-service';
import { useStore } from 'vuex';
import { StoreState } from '@/src/core/store/models/store-types';

const store = useStore<StoreState>();

//refs
const fromTokenList = ref<TokenOption[]>([]);
const toTokenList = ref<TokenOption[]>([]);
const isFromTokenListLoading = ref<boolean>(false);
const isToTokenListLoading = ref<boolean>(false);
const from = ref<AssetType>({ blockchain: SELECT_SOURCE_CHAINS[0].value, token: null, amount: null, address: '' });
const to = ref<AssetType>({ blockchain: SELECT_TARGET_CHAINS[0].value, amount: null, token: null, address: '' });
const selectedTokenBalance = ref<number | null>(null);

//services
const web3Srv = new Web3Service();

//computeds
const fromBlockchain = computed(() => from.value.blockchain);
const toBlockchain = computed(() => to.value.blockchain);
const fromToken = computed(() => from.value.token);
const walletAddress = computed(() => store.state.wallet.address);

//funcs
const setFromAmount = (value: string): void => {
    from.value.amount = value;
};

const setSelectedTokenBalance = (amount: BigNumber): void => {
    selectedTokenBalance.value = amount.toNumber();
};

const getFromTokenAddress = (token: string): string => {
    const foundToken = fromTokenList.value.find((t) => t.value === token)!;
    return foundToken.address;
};

const setFromTokenList = async (blockchainName: BlockchainName): Promise<void> => {
    isFromTokenListLoading.value = true;
    const chainId = Utils.getChainIdByName(blockchainName);
    const openOceanTokens = await OpenOceanApiService.getTokenList(chainId);
    fromTokenList.value = OpenOceanParser.mapTokens(openOceanTokens);
    isFromTokenListLoading.value = false;
};

const setToTokenList = async (blockchainName: BlockchainName): Promise<void> => {
    isToTokenListLoading.value = true;
    const chainId = Utils.getChainIdByName(blockchainName);
    const openOceanTokens = await OpenOceanApiService.getTokenList(chainId);
    toTokenList.value = OpenOceanParser.mapTokens(openOceanTokens);
    isToTokenListLoading.value = false;
};

const receiveFromTokenBalance = async (token: string): Promise<void> => {
    const fromTokenAddress = getFromTokenAddress(token);
    const balance = await web3Srv.getBalance(walletAddress.value as string, fromTokenAddress, from.value.blockchain);
    setSelectedTokenBalance(balance);
};

//watchers
watch(fromBlockchain, async (chain) => await setFromTokenList(chain));
watch(toBlockchain, async (chain) => await setToTokenList(chain));
watch(fromToken, async (token) => await receiveFromTokenBalance(token as string));

//lifecycle hooks
onMounted(async () => {
    await setFromTokenList(from.value.blockchain);
    await setToTokenList(to.value.blockchain);
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
                v-model="from.token"
                :options="fromTokenList"
                :title="'Select source token'"
            />
            <div class="swap-form__from-loader" v-else>
                <p>Tokens loading...</p>
                <AppLoader />
            </div>

            <div class="swap-form__from-amount">
                <InputText v-model="from.amount" :id="'fromAmount'" :label="'Input amount'" :debounce="200" @on-input="setFromAmount" />
                <p>Balance: {{ selectedTokenBalance }}</p>
            </div>
        </section>
        <section class="swap-form__to">
            <InputSelect v-model="to.blockchain" :options="SELECT_TARGET_CHAINS" :default="to.blockchain" :title="'Select target chain'" />

            <InputSelect
                v-if="!isToTokenListLoading && toTokenList.length"
                v-model="to.token"
                :options="toTokenList"
                :title="'Select target token'"
            />
            <div class="swap-form__to-loader" v-else>
                <p>Tokens loading...</p>
                <AppLoader />
            </div>

            <InputText v-model="to.amount" :id="'toAmount'" :label="'Output amount'" :disabled="true" />
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
