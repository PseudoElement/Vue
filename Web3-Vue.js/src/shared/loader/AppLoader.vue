<script setup lang="ts"></script>

<template>
    <span class="material-symbols-outlined loader"> cached </span>
</template>

<style lang="scss" scoped>
.loader {
    width: 30px;
    color: white;
    font-size: 30px;
    animation: loader 1.2s linear infinite;
}

@keyframes loader {
    0% {
        transform: rotateZ(0deg);
    }
    100% {
        transform: rotateZ(360deg);
    }
}
</style>
