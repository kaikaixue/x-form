<template>
    <div class="field-wrapper">
        <div class="static-content-item">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'static-content-wrappper'
}
</script>


<style scoped lang="scss">
    .field-wrapper {
        position: relative;
    }

    .static-content-item {
        min-height: 20px;
        display: flex;
        align-items: center;
    }

    .static-content-item.selected {
        outline: 2px solid #ff0000;
    }
</style>