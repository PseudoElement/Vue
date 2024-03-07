<script setup lang="ts">
const { size } = defineProps<{ size?: number }>();

//styles
const styles = { fontSize: size ? `${size}px` : '30px', width: size ? `${size}px` : '30px' };
</script>

<template>
    <span class="material-symbols-outlined loader" :style="styles"> cached </span>
</template>

<style lang="scss" scoped>
.loader {
    width: 30px;
    color: white;
    font-size: 30px;
    animation: loader 1.2s linear infinite;
    transform-origin: center center;
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
