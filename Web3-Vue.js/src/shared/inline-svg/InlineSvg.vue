<script setup>
import { shallowRef } from 'vue';

const props = defineProps({
    src: {
        type: Object,
        required: true
    }
});

let svgComponent = shallowRef(null);

props.src.then((module) => {
    svgComponent.value = module.default;
});
</script>

<template>
    <component :is="svgComponent" />
</template>
