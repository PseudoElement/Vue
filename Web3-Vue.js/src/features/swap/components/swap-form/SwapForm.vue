<script setup lang="ts">
import { ref, watch } from 'vue';
import { SELECT_SOURCE_CHAINS, SELECT_SOURCE_TOKENS } from './constants/select-options';
import InputSelect from '../../../../shared/inputs/input-select/InputSelect.vue';

//refs
const fromChain = ref<string>(SELECT_SOURCE_CHAINS[0].value);
const fromToken = ref<string>(SELECT_SOURCE_TOKENS[0].value);

//watchers
watch(fromChain, (next, prev) => {
    console.log('PREV: ', prev);
    console.log('NEXT: ', next);
});
</script>

<template>
    <div class="swap-form">
        <section class="swap-form__from">
            <InputSelect
                v-model="fromChain"
                :options="SELECT_SOURCE_CHAINS"
                :default-option="SELECT_SOURCE_CHAINS[0]"
                :title="'Select source chain'"
            />
            <InputSelect
                v-model="fromToken"
                :options="SELECT_SOURCE_TOKENS"
                :default-option="SELECT_SOURCE_TOKENS[0]"
                :title="'Select source token'"
            />
        </section>
    </div>
</template>

<style lang="scss" scoped>
.swap-form {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__from {
    }
}
</style>
