<script setup lang="ts">
import { useStore } from 'vuex';
import AppHeader from './features/header/AppHeader.vue';
import type { StoreState } from './core/store/models/store-types';

const store = useStore<StoreState>();
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
