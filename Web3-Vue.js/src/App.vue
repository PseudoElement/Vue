<script setup lang="ts">
import AppHeader from './features/header/AppHeader.vue'
</script>

<template>
    <AppHeader />
    <main>
        <RouterView />
    </main>
</template>

<style lang="scss" scoped>
@import './App.scss';
</style>
