<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <header class="app-header">
        <RouterLink to="/wallet-info">Wallet Info</RouterLink>
        <RouterLink to="/swap">Swap</RouterLink>
    </header>
</template>

<style lang="scss" scoped>
@import './AppHeader.scss';
</style>
