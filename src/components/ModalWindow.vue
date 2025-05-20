<template>
    <slot name="activator" :showModal="show"></slot>
    <Transition name="overlay">
        <Teleport to="body">
            <div v-if="isActive" class="overlay">
                <div class="modal" @click.stop>
                    <slot :hideModal="hide" :showModal="show" />
                </div>
            </div>
        </Teleport>
    </Transition>
</template>
<script setup>
const isActive = defineModel({ default: false})
const show = () => isActive.value = true;
const hide = () => isActive.value = false;
</script>
<style lang="scss">
.overlay {
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 100;
    top: 0;
    left:0;
    backdrop-filter:blur(2px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal {
    background-color: var(--modal-bg-color);
    border-radius: 1em;
}

.overlay-enter-active,
.overlay-leave-active {
    transition: all 0.2s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  filter: blur(0px);
  opacity: 0;
}
</style>