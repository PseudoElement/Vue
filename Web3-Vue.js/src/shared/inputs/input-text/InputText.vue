<script setup lang="ts">
import { ref } from 'vue';
import { Utils } from '../../../core/utils/utils';

const { defaultValue, disabled, label, placeholder, id, debounce, required } = defineProps<{
    id: string;
    label?: string;
    required?: boolean;
    defaultValue?: string;
    placeholder?: string;
    disabled?: boolean;
    debounce?: number;
}>();

const value = ref<string>(defaultValue ?? '');

const timer = ref<ReturnType<typeof setTimeout> | null>(null);

const emitValue = defineEmits<{ onInput: string[] }>();

const onInput = (e: Event): void => {
    const target = e.target as HTMLInputElement;

    if (debounce) {
        const cb = () => {
            emitValue('onInput', target.value);
        };

        timer.value = Utils.setDebounce(cb, debounce, timer.value);
    } else {
        emitValue('onInput', target.value);
    }
};
</script>

<template>
    <div class="input-text-wrapper">
        <label v-if="label" :for="id">{{ label }}</label>
        <input
            v-model="value"
            type="text"
            :id="id"
            :placeholder="placeholder"
            :disabled="disabled"
            :required="required"
            @input="onInput($event)"
        />
    </div>
</template>

<style lang="scss" scoped>
.input-text-wrapper {
    display: flex;
    flex-direction: column;

    label {
        font-size: 12px;
    }

    input {
        font-size: 24px;
        padding: 5px;
    }
}
</style>
