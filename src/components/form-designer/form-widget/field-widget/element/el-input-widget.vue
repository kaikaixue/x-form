<template>
    <elFormItemWrapper :field="field" :designer="designer">
        <el-input v-model="fieldModel" />
    </elFormItemWrapper>
</template>

<script>
import elFormItemWrapper from './el-form-item-wrapper.vue'

export default {
    name: 'el-input-widget',
    components: {
        elFormItemWrapper,
    },
    props: {
        field: Object,
        designer: Object,
        a: Array
    },
    data() {
        return {
            fieldModel: '',
        }
    },
    created() {
    },
}
</script>

<style scoped less="scss"></style>
