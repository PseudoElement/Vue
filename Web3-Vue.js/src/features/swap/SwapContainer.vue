<script lang="ts" setup>
import SwapForm from './components/swap-form/SwapForm.vue';
//refs

//watchers
</script>

<template>
    <div class="swap-container">
        <div class="swap-container__title">SWAP CONTAINER</div>
        <div class="swap-container__body">
            <SwapForm />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.swap-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    &__title {
        margin-bottom: 20px;
    }
}
</style>
