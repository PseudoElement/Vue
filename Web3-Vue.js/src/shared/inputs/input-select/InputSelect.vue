<script setup lang="ts">
import { ref } from 'vue';
import { SelectOption } from './model';

const { defaultValue, options, title } = defineProps<{
    options: SelectOption[];
    title: string;
    defaultValue?: string | null;
    showValue?: boolean;
}>();

const emitValue = defineEmits<{ selectValue: SelectOption[] }>();

const selectedValue = ref<string>(defaultValue || options[0].value);

const selectValue = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    selectedValue.value = target.value;
    const option = options.find((o) => o.value === target.value)!;
    emitValue('selectValue', option);
};
</script>

<template>
    <select class="select" v-model="selectedValue" @change="selectValue($event)">
        <option class="select-option" disabled>{{ title }}</option>
        <option class="select-option" v-for="option in options" :key="option.value" :value="option.value" :disabled="option.isDisabled">
            {{ showValue ? option.value : option.text }}
        </option>
    </select>
</template>

<style lang="scss" scoped>
.select {
    cursor: pointer;
    font-size: 24px;
    width: 250px;

    &-option {
        border-bottom: 1px solid red !important;
        font-style: italic;

        &__last {
            color: red;
        }
    }
}
</style>
