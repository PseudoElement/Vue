<script setup lang="ts">
const { error } = defineProps<{ error: string | null }>();
</script>

<template>
    <h3>{{ error }}</h3>
</template>

<style lang="scss" scoped>
h3 {
    color: red;
    font-style: italic;
}
</style>
