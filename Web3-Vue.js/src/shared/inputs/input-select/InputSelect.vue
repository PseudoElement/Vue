<script setup lang="ts">
import { ref } from 'vue';
import { SelectOption } from './model';

//props
const { value, options, title, showValue } = defineProps<{
    options: SelectOption[];
    title: string;
    value?: string | null;
    showValue?: boolean;
}>();

//refs
const selectedValue = ref<string | null>(value || null);

//emits
const emitValue = defineEmits<{ selectValue: SelectOption[] }>();

//computeds

//funcs
const selectValue = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    selectedValue.value = target.value;
    const option = options.find((o) => o.value === target.value)!;
    emitValue('selectValue', option);
};

//watchers
//
</script>

<template>
    <div class="select-wrapper">
        <h4 class="select-wrapper__title">{{ title }}</h4>
        <select class="select-wrapper__select" v-model="selectedValue" @change="selectValue($event)">
            <option
                class="select-option"
                v-for="option in options"
                :key="option.value!"
                :value="option.value"
                :disabled="option.isDisabled"
            >
                {{ showValue ? option.value : option.text }}
            </option>
        </select>
    </div>
</template>

<style lang="scss" scoped>
.select-wrapper {
    &__title {
        margin-top: 0;
        margin-bottom: 5px;
    }
    &__select {
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
}
</style>
