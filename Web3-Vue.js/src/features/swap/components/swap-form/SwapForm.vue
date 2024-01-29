<script setup lang="ts">
import { ref, watch } from 'vue';
import { SELECT_SOURCE_CHAINS, SELECT_TARGET_CHAINS } from './constants/select-options';
import InputSelect from '../../../../shared/inputs/input-select/InputSelect.vue';
import InputText from '../../../../shared/inputs/input-text/InputText.vue';
import { AssetType, TokenOption } from './models/swap-form-types';
import { OpenOceanApiService } from '../../../../core/services/open-ocean/open-ocean-api-service';
import { Utils } from '../../../../core/utils/utils';
import { OpenOceanParser } from '../../../../core/services/open-ocean/open-ocean-parser';
import { BlockchainName } from '../../../../core/constants/blockchain-names';

//refs
const fromTokenList = ref<TokenOption[]>([]);
const toTokenList = ref<TokenOption[]>([]);
const from = ref<AssetType>({ blockchain: SELECT_SOURCE_CHAINS[0].value, token: null, amount: '' });
const to = ref<AssetType>({ blockchain: SELECT_TARGET_CHAINS[0].value, token: null, amount: '' });

//funcs
const setFromAmount = (value: string): void => {
    from.value.amount = value;
};

const setFromTokenList = async (blockchainName: BlockchainName): Promise<void> => {
    const chainId = Utils.getChainIdByName(blockchainName);
    const openOceanTokens = await OpenOceanApiService.getTokenList(chainId);
    fromTokenList.value = OpenOceanParser.mapTokens(openOceanTokens);
};

const setToTokenList = async (blockchainName: BlockchainName): Promise<void> => {
    const chainId = Utils.getChainIdByName(blockchainName);
    const openOceanTokens = await OpenOceanApiService.getTokenList(chainId);
    fromTokenList.value = OpenOceanParser.mapTokens(openOceanTokens);
};

//watchers
watch(from, async (next) => await setFromTokenList(next.blockchain), { deep: true });
watch(to, async (next) => await setToTokenList(next.blockchain), { deep: true });
//
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
            <InputSelect v-if="fromTokenList.length" v-model="from.token" :options="fromTokenList" :title="'Select source token'" />
            <p v-else>Tokens are not loaded yet.</p>
            <InputText v-model="from.amount" :id="'fromAmount'" :label="'Input amount'" :debounce="200" @on-input="setFromAmount" />
        </section>
        <section class="swap-form__to">
            <InputSelect v-model="to.blockchain" :options="SELECT_TARGET_CHAINS" :default="to.blockchain" :title="'Select target chain'" />
            <InputSelect v-if="toTokenList.length" v-model="to.token" :options="toTokenList" :title="'Select target token'" />
            <p v-else>Tokens are not loaded yet.</p>
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
    }
}
</style>
