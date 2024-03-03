<script setup lang="ts">
import AppLoader from '../loader/AppLoader.vue';

const { text, borderRadius } = defineProps<{ text: string; borderRadius?: number }>();
</script>

<template>
    <div class="backdrop" :style="{ borderRadius: borderRadius ? `${borderRadius}px` : '0' }">
        <h1 class="backdrop-text">{{ text }}</h1>
        <div class="backdrop-loader">
            <AppLoader :size="60" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.backdrop {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.8;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    &-text {
        opacity: 1;
        color: white;
    }

    &-loader {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        width: 40px;
    }
}
</style>
