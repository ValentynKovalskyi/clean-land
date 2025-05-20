<template>
    <div :class="{ 'baseMessage': true, 'their': props.their, 'mine': !props.their}">
        <span class="baseMessage__text">{{ text }}</span>
    </div>
</template>
<script setup>
const props = defineProps(['text', 'their'])
</script>
<style lang="scss">
.baseMessage {
    padding: .5em;
    border-radius: .5em;
    width: 50%;
    backdrop-filter: brightness(0.98);
    transition: backdrop-filter .2s ease-in-out;
    &:hover {
        backdrop-filter: brightness(0.95);
    }
    &__text {
        overflow-wrap: break-word;
    }
}
.their {
    align-self: self-start;
}

.mine {
    align-self: self-end;
}
</style>