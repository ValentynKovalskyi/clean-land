<template>
    <div :class="{ 'baseMessage': true, 'their': props.their}">

    </div>
</template>
<script setup>
const props = defineProps({
    message: '',
    their: false,
})
</script>
<style scoped lang="scss">
.baseMessage {
    
}
.their {
    align-self: self-end;
}
</style>