<template>
    <div class="about-page">
        <h1>{{ $t("About.About") }}</h1>
        <br>
        <p>{{ $t("About.Content") }}</p>
    </div>
</template>
<style scoped lang="scss">
.about-page {
    @include centered-flex;
    flex-direction: column;
    height: 100%;
    width: 80%;
    background-color: $color-4;
    @include shadow;
    padding: 3em;
}
</style>