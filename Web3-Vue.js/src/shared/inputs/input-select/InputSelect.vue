<script setup lang="ts">
import { ref } from 'vue';
import { SelectOption } from './model';

const { defaultOption, options, title } = defineProps<{
    options: SelectOption[];
    defaultOption?: SelectOption;
    title: string;
}>();

const selectedValue = ref<string>(defaultOption?.value || options[0].value);

const selectValue = (e: any): void => {
    selectedValue.value = e.target.value;
};
</script>

<template>
    <select class="select" v-model="selectedValue" @change="selectValue($event)">
        <option class="select-option" disabled>{{ title }}</option>
        <option
            class="select-option"
            :class="{ 'select-option__last': index === options.length - 1 }"
            v-for="(option, index) in options"
            :key="option.value"
            :value="option.value"
            :disabled="option.isDisabled"
        >
            {{ option.text }}
        </option>
    </select>
</template>

<style lang="scss" scoped>
.select {
    cursor: pointer;
    font-size: 24px;

    &-option {
        border-bottom: 1px solid red !important;
        font-style: italic;

        &__last {
            color: red;
        }
    }
}
</style>
