<template>
    <div>
        <component :is="input"></component>
    </div>
</template>

<script>
export default {
    name: 'form-widget',
    data() {
        return {
            input: 'el-input',
        }
    },
}
</script>

<style scoped lang="scss"></style>
