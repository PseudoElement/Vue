<script setup lang="ts"></script>

<template>
    <button class="app-button">
        <span>
            <slot></slot>
        </span>
    </button>
</template>

<style lang="scss" scoped>
.app-button {
    border-radius: 7px;
    font-size: 30px;
}
</style>
