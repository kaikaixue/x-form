<template>
    <div class="contain-wrapper"></div>
</template>

<script>
export default {
    name: 'container-wrapper',
    props: {
        designer: Object,
    },
}
</script>

<style scoped lang="scss">
.contain-wrapper {
    position: relative;
    margin-bottom: 5px;
}
</style>
