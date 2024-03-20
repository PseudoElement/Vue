<script setup lang="ts">
const { disabled } = defineProps<{ disabled: boolean }>();
</script>

<template>
    <button class="app-button" :class="{ disabled: disabled }" :disabled="disabled">
        <span>
            <slot></slot>
        </span>
    </button>
</template>

<style lang="scss" scoped>
.app-button {
    border-radius: 20px;
    border: none;
    font-size: 30px;
    padding: 10px;
    cursor: pointer;
    background: linear-gradient(to bottom, #f2f9fe 0%, #d6f0fd 100%);

    &:hover {
        background: linear-gradient(to bottom, #fb83fa 0%, #e93cec 100%);
    }
}

.disabled {
    pointer-events: none;
    opacity: 0.5;
    &:hover {
        background: linear-gradient(to bottom, #f2f9fe 0%, #d6f0fd 100%);
    }
}
</style>
