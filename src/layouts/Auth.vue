<template>
    <AuthHeader/>
    <div class="form-container">
        <RouterView/>
    </div>
    <footer class="footer">
    </footer>
</template>
<script setup>
import AuthHeader from "@components/auth/AuthHeader.vue"

</script>
<style lang="scss">
.form-container {
    @include centered-flex;
    height: 100vh;
}
.footer {
    height: 2em;
}
</style>